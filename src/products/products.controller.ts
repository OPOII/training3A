import { CreateProductDTO } from './dto/products.dto';
import { Store } from 'src/store/dto/store.dto';
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
  UseGuards,
  Request,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { ApiParam } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { UpdateProduct } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('/create')
  async createPost(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Request() req,
  ) {
    const user = req.user;
    const product = await this.productService.createProduct(
      createProductDTO,
      user['_doc']._id,
    );
    console.log(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Succesfully Created',
      product,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }
  @UseGuards(AuthenticatedGuard)
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

  @UseGuards(AuthenticatedGuard)
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const deleted = await this.productService.deleteProduct(productID);
    if (!deleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted succesfully',
      deleted,
    });
  }
  @ApiParam({
    name: 'productID',
    required: true,
    description: 'The id that is representated in the database',
  })
  @UseGuards(AuthenticatedGuard)
  @Put('/update/:productID')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: UpdateProduct,
    @Param('productID') productID,
    @Request() req,
  ) {
    const user = req.user;
    const updated = await this.productService.updateProduct(
      productID,
      createProductDTO,
      user['_doc']._id,
    );
    if (updated.error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: updated.error,
        msg: updated.msg,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        error: updated.error,
        msg: updated.msg,
      });
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Delete('/deleteAll')
  async deleteAllProducts() {
    await this.productService.deleteAll();
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/storeName/:name')
  async getProductsWithStore(@Res() res) {
    const response = await this.productService.getProductsByStore();
    return res.status(HttpStatus.OK).json({
      message: 'All ok',
      response,
    });
  }

  /*@Get('/:name')
  @ApiParam({
    name: 'name',
    required: true,
    description: 'The store name that is representated in the database',
  })
  async getProductsWithStore(@Param('name') storeName){
    
  }
  */
}
