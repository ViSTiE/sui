import { object, string, number, array, date } from 'yup';

export const campaignSchema = object({
    name: string().trim().ensure().required('Campaign name is required'),
    emails: array()
        .transform((value, originalValue) => {
            if (Array.isArray(value)) {
                return value;
            }
            return (originalValue || '').split(/\r?\n/);
        })
        .of(
            string()
                .ensure()
                .trim()
                .email(({ value }) => {
                    return `"${value}" is not a valid email.`;
                })
                .required()
        )
        .required('At least one email is required'),
    emailTemplate: string().ensure().trim(),
    discount: number().min(0).max(100).required('Discount is required'),
    expiration: date().required('Expiration date is required.'),
});