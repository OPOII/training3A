import { Store, StoreSchema, StoreDocument } from './dto/store.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async getStores(): Promise<any> {
    const products = await this.storeModel.find();
    return products;
  }
  async getStore(productID: string): Promise<any> {
    const product = await this.storeModel.findById(productID);
    return product;
  }
  async createStore(createStore: Store, userId: string): Promise<any> {
    const product = await new this.storeModel(createStore);
    product.owner = userId;
    return await product.save();
  }
  async deleteStore(storeID: string): Promise<any> {
    const deleted = await this.storeModel.findByIdAndDelete(storeID);
    return deleted;
  }
  async updateStore(store: string, createdStore: Store): Promise<any> {
    const updateStore = await this.storeModel.findByIdAndUpdate(
      store,
      createdStore,
      { new: true },
    );
    return updateStore;
  }
  async deleteAll() {
    await this.storeModel.remove({});
  }
}
