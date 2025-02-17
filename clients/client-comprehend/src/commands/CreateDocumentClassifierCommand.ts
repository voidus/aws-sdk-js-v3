import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { CreateDocumentClassifierRequest, CreateDocumentClassifierResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CreateDocumentClassifierCommand,
  serializeAws_json1_1CreateDocumentClassifierCommand,
} from "../protocols/Aws_json1_1";

export interface CreateDocumentClassifierCommandInput extends CreateDocumentClassifierRequest {}
export interface CreateDocumentClassifierCommandOutput extends CreateDocumentClassifierResponse, __MetadataBearer {}

/**
 * <p>Creates a new document classifier that you can use to categorize documents. To create a
 *       classifier, you provide a set of training documents that labeled with the categories that you
 *       want to use. After the classifier is trained you can use it to categorize a set of labeled
 *       documents into the categories. For more information, see <a>how-document-classification</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ComprehendClient, CreateDocumentClassifierCommand } from "@aws-sdk/client-comprehend"; // ES Modules import
 * // const { ComprehendClient, CreateDocumentClassifierCommand } = require("@aws-sdk/client-comprehend"); // CommonJS import
 * const client = new ComprehendClient(config);
 * const command = new CreateDocumentClassifierCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateDocumentClassifierCommandInput} for command's `input` shape.
 * @see {@link CreateDocumentClassifierCommandOutput} for command's `response` shape.
 * @see {@link ComprehendClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class CreateDocumentClassifierCommand extends $Command<
  CreateDocumentClassifierCommandInput,
  CreateDocumentClassifierCommandOutput,
  ComprehendClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateDocumentClassifierCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ComprehendClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CreateDocumentClassifierCommandInput, CreateDocumentClassifierCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ComprehendClient";
    const commandName = "CreateDocumentClassifierCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateDocumentClassifierRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateDocumentClassifierResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateDocumentClassifierCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateDocumentClassifierCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateDocumentClassifierCommandOutput> {
    return deserializeAws_json1_1CreateDocumentClassifierCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
