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

import { MediaConnectClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../MediaConnectClient";
import { AddFlowVpcInterfacesRequest, AddFlowVpcInterfacesResponse } from "../models/models_0";
import {
  deserializeAws_restJson1AddFlowVpcInterfacesCommand,
  serializeAws_restJson1AddFlowVpcInterfacesCommand,
} from "../protocols/Aws_restJson1";

export interface AddFlowVpcInterfacesCommandInput extends AddFlowVpcInterfacesRequest {}
export interface AddFlowVpcInterfacesCommandOutput extends AddFlowVpcInterfacesResponse, __MetadataBearer {}

/**
 * Adds VPC interfaces to flow
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { MediaConnectClient, AddFlowVpcInterfacesCommand } from "@aws-sdk/client-mediaconnect"; // ES Modules import
 * // const { MediaConnectClient, AddFlowVpcInterfacesCommand } = require("@aws-sdk/client-mediaconnect"); // CommonJS import
 * const client = new MediaConnectClient(config);
 * const command = new AddFlowVpcInterfacesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link AddFlowVpcInterfacesCommandInput} for command's `input` shape.
 * @see {@link AddFlowVpcInterfacesCommandOutput} for command's `response` shape.
 * @see {@link MediaConnectClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class AddFlowVpcInterfacesCommand extends $Command<
  AddFlowVpcInterfacesCommandInput,
  AddFlowVpcInterfacesCommandOutput,
  MediaConnectClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: AddFlowVpcInterfacesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: MediaConnectClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<AddFlowVpcInterfacesCommandInput, AddFlowVpcInterfacesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "MediaConnectClient";
    const commandName = "AddFlowVpcInterfacesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: AddFlowVpcInterfacesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: AddFlowVpcInterfacesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: AddFlowVpcInterfacesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1AddFlowVpcInterfacesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<AddFlowVpcInterfacesCommandOutput> {
    return deserializeAws_restJson1AddFlowVpcInterfacesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
