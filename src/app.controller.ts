import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  async getHello() {
    return {
      message: 'Welcome to the Client Gateway API for GMayaS working, By: © 2025 Copyright: GMayaS C:\>Desarrollo en Sistemas.',
      StatusCode: 200
    };
  }
}
