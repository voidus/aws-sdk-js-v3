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

import { LightsailClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../LightsailClient";
import { GetContainerLogRequest, GetContainerLogResult } from "../models/models_0";
import {
  deserializeAws_json1_1GetContainerLogCommand,
  serializeAws_json1_1GetContainerLogCommand,
} from "../protocols/Aws_json1_1";

export interface GetContainerLogCommandInput extends GetContainerLogRequest {}
export interface GetContainerLogCommandOutput extends GetContainerLogResult, __MetadataBearer {}

/**
 * <p>Returns the log events of a container of your Amazon Lightsail container service.</p>
 *
 *          <p>If your container service has more than one node (i.e., a scale greater than 1), then the
 *       log events that are returned for the specified container are merged from all nodes on your
 *       container service.</p>
 *
 *          <note>
 *             <p>Container logs are retained for a certain amount of time. For more information, see
 *           <a href="https://docs.aws.amazon.com/general/latest/gr/lightsail.html">Amazon Lightsail
 *           endpoints and quotas</a> in the <i>AWS General Reference</i>.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { LightsailClient, GetContainerLogCommand } from "@aws-sdk/client-lightsail"; // ES Modules import
 * // const { LightsailClient, GetContainerLogCommand } = require("@aws-sdk/client-lightsail"); // CommonJS import
 * const client = new LightsailClient(config);
 * const command = new GetContainerLogCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetContainerLogCommandInput} for command's `input` shape.
 * @see {@link GetContainerLogCommandOutput} for command's `response` shape.
 * @see {@link LightsailClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class GetContainerLogCommand extends $Command<
  GetContainerLogCommandInput,
  GetContainerLogCommandOutput,
  LightsailClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetContainerLogCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: LightsailClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetContainerLogCommandInput, GetContainerLogCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "LightsailClient";
    const commandName = "GetContainerLogCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetContainerLogRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetContainerLogResult.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: GetContainerLogCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1GetContainerLogCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<GetContainerLogCommandOutput> {
    return deserializeAws_json1_1GetContainerLogCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
