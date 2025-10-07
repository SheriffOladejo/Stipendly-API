import { WebhookService } from './webhook.service';
import { Controller, Post, Res, Req, Query, Get } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('v1/webhook/')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // WhatsApp will POST messages and status updates here
  @Post('whatsapp-webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      const body = req.body;
      console.log('Webhook Payload:', JSON.stringify(body, null, 2));

      if (body.object) {
        body.entry?.forEach((entry: any) => {
          entry.changes?.forEach((change: any) => {
            const value = change.value;

            // Handle new messages
            if (value.messages) {
              value.messages.forEach((msg: any) => {
                const from = msg.from; // user’s WhatsApp number
                const msgBody = msg.text?.body || '';
                console.log(`New message from ${from}: ${msgBody}`);

                // TODO: Pass to your service for processing/reply
                this.webhookService.handleIncomingMessage(from, msgBody);
              });
            }

            // Handle status updates (delivered, read, etc.)
            if (value.statuses) {
              value.statuses.forEach((status: any) => {
                console.log(
                  `Message ${status.id} status: ${status.status} at ${status.timestamp}`,
                );

                // TODO: Update message status in DB
                //this.webhookService.handleMessageStatus(status);
              });
            }
          });
        });

        return res.sendStatus(200);
      } else {
        console.error('Webhook handling error:');
        return res.sendStatus(404);
      }
    } catch (error) {
      console.error('Webhook handling error:', error);
      return res.sendStatus(500);
    }
  }

  // Webhook verification (for setup on Meta)
  @Get('whatsapp-webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFICATION_TOKEN) {
      console.log('Webhook verified successfully');
      return res.status(200).send(challenge);
    } else {
      console.warn('Webhook verification failed');
      return res.sendStatus(403);
    }
  }
}
