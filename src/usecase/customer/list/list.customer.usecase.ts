import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import {InputListCustomerDto, OutputListCustomerDto} from './list.customer.dto';
import Customer from '../../../domain/customer/entity/customer';

export default class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
      const customers = await this.customerRepository.findAll();
      return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.Address.street,
                        number: customer.Address.number,
                        zip: customer.Address.zip,
                        city: customer.Address.city,
                    }
                }
            })
        }
    }
}
