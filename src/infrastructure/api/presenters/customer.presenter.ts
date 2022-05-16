import {toXML} from 'jstoxml';
import {OutputListCustomerDto} from '../../../usecase/customer/list/list.customer.dto';

export class CustomerPresenter {
    public static toXMLList(data: OutputListCustomerDto): string {
        const xmlOptions = {header: true, indent: '  ', newline: '\n', allowEmpty: true}
        return toXML({
            customers: data.customers.map(customer => {
                return {
                    customer: {
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            city: customer.address.city,
                            number: customer.address.number,
                            zip: customer.address.zip
                        }
                    }
                };
            })
        }, xmlOptions);
    }
}
