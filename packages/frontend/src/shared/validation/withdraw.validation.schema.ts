import * as Yup from 'yup'
import { IBAN_REGEX } from '../const'
import { ERROR_MESSAGES } from '../mesages.const'

export const withdrawValidationSchema =  Yup.object({
  amount: Yup
    .number()
    .min(0.1,)
    .required(),
  id: Yup
    .string()
    .trim()
    .required(),
  to: Yup
  .string()
  .matches(IBAN_REGEX, ERROR_MESSAGES.INVALID_IBAN,)
  .min(5,ERROR_MESSAGES.INVALID_IBAN)
  .max(34,ERROR_MESSAGES.INVALID_IBAN)
  .trim()
  .required(ERROR_MESSAGES.IBAN_REQUIRED),
},)