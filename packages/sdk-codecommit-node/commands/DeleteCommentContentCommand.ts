import * as __aws_middleware_stack from '@aws/middleware-stack';
import * as __aws_types from '@aws/types';
import * as _stream from 'stream';
import {DeleteCommentContent} from '../model/DeleteCommentContent';
import {InputTypesUnion} from '../types/InputTypesUnion';
import {OutputTypesUnion} from '../types/OutputTypesUnion';
import {DeleteCommentContentInput} from '../types/DeleteCommentContentInput';
import {DeleteCommentContentOutput} from '../types/DeleteCommentContentOutput';
import {CodeCommitResolvedConfiguration} from '../CodeCommitConfiguration';

export class DeleteCommentContentCommand implements __aws_types.Command<
    InputTypesUnion,
    DeleteCommentContentInput,
    OutputTypesUnion,
    DeleteCommentContentOutput,
    CodeCommitResolvedConfiguration,
    _stream.Readable
> {
    readonly middlewareStack = new __aws_middleware_stack.MiddlewareStack<DeleteCommentContentInput, DeleteCommentContentOutput, _stream.Readable>();

    constructor(readonly input: DeleteCommentContentInput) {}

    resolveMiddleware(
        clientStack: __aws_middleware_stack.MiddlewareStack<InputTypesUnion, OutputTypesUnion, _stream.Readable>,
        configuration: CodeCommitResolvedConfiguration
    ): __aws_types.Handler<DeleteCommentContentInput, DeleteCommentContentOutput> {
        const {handler} = configuration;
        const stack = clientStack.concat(this.middlewareStack);

        const handlerExecutionContext: __aws_types.HandlerExecutionContext = {
            logger: {} as any,
            model: DeleteCommentContent
        };

        return stack.resolve(
            handler<DeleteCommentContentInput, DeleteCommentContentOutput>(handlerExecutionContext), 
            handlerExecutionContext
        );
    }
}