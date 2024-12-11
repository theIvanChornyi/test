import {
	useFormikContext, getIn,
} from 'formik'
import { InputHTMLAttributes } from 'react'
import css from './form-input.style.module.css'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  styles?: string
}

const FormInput: React.FunctionComponent<IProps> = ({
  name,
  styles,
  ...props
},) => {
	const {
		values, handleChange, errors , handleBlur, touched,
	} = useFormikContext<Record<string, string>>()
	const isErrorExists = Boolean(getIn(errors, name,),) && Boolean(touched[name],)
  return <span className={css.inputWrapper}>
		<input
			id={name}
			value={values[name] ?? ''}
			onChange={handleChange}
			onBlur={handleBlur}
      className={styles}
			{...props}
		/>
    {isErrorExists && <div className={css.errorMessage}>
      {errors[name]}</div>}
	</span>
}

export default FormInput