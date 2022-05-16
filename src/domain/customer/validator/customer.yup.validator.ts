import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';
import * as yup from 'yup';

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup.object().shape({
                id: yup.string().required('Customer id is required'),
                name: yup.string().required('Customer name is required'),
            }).validateSync(entity, {
                abortEarly: false,
            });
        } catch (yupErr) {
            const errors = (yupErr as yup.ValidationError).errors;
            errors.forEach(e => {
                entity.notification.addError({
                    context: 'Customer',
                    message: e,
                })
            })
        }
    }
}
