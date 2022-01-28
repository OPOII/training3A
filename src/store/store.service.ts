import { Store, StoreSchema, StordeDocument } from './dto/store.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StordeDocument>,
  ) {}

  async getStores(): Promise<StordeDocument[]> {
    const products = await this.storeModel.find();
    return products;
  }
  async getStore(productID: string): Promise<StordeDocument> {
    const product = await this.storeModel.findById(productID);
    return product;
  }
  async createStore(createStore: Store): Promise<StordeDocument> {
    const product = await new this.storeModel(createStore);
    return await product.save();
  }
  async deleteStore(storeID: string): Promise<StordeDocument> {
    const deleted = await this.storeModel.findByIdAndDelete(storeID);
    return deleted;
  }
  async updateStore(
    store: string,
    createdStore: Store,
  ): Promise<StordeDocument> {
    const updateStore = await this.storeModel.findByIdAndUpdate(
      store,
      createdStore,
      { new: true },
    );
    return updateStore;
  }
}
