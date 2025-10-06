import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/contracts/contractsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditContractsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'contract_title': '',

    start_date: new Date(),

    end_date: new Date(),

    vendor: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { contracts } = useAppSelector((state) => state.contracts)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof contracts === 'object') {
      setInitialValues(contracts)
    }
  }, [contracts])

  useEffect(() => {
      if (typeof contracts === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (contracts)[el])
          setInitialValues(newInitialVal);
      }
  }, [contracts])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/contracts/contracts-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit contracts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit contracts'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="ContractTitle"
    >
        <Field
            name="contract_title"
            placeholder="ContractTitle"
        />
    </FormField>

      <FormField
          label="StartDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.start_date ?
                  new Date(
                      dayjs(initialValues.start_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'start_date': date})}
          />
      </FormField>

      <FormField
          label="EndDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.end_date ?
                  new Date(
                      dayjs(initialValues.end_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'end_date': date})}
          />
      </FormField>

  <FormField label='Vendor' labelFor='vendor'>
        <Field
            name='vendor'
            id='vendor'
            component={SelectField}
            options={initialValues.vendor}
            itemRef={'vendors'}

            showField={'business_name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/contracts/contracts-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditContractsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditContractsPage
