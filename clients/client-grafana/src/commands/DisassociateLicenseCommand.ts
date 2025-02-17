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

import { GrafanaClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GrafanaClient";
import { DisassociateLicenseRequest, DisassociateLicenseResponse } from "../models/models_0";
import {
  deserializeAws_restJson1DisassociateLicenseCommand,
  serializeAws_restJson1DisassociateLicenseCommand,
} from "../protocols/Aws_restJson1";

export interface DisassociateLicenseCommandInput extends DisassociateLicenseRequest {}
export interface DisassociateLicenseCommandOutput extends DisassociateLicenseResponse, __MetadataBearer {}

/**
 * <p>Removes the Grafana Enterprise license from a workspace.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GrafanaClient, DisassociateLicenseCommand } from "@aws-sdk/client-grafana"; // ES Modules import
 * // const { GrafanaClient, DisassociateLicenseCommand } = require("@aws-sdk/client-grafana"); // CommonJS import
 * const client = new GrafanaClient(config);
 * const command = new DisassociateLicenseCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DisassociateLicenseCommandInput} for command's `input` shape.
 * @see {@link DisassociateLicenseCommandOutput} for command's `response` shape.
 * @see {@link GrafanaClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class DisassociateLicenseCommand extends $Command<
  DisassociateLicenseCommandInput,
  DisassociateLicenseCommandOutput,
  GrafanaClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DisassociateLicenseCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: GrafanaClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DisassociateLicenseCommandInput, DisassociateLicenseCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GrafanaClient";
    const commandName = "DisassociateLicenseCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DisassociateLicenseRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DisassociateLicenseResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DisassociateLicenseCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1DisassociateLicenseCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DisassociateLicenseCommandOutput> {
    return deserializeAws_restJson1DisassociateLicenseCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
