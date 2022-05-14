import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUsecase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress("John", new Address("street", 123, "Zip", "City"));

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(() => Promise.resolve([customer])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test for update customer use case', () => {
    let customerRepository: any;
    let customerUpdateUseCase: any;

    beforeEach(() => {
        customerRepository = MockRepository();
        customerUpdateUseCase = new UpdateCustomerUsecase(customerRepository);
    });
    it('should update customer', async () => {
        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(output);
    });
});
