import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Products>,
  ) {}

  async getProducts(): Promise<Products[]> {
    const products = await this.productModel.find();
    return products;
  }
  async getProduct(productID: string): Promise<Products> {
    const product = await this.productModel.findById(productID);
    return product;
  }
  async createProduct(createProductDTO: CreateProductDTO): Promise<Products> {
    const product = await new this.productModel(createProductDTO);
    return await product.save();
  }
  async deleteProduct(productID: string): Promise<Products> {
    const deleted = await this.productModel.findByIdAndDelete(productID);
    return deleted;
  }
  async updateProduct(
    productID: string,
    createdProductDTO: CreateProductDTO,
  ): Promise<Products> {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createdProductDTO,
      { new: true },
    );
    return updateProduct;
  }
}
