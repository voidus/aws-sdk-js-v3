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

import { GlueClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GlueClient";
import { UpdateClassifierRequest, UpdateClassifierResponse } from "../models/models_1";
import {
  deserializeAws_json1_1UpdateClassifierCommand,
  serializeAws_json1_1UpdateClassifierCommand,
} from "../protocols/Aws_json1_1";

export interface UpdateClassifierCommandInput extends UpdateClassifierRequest {}
export interface UpdateClassifierCommandOutput extends UpdateClassifierResponse, __MetadataBearer {}

/**
 * <p>Modifies an existing classifier (a <code>GrokClassifier</code>,
 *       an <code>XMLClassifier</code>, a <code>JsonClassifier</code>, or a <code>CsvClassifier</code>, depending on
 *       which field is present).</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GlueClient, UpdateClassifierCommand } from "@aws-sdk/client-glue"; // ES Modules import
 * // const { GlueClient, UpdateClassifierCommand } = require("@aws-sdk/client-glue"); // CommonJS import
 * const client = new GlueClient(config);
 * const command = new UpdateClassifierCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateClassifierCommandInput} for command's `input` shape.
 * @see {@link UpdateClassifierCommandOutput} for command's `response` shape.
 * @see {@link GlueClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class UpdateClassifierCommand extends $Command<
  UpdateClassifierCommandInput,
  UpdateClassifierCommandOutput,
  GlueClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UpdateClassifierCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: GlueClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<UpdateClassifierCommandInput, UpdateClassifierCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GlueClient";
    const commandName = "UpdateClassifierCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: UpdateClassifierRequest.filterSensitiveLog,
      outputFilterSensitiveLog: UpdateClassifierResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: UpdateClassifierCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1UpdateClassifierCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<UpdateClassifierCommandOutput> {
    return deserializeAws_json1_1UpdateClassifierCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
