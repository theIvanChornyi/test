'use client'
import axios from "axios"
import {  useCallback, useEffect, useState } from "react"
import { FormikHelpers, FormikProvider, useFormik } from "formik"
import Button from "../../shared/components/button/button.component"
import Title from "../../shared/components/title/title.component"
import css from './quick-form.style.module.css'
import { quickFormValidationSchema } from "../../shared/validation/quick-form.validation.schema"
import FormInput from "../../shared/components/form-input/form-input.component"
import { IQuickForm } from "./quick-form.types"
import { initialValues } from "./quick-form.const"
import { UserIban } from "../../shared/types/ibans.types"
import FormSelect from "../../shared/components/form-select/form-select.component"
import { useUserId } from "../../hooks/useUserId"
import { Notify } from "notiflix"
import { ERROR_MESSAGES, MESSAGES } from "../../shared/mesages.const"

const QuickForm = () => {

  const userId = useUserId()
  const [userIbans, setUserIbans] = useState<Array<UserIban>>([])
  

  const getUserIbans = useCallback(async () => {
    const { data } = await axios.get<Array<UserIban>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/iban/${userId}`)
    setUserIbans(data)
  }, [userId])
  
  const createTransaction = async (formData: IQuickForm, helpers: FormikHelpers<IQuickForm>) => {
    const data = {userId,...formData,}
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/create`, data)
      helpers.resetForm()
      Notify.success(MESSAGES.SUCCESS)
    } catch {
      Notify.failure(ERROR_MESSAGES.BAD_REQUEST)
    }
  }


  useEffect(() => {
    if (userId) {
      getUserIbans()
    }
  },[getUserIbans, userId])

  const validationSchema = quickFormValidationSchema(100)

  const formik = useFormik<IQuickForm>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: createTransaction
  })

  return  <section className={css.formWrapper}>
    <Title>Quick Transfer</Title>
    <FormikProvider value={formik}>
      <form className={css.form} onSubmit={formik.handleSubmit} >
        <FormInput styles={css.input} name="to" type="text" placeholder="Account number" maxLength={34}/>
        <FormInput styles={css.input} name='amount' type="number" placeholder="Enter amount" min={0} step={0.1} />
        <FormSelect name='from' className={css.input} options={userIbans} placeholder='IBAN'/>
        <ul className={css.formButtonsList}>
          <li className={css.formButtonsItem}>
            <Button type="submit" text="Send money"/>
          </li>
        </ul>
      </form>
      </FormikProvider>
    </section>
}

export default QuickForm