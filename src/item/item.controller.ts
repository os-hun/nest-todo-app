import {
  Controller,
  Render,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '../entities/item.entity';
import { CreateItemDTO, UpdateItemDTO } from './item.dto';
import { DeleteResult } from 'typeorm';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  @Render('item/index.hbs')
  async getItemList(): Promise<{ items: Item[] }> {
    return { items: await this.service.findAll() };
  }

  @Get('new')
  @Render('item/new.hbs')
  async newTodo() {
    return;
  }

  @Post('create')
  async addItem(@Body() item: CreateItemDTO, @Res() res): Promise<typeof Res> {
    await this.service.create(item);
    return res.status(302).redirect('/item');
  }

  @Get(':id')
  @Render('item/item.hbs')
  async getItem(@Param('id') id: string): Promise<{ item: Item }> {
    return { item: await this.service.find(Number(id)) };
  }

  @Get(':id/edit')
  @Render('item/edit.hbs')
  async editTodo(@Param('id') id: string): Promise<{ item: Item }> {
    return { item: await this.service.find(Number(id)) };
  }

  @Put(':id/update')
  @Render('item/edit.hbs')
  async updateTodo(
    @Param('id') id: string,
    @Body() item: UpdateItemDTO,
    @Res() res,
  ): Promise<typeof Res> {
    const newData = !item.isDone
      ? item
      : {
          ...item,
          ...{ isDone: item.isDone },
        };
    await this.service.update(Number(id), newData);
    return res.status(302).redirect(`/item/${id}`);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.service.delete(Number(id));
  }

  @Post(':id/delete')
  async deleteTodo(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res,
  ): Promise<typeof Res> {
    await this.service.deleteByPassword(Number(id), body.deletePassword);
    return res.status(302).redirect('/item');
  }
}
