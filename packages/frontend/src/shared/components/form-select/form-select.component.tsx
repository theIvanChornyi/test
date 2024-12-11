import {
	useFormikContext, getIn,
} from 'formik'
import { SelectHTMLAttributes } from 'react'
import css from './form-select.style.module.css'

interface IProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string,
  styles?: string
  options?: Array<T>
  placeholder?:string
}

const FormSelect = function <T extends { iban: string, id: string,currency:string,balance:number }>({
  name,
  styles,
  options,
  placeholder = "Select",
  ...props
}:IProps<T>,) {
	const {
		values, handleChange, errors , handleBlur, touched,
  } = useFormikContext<Record<string, string>>()
  
  const isErrorExists = Boolean(getIn(errors, name,),) && Boolean(touched[name],)
  const balance = options?.find(({ id }) =>id ===  values[name] )
  return <span className={css.inputWrapper}>
    <select id={name}
      value={values[name] ?? ''}
      onChange={handleChange}
			onBlur={handleBlur}
      className={styles}
      {...props}>
      <option>{placeholder}</option>
      {options?.map(({ iban, id }) => <option key={id} value={id}>{iban}</option>
        )}
    </select>

    <p className={css.balanceWrapper}>
      <span className={css.balanceValue}>Balance:</span>
      <span className={css.balanceValue}>{`${balance?.balance ?? 0} ${balance?.currency ?? ''}`}</span>
    </p>
    {isErrorExists && <div className={css.errorMessage}>
      {errors[name]}</div>}
	</span>
}

export default FormSelect