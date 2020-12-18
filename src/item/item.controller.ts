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
import { CreateItemDTO } from './item.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  @Render('item/index.hbs')
  async getItemList(): Promise<{ items: Item[] }> {
    return { items: await this.service.findAll() };
  }

  @Post()
  async addItem(@Body() item: CreateItemDTO, @Res() res): Promise<typeof Res> {
    await this.service.create(item);
    return res.status(201).redirect('/item');
  }

  @Get(':id')
  @Render('item/item.hbs')
  async getItem(@Param('id') id: string): Promise<{ item: Item }> {
    return { item: await this.service.find(Number(id)) };
  }
}