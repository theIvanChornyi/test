import * as Yup from 'yup'
import { ERROR_MESSAGES } from '../mesages.const'

export const depositValidationSchema =  Yup.object({
  amount: Yup
    .number()
    .min(0.1,)
    .required(),
  id: Yup
    .string()
    .trim()
    .required(ERROR_MESSAGES.IBAN_REQUIRED),
},)