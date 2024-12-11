'use client'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormikHelpers } from 'formik';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import css from '../page.module.css'

import FormInput from '../../shared/components/form-input/form-input.component';
import Button from '../../shared/components/button/button.component';

import FormPage from '../../shared/components/form-page/form-page.component';
import { initialValues } from './withdraw.const';
import { IMakeWithdraw } from './withdraw.types';
import FormSelect from '../../shared/components/form-select/form-select.component';
import { UserIban } from '../../shared/types/ibans.types';
import { withdrawValidationSchema } from '../../shared/validation/withdraw.validation.schema';
import { useUserId } from '../../hooks/useUserId';

export default function Deposit() {
  const userId = useUserId()
  const [userIbans, setUserIbans] = useState<Array<UserIban>>([])
  

  const getUserIbans = useCallback(async () => {
    const { data } = await axios.get<Array<UserIban>>(`http://localhost:8080/iban/${userId}`)
    setUserIbans(data)
  },[userId])


  useEffect(() => {
    if (userId) {
      getUserIbans()
    }
  },[getUserIbans, userId])
  
  const makeWithdraw = async (data: IMakeWithdraw, helpers: FormikHelpers<IMakeWithdraw>) => {
    try {
      await axios.post('http://localhost:8080/payment/withdraw', data)
       helpers.resetForm()
       Notify.success("created")
     } catch {
       Notify.failure('Bad request')
    } finally {
      getUserIbans()
    }
  }
  return (
    <FormPage title='Withdraw' initialValues={initialValues} validationSchema={withdrawValidationSchema} onSubmit={makeWithdraw}>
      <FormInput disabled={!userId} name='amount' type='number' className={css.input} placeholder='Amount' step={0.1} min={0.1} />
      <FormInput disabled={!userId} name='to' className={css.input} placeholder='Destination IBAN'/>
      <FormSelect name='id' className={css.input} options={userIbans} placeholder='IBAN'/>
      <Button disabled={!userId} type='submit' text='Save'/>
    </FormPage>
  );
}