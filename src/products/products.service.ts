import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDTO, CreateProductDTODocument } from './dto/products.dto';
import { Store, StoreDocument } from '../store/dto/store.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(CreateProductDTO.name)
    private readonly productModel: Model<CreateProductDTODocument>,
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async getProducts(): Promise<CreateProductDTODocument[]> {
    const products = await this.productModel
      .find()
      .populate('store', ['name', 'direction'])
      .exec();
    return products;
  }
  async getProduct(productID: string): Promise<CreateProductDTODocument> {
    const product = await this.productModel.findById(productID);
    return product;
  }
  async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<CreateProductDTODocument> {
    const product = await new this.productModel(createProductDTO);
    return product.save();
  }
  async deleteProduct(productID: string): Promise<CreateProductDTODocument> {
    const deleted = await this.productModel.findByIdAndDelete(productID);
    return deleted;
  }
  async updateProduct(
    productID: string,
    createdProductDTO: CreateProductDTO,
  ): Promise<CreateProductDTODocument> {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createdProductDTO,
      { new: true },
    );
    return updateProduct;
  }

  async getProductsByStore() {
    return await this.productModel.find().populate('store');
  }

  async deleteAll() {
    await this.productModel.remove({});
  }
}
