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

import { UpdateVTLDeviceTypeInput, UpdateVTLDeviceTypeOutput } from "../models/models_0";
import {
  deserializeAws_json1_1UpdateVTLDeviceTypeCommand,
  serializeAws_json1_1UpdateVTLDeviceTypeCommand,
} from "../protocols/Aws_json1_1";
import { ServiceInputTypes, ServiceOutputTypes, StorageGatewayClientResolvedConfig } from "../StorageGatewayClient";

export interface UpdateVTLDeviceTypeCommandInput extends UpdateVTLDeviceTypeInput {}
export interface UpdateVTLDeviceTypeCommandOutput extends UpdateVTLDeviceTypeOutput, __MetadataBearer {}

/**
 * <p>Updates the type of medium changer in a tape gateway. When you activate a tape gateway,
 *          you select a medium changer type for the tape gateway. This operation enables you to select
 *          a different type of medium changer after a tape gateway is activated. This operation is
 *          only supported in the tape gateway type.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { StorageGatewayClient, UpdateVTLDeviceTypeCommand } from "@aws-sdk/client-storage-gateway"; // ES Modules import
 * // const { StorageGatewayClient, UpdateVTLDeviceTypeCommand } = require("@aws-sdk/client-storage-gateway"); // CommonJS import
 * const client = new StorageGatewayClient(config);
 * const command = new UpdateVTLDeviceTypeCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateVTLDeviceTypeCommandInput} for command's `input` shape.
 * @see {@link UpdateVTLDeviceTypeCommandOutput} for command's `response` shape.
 * @see {@link StorageGatewayClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class UpdateVTLDeviceTypeCommand extends $Command<
  UpdateVTLDeviceTypeCommandInput,
  UpdateVTLDeviceTypeCommandOutput,
  StorageGatewayClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UpdateVTLDeviceTypeCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: StorageGatewayClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<UpdateVTLDeviceTypeCommandInput, UpdateVTLDeviceTypeCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "StorageGatewayClient";
    const commandName = "UpdateVTLDeviceTypeCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: UpdateVTLDeviceTypeInput.filterSensitiveLog,
      outputFilterSensitiveLog: UpdateVTLDeviceTypeOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: UpdateVTLDeviceTypeCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1UpdateVTLDeviceTypeCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<UpdateVTLDeviceTypeCommandOutput> {
    return deserializeAws_json1_1UpdateVTLDeviceTypeCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
