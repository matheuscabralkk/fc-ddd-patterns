import {Sequelize} from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';
import ListProductUsecase from './list.product.usecase';

describe("Test list products use case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUsecase(productRepository)
        const product1 = new Product("1", "product1", 1);
        const product2 = new Product("2", "product2", 2);
        await productRepository.create(product1)
        await productRepository.create(product2)

        const input = {}
        const output = {
            products: [{
                id: '1',
                name: 'product1',
                price: 1
            }, {
                id: '2',
                name: 'product2',
                price: 2
            }]
        }
        const result = await usecase.execute(input)
        expect(result).toEqual(output);
    })

});
