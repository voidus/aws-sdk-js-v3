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

import { KafkaClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KafkaClient";
import { ListKafkaVersionsRequest, ListKafkaVersionsResponse } from "../models/models_0";
import {
  deserializeAws_restJson1ListKafkaVersionsCommand,
  serializeAws_restJson1ListKafkaVersionsCommand,
} from "../protocols/Aws_restJson1";

export interface ListKafkaVersionsCommandInput extends ListKafkaVersionsRequest {}
export interface ListKafkaVersionsCommandOutput extends ListKafkaVersionsResponse, __MetadataBearer {}

/**
 * <p>Returns a list of Kafka versions.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KafkaClient, ListKafkaVersionsCommand } from "@aws-sdk/client-kafka"; // ES Modules import
 * // const { KafkaClient, ListKafkaVersionsCommand } = require("@aws-sdk/client-kafka"); // CommonJS import
 * const client = new KafkaClient(config);
 * const command = new ListKafkaVersionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListKafkaVersionsCommandInput} for command's `input` shape.
 * @see {@link ListKafkaVersionsCommandOutput} for command's `response` shape.
 * @see {@link KafkaClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class ListKafkaVersionsCommand extends $Command<
  ListKafkaVersionsCommandInput,
  ListKafkaVersionsCommandOutput,
  KafkaClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListKafkaVersionsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: KafkaClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListKafkaVersionsCommandInput, ListKafkaVersionsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KafkaClient";
    const commandName = "ListKafkaVersionsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListKafkaVersionsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListKafkaVersionsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListKafkaVersionsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1ListKafkaVersionsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListKafkaVersionsCommandOutput> {
    return deserializeAws_restJson1ListKafkaVersionsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
