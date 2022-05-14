import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUsecase from './update.product.usecase';

const product = ProductFactory.create('a', "product1", 1);

const input = {
    id: product.id,
    name: "product1 updated",
    price: 2
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(() => Promise.resolve([product])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test for update product use case', () => {
    let productRepository: any;
    let productUpdateUseCase: any;

    beforeEach(() => {
        productRepository = MockRepository();
        productUpdateUseCase = new UpdateProductUsecase(productRepository);
    });
    it('should update product', async () => {
        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(output);
    });
});
