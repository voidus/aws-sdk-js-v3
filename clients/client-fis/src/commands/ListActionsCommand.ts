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

import { FisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FisClient";
import { ListActionsRequest, ListActionsResponse } from "../models/models_0";
import {
  deserializeAws_restJson1ListActionsCommand,
  serializeAws_restJson1ListActionsCommand,
} from "../protocols/Aws_restJson1";

export interface ListActionsCommandInput extends ListActionsRequest {}
export interface ListActionsCommandOutput extends ListActionsResponse, __MetadataBearer {}

/**
 * <p>Lists the available AWS FIS actions.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { FisClient, ListActionsCommand } from "@aws-sdk/client-fis"; // ES Modules import
 * // const { FisClient, ListActionsCommand } = require("@aws-sdk/client-fis"); // CommonJS import
 * const client = new FisClient(config);
 * const command = new ListActionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListActionsCommandInput} for command's `input` shape.
 * @see {@link ListActionsCommandOutput} for command's `response` shape.
 * @see {@link FisClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class ListActionsCommand extends $Command<
  ListActionsCommandInput,
  ListActionsCommandOutput,
  FisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListActionsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: FisClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListActionsCommandInput, ListActionsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "FisClient";
    const commandName = "ListActionsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListActionsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListActionsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListActionsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1ListActionsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListActionsCommandOutput> {
    return deserializeAws_restJson1ListActionsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
