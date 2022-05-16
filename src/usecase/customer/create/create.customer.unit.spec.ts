import address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from './create.customer.usecase';

const input = {
    name: 'John',
    address: {
        street: 'Street',
        number: 123,
        city: 'city',
        zip: 'zip'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create customer use case', () => {
    let repository: any;
    let useCase: any;

    beforeEach(() => {
        repository = MockRepository();
        useCase = new CreateCustomerUseCase(repository);
    })

    it('should create a customer', async () => {
        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zip: input.address.zip
            }
        })
    })

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Customer: Customer name is required');
    })

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Street is required');
    })
})
