import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDTO, CreateProductDTODocument } from './dto/products.dto';
import { Store, StoreDocument } from '../store/dto/store.dto';
import { UpdateProduct } from './dto/updateProduct.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(CreateProductDTO.name)
    private readonly productModel: Model<CreateProductDTODocument>,
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async getProducts(): Promise<any> {
    const products = await this.productModel
      .find()
      .populate('store', ['name', 'direction'])
      .exec();
    return products;
  }
  async getProduct(productID: string): Promise<any> {
    const product = await this.productModel.findById(productID);
    return product;
  }
  async createProduct(
    createProductDTO: CreateProductDTO,
    userID: string,
  ): Promise<any> {
    const product = await new this.productModel(createProductDTO);
    product.owner = userID;
    return product.save();
  }
  async deleteProduct(productID: string): Promise<any> {
    const deleted = await this.productModel.findByIdAndDelete(productID);
    return deleted;
  }
  async updateProduct(
    productID: string,
    productUpdate: UpdateProduct,
    userid: string,
  ): Promise<any> {
    const product = await this.productModel.findById(productID);
    if (product) {
      if (product.owner === userid) {
        if (productUpdate.hasOwnProperty('name')) {
          product.name = productUpdate.name;
        }
        if (productUpdate.hasOwnProperty('description')) {
          product.description = productUpdate.description;
        }
        if (productUpdate.hasOwnProperty('price')) {
          product.price = productUpdate.price;
        }
        if (productUpdate.hasOwnProperty('imageURL')) {
          product.imageURL = productUpdate.imageURL;
        }

        const updatedProduct = await this.productModel.findByIdAndUpdate(
          product.id,
          productUpdate,
          { new: true },
        );

        if (updatedProduct) {
          return {
            error: false,
            msg: 'Product updated succesfully',
          };
        } else {
          return {
            error: true,
            msg: 'You cant edit a product of other user',
          };
        }
      } else {
        return {
          error: true,
          msg: 'The product you want to edit doesnt belong to you',
        };
      }
    } else {
      return {
        error: true,
        msg: 'The product you want to edit is not in the database',
      };
    }
  }

  async getProductsByStore(): Promise<any> {
    return await this.productModel.find().populate('store');
  }

  async deleteAll(): Promise<any> {
    await this.productModel.remove({});
  }
}
