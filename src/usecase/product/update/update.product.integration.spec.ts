import {Sequelize} from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';
import CreateProductUseCase from '../create/create.product.usecase';

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository)
        const product = new Product("123", "product1", 1);
        await productRepository.create(product)

        const input = {
            oldProduct: {
                name: 'product1',
                price: 1,
                type: 'a'
            },
            newProduct: {
                name: 'product2',
                price: 2,
                type: 'a'
            }
        }

        const createdProduct = {
            id: expect.any(String),
            name: 'product1',
            price: 1
        }

        const result1 = await usecase.execute(input.oldProduct)
        expect(result1).toEqual(createdProduct);

        // update product

        const product2 = new Product("123", "product2", 2);
        await productRepository.update(product2)

        const output = {
            id: expect.any(String),
            name: 'product2',
            price: 2
        }

        const result2 = await usecase.execute(input.newProduct)
        expect(result2).toEqual(output);
    });

});
