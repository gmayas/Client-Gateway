import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { PRODUCTS_SERVICE } from 'src/config/services';

@Controller('product')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
  ) {}
   
  @Post()
  async createProduct(@Body() body: any) {
    try {
      const response = this.productsClient.send({ cmd: 'create_product' }, body);
      const product = await response.toPromise();
      console.log('Product created:', product);
      return product;
    } catch (error) {
      return { message: 'Error creating product', error: error.message, status: 500 };
    }
  }

  @Get()
  async getAllProducts() {
    try {
      const response = this.productsClient.send({ cmd: 'get_all_products' }, {});
      const products = await response.toPromise();
      console.log('Products fetched:', products);
      return products;
    } catch (error) {
      return { message: 'Error fetching products', error: error.message, status: 500 };
    }
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = this.productsClient.send({ cmd: 'get_product_by_id' }, { id });  
      const product = await response.toPromise();
      console.log('Product fetched:', product);
      return product;
    } catch (error) {
      return { message: 'Error fetching product', error: error.message, status: 500 };
    }
  }
  
  @Patch(':id')
  async updateProductById(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    try {
      console.log('Updating product with ID:', id, 'and data:', body);
      const response = this.productsClient.send({ cmd: 'update_product' }, { id, ...body });
      const product = await response.toPromise();
      console.log('Product updated:', product);
      return product;
    } catch (error) {
      return { message: 'Error updating product', error: error.message, status: 500 };
    }
  }   

  @Delete(':id')
   async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = this.productsClient.send({ cmd: 'delete_product' }, { id });
      const product = await response.toPromise();
      console.log('Product deleted:', product);
      return product;
    } catch (error) {
      return { message: 'Error deleting product', error: error.message, status: 500 };
    }
  }

}