import CreateProductUseCase from './create.product.usecase';

const input = {
    name: 'product1',
    price: 123,
    type: 'a',
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create product use case', () => {
    let repository: any;
    let useCase: any;

    beforeEach(() => {
        repository = MockRepository();
        useCase = new CreateProductUseCase(repository);
    })

    it('should create a product', async () => {
        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    })

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow('Name is required');
    })

    it("should throw an error when price is less then zero", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        input.name = "product1";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    })
})
