import {
    ConfigurationDefinition,
    CustomizationDefinition,
    Import,
    RuntimeTarget,
    TreeModelOperation
} from '@aws/build-types';
import {IndentedSection} from '../IndentedSection';

import {Import as DestructuringImport} from '../Import';
import {FullPackageImport} from '../Client/FullPackageImport';
import {packageNameToVariable} from '../Client/packageNameToVariable';
import {serviceIdFromMetadata} from '../Client/serviceIdFromMetadata';
import {customizationFromMiddleware} from '../helpers/customizationFromMiddleware';
import {dependenciesFromCustomization} from '../helpers/dependenciesFromCustomization';

export class Command {
    constructor(
        private readonly operation: TreeModelOperation,
        private readonly target: RuntimeTarget,
        private readonly customizations: Array<CustomizationDefinition> = []
    ) {}

    get className(): string {
        return `${this.operation.name}Command`;
    }

    get prefix() {
        return serviceIdFromMetadata(this.operation.metadata)
            .replace(/\s/g, '');
    }

    toString(): string {
        const inputType = this.getInputType();
        const outputType = this.getOutputType();
        const streamType = this.streamType();
        const resolvedConfiguration = `${this.prefix}ResolvedConfiguration`;
        const typesPackage = packageNameToVariable('@aws/types');
        const middlewareStackPackage = packageNameToVariable('@aws/middleware-stack');
        const configurationImport = new DestructuringImport(
            `../${this.prefix}Configuration`,
            resolvedConfiguration
        );

        return `${this.imports()}
import {${this.operation.name}} from '../model/${this.operation.name}';
import {InputTypesUnion} from '../types/InputTypesUnion';
import {OutputTypesUnion} from '../types/OutputTypesUnion';
import {${inputType}} from '../types/${inputType}';
import {${outputType}} from '../types/${outputType}';
${configurationImport.toString()}

export class ${this.className} implements ${typesPackage}.Command<
    InputTypesUnion,
    ${inputType},
    OutputTypesUnion,
    ${outputType},
    ${resolvedConfiguration},
    ${streamType}
> {
    readonly middlewareStack = new ${middlewareStackPackage}.MiddlewareStack<${inputType}, ${outputType}, ${streamType}>();

    constructor(readonly input: ${inputType}) {}

    resolveMiddleware(
        clientStack: ${middlewareStackPackage}.MiddlewareStack<InputTypesUnion, OutputTypesUnion, ${streamType}>,
        configuration: ${resolvedConfiguration}
    ): ${typesPackage}.Handler<${inputType}, ${outputType}> {
        const {handler} = configuration;
        const stack = clientStack.concat(this.middlewareStack);

        const handlerExecutionContext: ${typesPackage}.HandlerExecutionContext = {
            logger: {} as any,
            model: ${this.operation.name}
        };
${this.customizations.filter(definition => definition.type === 'Middleware')
    .map((definition: any) => {
        return new IndentedSection(customizationFromMiddleware(definition, 'stack'), 2);
    }).join('\n')}
        return stack.resolve(
            handler<${inputType}, ${outputType}>(handlerExecutionContext), 
            handlerExecutionContext
        );
    }
}
`.trim();
    }

    dependencies(): Array<Import> {
        const dependencies: Import[] = [];
        this.customizations
            .forEach(customization => {
                dependencies.push(
                    ...dependenciesFromCustomization(customization, this.target)
                );
            });
        return dependencies;
    }

    private imports(): string {
        const packages = new Set<string>([
            '@aws/middleware-stack',
            '@aws/types'
        ]);
        if (this.target === 'node') {
            packages.add('stream');
        }

        for (const dependency of this.dependencies()) {
            packages.add(dependency.package);
        }

        return [...packages]
            .sort()
            .map(packageName => new FullPackageImport(packageName))
            .join('\n');
    }

    private getInputType() {
        return `${this.operation.name}Input`;
    }

    private getOutputType() {
        return `${this.operation.name}Output`;
    }

    private streamType(): string {
        switch (this.target) {
            case 'node':
                return `${packageNameToVariable('stream')}.Readable`;
            case 'browser':
                return 'ReadableStream';
            case 'universal':
                return 'Uint8Array';
        }
    }
}
