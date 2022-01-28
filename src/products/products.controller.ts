import { CreateProductDTO } from './dto/products.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    console.log(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Succesfully Created',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }
  @Get('/:productID')
  @ApiParam({
    name: 'productID',
    required: true,
    description: 'The id that is representated in the database',
  })
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const deleted = await this.productService.deleteProduct(productID);
    if (!deleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted succesfully',
      deleted,
    });
  }

  @Put('/update/:productID')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productID') productID,
  ) {
    const updated = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updated) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
      updated,
    });
  }
}
