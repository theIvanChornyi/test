import {  FormikHelpers, FormikProvider,  useFormik ,FormikValues} from "formik"
import { ReactNode } from 'react'
import css from './form-page.style.module.css'
import Title from "../title/title.component"
import GoBack from "../go-back/go-back.component"
import { ObjectSchema } from "yup"

interface IProps< T extends FormikValues> {
  title: string
  children: ReactNode
  initialValues: T
  onSubmit: (data: T, helpers: FormikHelpers<T>) => Promise<void>
  validationSchema?: ObjectSchema<T>
}

const FormPage = function <T extends FormikValues>({title,children,initialValues,onSubmit,validationSchema}:IProps<T>) {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
  })
  return <section className={css.section}>
    <header className={css.header}>
        <Title as='h1'>{title}</Title>
        <GoBack styles={css.goBack} />
    </header>
    <FormikProvider value={formik}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        {children}
      </form>
    </FormikProvider>
    
  </section>
}

export default FormPage