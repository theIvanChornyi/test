'use client'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormikHelpers } from 'formik';
import axios from 'axios';

import css from '../page.module.css'
import FormInput from '../../shared/components/form-input/form-input.component';
import Button from '../../shared/components/button/button.component';

import { initialValues } from './add-iban.const';
import { IAddIbanFrom } from './add-iban.types';
import FormPage from '../../shared/components/form-page/form-page.component';
import { addIbanValidationSchema } from '../../shared/validation/add-iban.validation.schema';
import { ERROR_MESSAGES, MESSAGES } from '../../shared/mesages.const';
import { useUserId } from '../../hooks/useUserId';

export default function AddIban() {
  const userId = useUserId()

  const addNewIban = async(data:IAddIbanFrom, helpers:FormikHelpers<IAddIbanFrom>) => {
    try {
      await axios.post(`${process.env.BACKEND_URL}/iban/add`, {
      iban:data.iban,
      userId
      })
      helpers.resetForm()
      Notify.success(MESSAGES.SUCCESS)
    } catch {
      Notify.failure(ERROR_MESSAGES.BAD_REQUEST)
    }
  }
  return (
    <FormPage title='Add your IBAN' initialValues={initialValues} validationSchema={addIbanValidationSchema} onSubmit={addNewIban}>
      <FormInput disabled={!userId} name='iban' className={css.input} placeholder='IBAN'/>
      <Button disabled={!userId} type='submit' text='Send'/>
    </FormPage>
  );
}