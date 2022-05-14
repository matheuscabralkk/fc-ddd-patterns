import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product('123', 'product1', 1);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find product use case", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: '123'
        }
        const output = {
            id: '123',
            name: 'product1',
            price: 1,
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output);
    })

    it('should not find a product', async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            return Promise.reject(new Error('Product not found'))
        })
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: '12314143123'
        }

        await expect(async () => {
            return await usecase.execute(input)
        }).rejects.toThrow('Product not found')
    })
});
