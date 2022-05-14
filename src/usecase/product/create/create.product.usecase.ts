import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductFactory from '../../../domain/product/factory/product.factory';
import Product from '../../../domain/product/entity/product';
import {InputCreateProductDto, OutputCreateProductDto} from './create.product.dto';

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
      const product = ProductFactory.create('a', input.name, input.price);
      if (product instanceof Product) {
          await this.productRepository.create(product);
      }
      return {
          id: product.id,
          name: product.name,
          price: product.price
      };
  }
}
