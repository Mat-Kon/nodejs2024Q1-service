import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppRoutes } from './interfaces/appRoutes.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoutes(): AppRoutes {
    return this.appService.getRoutes();
  }
}
