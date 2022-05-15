export type NotificationErrorProps = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    getErrors() {
        return this.errors;
    }

    public addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if (!context || context === error.context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }

    hasErrors() {
        return this.errors.length > 0;
    }
}
