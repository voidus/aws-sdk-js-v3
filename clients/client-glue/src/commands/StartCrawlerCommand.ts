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
import { StartCrawlerRequest, StartCrawlerResponse } from "../models/models_1";
import {
  deserializeAws_json1_1StartCrawlerCommand,
  serializeAws_json1_1StartCrawlerCommand,
} from "../protocols/Aws_json1_1";

export interface StartCrawlerCommandInput extends StartCrawlerRequest {}
export interface StartCrawlerCommandOutput extends StartCrawlerResponse, __MetadataBearer {}

/**
 * <p>Starts a crawl using the specified crawler, regardless
 *       of what is scheduled. If the crawler is already running, returns a
 *       <a href="https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-exceptions.html#aws-glue-api-exceptions-CrawlerRunningException">CrawlerRunningException</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GlueClient, StartCrawlerCommand } from "@aws-sdk/client-glue"; // ES Modules import
 * // const { GlueClient, StartCrawlerCommand } = require("@aws-sdk/client-glue"); // CommonJS import
 * const client = new GlueClient(config);
 * const command = new StartCrawlerCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link StartCrawlerCommandInput} for command's `input` shape.
 * @see {@link StartCrawlerCommandOutput} for command's `response` shape.
 * @see {@link GlueClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class StartCrawlerCommand extends $Command<
  StartCrawlerCommandInput,
  StartCrawlerCommandOutput,
  GlueClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartCrawlerCommandInput) {
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
  ): Handler<StartCrawlerCommandInput, StartCrawlerCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GlueClient";
    const commandName = "StartCrawlerCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartCrawlerRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StartCrawlerResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartCrawlerCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartCrawlerCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StartCrawlerCommandOutput> {
    return deserializeAws_json1_1StartCrawlerCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
