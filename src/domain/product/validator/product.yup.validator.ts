import ValidatorInterface from '../../@shared/validator/validator.interface';
import Product from '../entity/product';
import * as yup from 'yup';

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required('Id is required'),
                name: yup.string().required('Name is required'),
                price: yup.number().positive('Price must be greater than zero'),
            }).validateSync(entity, {
                abortEarly: false,
            });
        } catch (yupErr) {
            const errors = (yupErr as yup.ValidationError).errors;
            errors.forEach(e => {
                entity.notification.addError({
                    context: 'Product',
                    message: e,
                })
            })
        }
    }
}
