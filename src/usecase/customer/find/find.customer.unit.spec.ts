import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';
import CreateCustomerUseCase from '../create/create.customer.usecase';

const customer = new Customer('123', 'john', new Address('street', 123, 'zip', 'city'));

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: '123'
        }
        const output = {
            id: '123',
            name: 'john',
            address: {
                street: 'street',
                city: 'city',
                number: 123,
                zip: 'zip'
            }
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output);
    })

    it('should not find a customer', async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            return Promise.reject(new Error('Customer not found'))
        })
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: '123'
        }

        await expect(async () => {
            return await usecase.execute(input)
        }).rejects.toThrow('Customer not found')
    })
});
