import * as Yup from 'yup'
import { IBAN_REGEX } from '../const'
import { ERROR_MESSAGES } from '../mesages.const'

export const quickFormValidationSchema = (max: number,):Yup.AnyObjectSchema => Yup.object({
    amount: Yup
			.number()
			.min(0.1,)
			.max(max,)
			.required(),

		from: Yup
			.string()
			.trim()
      .required(ERROR_MESSAGES.IBAN_REQUIRED),
    to: Yup
			.string()
      .matches(IBAN_REGEX, ERROR_MESSAGES.INVALID_IBAN,)
      .min(5,ERROR_MESSAGES.INVALID_IBAN)
      .max(34,ERROR_MESSAGES.INVALID_IBAN)
			.trim()
			.required(ERROR_MESSAGES.IBAN_REQUIRED),
},)