import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress('customer1', new Address('street1', 123, 'zip', 'city'));

const customer2 = CustomerFactory.createWithAddress('customer2', new Address('street2', 123, 'zip', 'city'));

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
}

describe('Unit test for list customer use case', () => {
    let mockRepository: any;
    let listCustomerUseCase: any;

    beforeEach(() => {
        mockRepository = MockRepository();
        listCustomerUseCase = new ListCustomerUseCase(mockRepository);
    });

    it('should return list of customers', async () => {
        const output = await listCustomerUseCase.execute();
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
});
