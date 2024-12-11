'use client'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormikHelpers } from 'formik';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import css from '../page.module.css'

import FormInput from '../../shared/components/form-input/form-input.component';
import Button from '../../shared/components/button/button.component';

import FormPage from '../../shared/components/form-page/form-page.component';
import { initialValues } from './deposit.const';
import { IMakeDeposit } from './deposit.types';
import FormSelect from '../../shared/components/form-select/form-select.component';
import { depositValidationSchema } from '../../shared/validation/deposit.validation.schema';
import { UserIban } from '../../shared/types/ibans.types';
import { useUserId } from '../../hooks/useUserId';

export default function Deposit() {
  const userId = useUserId()
  const [userIbans, setUserIbans] = useState<Array<UserIban>>([])
  

  const getUserIbans = useCallback(async () => {
    const { data } = await axios.get<Array<UserIban>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/iban/${userId}`)
    setUserIbans(data)
  },[userId])


  useEffect(() => {
    if (userId) {
      getUserIbans()
    }
  },[getUserIbans, userId])
  
  const makeDeposit = async (data: IMakeDeposit, helpers: FormikHelpers<IMakeDeposit>) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/deposit`, data)
       helpers.resetForm()
       Notify.success("created")
     } catch {
       Notify.failure('Bad request')
    } finally {
      getUserIbans()
    }
  }
  return (
    <FormPage title='Deposit' initialValues={initialValues} validationSchema={depositValidationSchema} onSubmit={makeDeposit}>
      <FormInput disabled={!userId} name='amount' type='number' className={css.input} placeholder='Amount' step={0.1} min={0.1} />
      <FormSelect name='id' className={css.input} options={userIbans} placeholder='IBAN'/>
      <Button disabled={!userId} type='submit' text='Save'/>
    </FormPage>
  );
}