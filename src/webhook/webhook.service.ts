import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookService {
  private readonly WHATSAPP_URL = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  private readonly TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

  async sendMessage(to: string, message: string) {
    try {
      const res = await axios.post(
        this.WHATSAPP_URL,
        {
          messaging_product: 'whatsapp',
          to,
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error.response?.data || error.message);
      throw error;
    }
  }

  async handleIncomingMessage(from: string, message: string) {
    console.log(`Handling incoming message from ${from}: ${message}`);

    // Simple rule-based response
    let reply = "I'm not sure I understand.";
    if (message.toLowerCase().includes('hello')) {
      reply = 'Hi there 👋! How can I help you today?';
    } else if (message.toLowerCase().includes('price')) {
      reply = 'Our products start at $9.99 💰';
    } else if (message.toLowerCase().includes('bye')) {
      reply = 'Goodbye 👋! Have a great day!';
    }

    return this.sendMessage(from, reply);
  }
}
