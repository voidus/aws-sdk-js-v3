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

import { CloudSearchClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudSearchClient";
import { DescribeAnalysisSchemesRequest, DescribeAnalysisSchemesResponse } from "../models/models_0";
import {
  deserializeAws_queryDescribeAnalysisSchemesCommand,
  serializeAws_queryDescribeAnalysisSchemesCommand,
} from "../protocols/Aws_query";

export interface DescribeAnalysisSchemesCommandInput extends DescribeAnalysisSchemesRequest {}
export interface DescribeAnalysisSchemesCommandOutput extends DescribeAnalysisSchemesResponse, __MetadataBearer {}

/**
 * <p>Gets the analysis schemes configured for a domain. An analysis scheme defines language-specific text processing options for a <code>text</code> field. Can be limited to specific analysis schemes by name.  By default, shows all analysis schemes and includes any pending changes to the configuration. Set the <code>Deployed</code> option to <code>true</code> to show the active configuration and exclude pending changes.  For more information, see <a href="http://docs.aws.amazon.com/cloudsearch/latest/developerguide/configuring-analysis-schemes.html" target="_blank">Configuring Analysis Schemes</a> in the <i>Amazon CloudSearch Developer Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudSearchClient, DescribeAnalysisSchemesCommand } from "@aws-sdk/client-cloudsearch"; // ES Modules import
 * // const { CloudSearchClient, DescribeAnalysisSchemesCommand } = require("@aws-sdk/client-cloudsearch"); // CommonJS import
 * const client = new CloudSearchClient(config);
 * const command = new DescribeAnalysisSchemesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DescribeAnalysisSchemesCommandInput} for command's `input` shape.
 * @see {@link DescribeAnalysisSchemesCommandOutput} for command's `response` shape.
 * @see {@link CloudSearchClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class DescribeAnalysisSchemesCommand extends $Command<
  DescribeAnalysisSchemesCommandInput,
  DescribeAnalysisSchemesCommandOutput,
  CloudSearchClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeAnalysisSchemesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CloudSearchClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DescribeAnalysisSchemesCommandInput, DescribeAnalysisSchemesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudSearchClient";
    const commandName = "DescribeAnalysisSchemesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeAnalysisSchemesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DescribeAnalysisSchemesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DescribeAnalysisSchemesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_queryDescribeAnalysisSchemesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DescribeAnalysisSchemesCommandOutput> {
    return deserializeAws_queryDescribeAnalysisSchemesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
