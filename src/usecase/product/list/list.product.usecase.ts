import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from '../../../domain/product/entity/product';
import {InputListProductDto, OutputListProductDto} from './list.product.dto';

export default class ListProductUsecase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
      const products = await this.productRepository.findAll();
      return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
    static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            })
        }
    }
}
