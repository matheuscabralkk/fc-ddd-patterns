import Notification from './notification';

describe('Unit tests for notifications', () => {

    it('should create errors', () => {
        const notification = new Notification();
        const error1 = {
            message: 'error message 1',
            context: 'customer',
        };
        notification.addError(error1);

        expect(notification.messages('customer')).toBe(`customer: ${error1.message},`);

        const error2 = {
            message: 'error message 2',
            context: 'customer',
        };

        notification.addError(error2);

        expect(notification.messages('customer')).toBe(`customer: ${error1.message},customer: ${error2.message},`);

        const error3 = {
            message: 'error message 3',
            context: 'order',
        };

        notification.addError(error3);

        expect(notification.messages('customer')).toBe(`customer: ${error1.message},customer: ${error2.message},`);
        expect(notification.messages()).toBe(`customer: ${error1.message},customer: ${error2.message},order: ${error3.message},`);

    });

    it('should check if notification has at least one error', () => {
        const notification = new Notification();
        const error = {
            message: 'error message',
            context: 'customer',
        }
        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    })

    it('should get all errors props', () => {
        const notification = new Notification();
        const error1 = {
            message: 'error message 1',
            context: 'customer',
        };
        notification.addError(error1);

        const error2 = {
            message: 'error message 2',
            context: 'customer',
        };

        notification.addError(error2);

        const error3 = {
            message: 'error message 3',
            context: 'order',
        };

        notification.addError(error3);

        expect(notification.getErrors()).toEqual([error1, error2, error3]);
    })

})
