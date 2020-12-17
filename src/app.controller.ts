import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/new')
  @Render('index.hbs')
  todoNew() {
    return { title: 'Nest Todo App' };
  }

  @Get('/create')
  create(@Res() res) {
    return res.status(302).redirect('/');
  }
}
