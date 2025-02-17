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

import { EMRClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EMRClient";
import { ListInstanceGroupsInput, ListInstanceGroupsOutput } from "../models/models_0";
import {
  deserializeAws_json1_1ListInstanceGroupsCommand,
  serializeAws_json1_1ListInstanceGroupsCommand,
} from "../protocols/Aws_json1_1";

export interface ListInstanceGroupsCommandInput extends ListInstanceGroupsInput {}
export interface ListInstanceGroupsCommandOutput extends ListInstanceGroupsOutput, __MetadataBearer {}

/**
 * <p>Provides all available details about the instance groups in a cluster.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EMRClient, ListInstanceGroupsCommand } from "@aws-sdk/client-emr"; // ES Modules import
 * // const { EMRClient, ListInstanceGroupsCommand } = require("@aws-sdk/client-emr"); // CommonJS import
 * const client = new EMRClient(config);
 * const command = new ListInstanceGroupsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListInstanceGroupsCommandInput} for command's `input` shape.
 * @see {@link ListInstanceGroupsCommandOutput} for command's `response` shape.
 * @see {@link EMRClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class ListInstanceGroupsCommand extends $Command<
  ListInstanceGroupsCommandInput,
  ListInstanceGroupsCommandOutput,
  EMRClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListInstanceGroupsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: EMRClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListInstanceGroupsCommandInput, ListInstanceGroupsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "EMRClient";
    const commandName = "ListInstanceGroupsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListInstanceGroupsInput.filterSensitiveLog,
      outputFilterSensitiveLog: ListInstanceGroupsOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListInstanceGroupsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1ListInstanceGroupsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListInstanceGroupsCommandOutput> {
    return deserializeAws_json1_1ListInstanceGroupsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
