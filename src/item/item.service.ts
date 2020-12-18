import { Injectable } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDTO } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  // テーブルの全データを取得
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  // テーブルにアイテムを追加
  async create(item: CreateItemDTO): Promise<Item> {
    const new_item = new Item();
    new_item.todo = item.todo;
    new_item.limit = new Date(item.limit);
    new_item.deletePassword = item.deletePassword;
    return await this.itemRepository.save(new_item);
  }

  // IDを指定してテーブルから一件のデータを取得
  async find(id: number): Promise<Item> | null {
    return await this.itemRepository.findOne({ id });
  }

  // IDを指定してデータを更新
  async update(id: number, item: Item): Promise<UpdateResult> {
    return await this.itemRepository.update(id, item);
  }

  // IDを指定してテーブルのデータを削除
  async delete(id: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(id);
  }
}
