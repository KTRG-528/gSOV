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

import { update, fetch } from '../../stores/sovereign_members/sovereign_membersSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditSovereign_members = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'name': '',

    'identity_number': '',

    user: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { sovereign_members } = useAppSelector((state) => state.sovereign_members)

  const { sovereign_membersId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: sovereign_membersId }))
  }, [sovereign_membersId])

  useEffect(() => {
    if (typeof sovereign_members === 'object') {
      setInitialValues(sovereign_members)
    }
  }, [sovereign_members])

  useEffect(() => {
      if (typeof sovereign_members === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (sovereign_members)[el])

          setInitialValues(newInitialVal);
      }
  }, [sovereign_members])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: sovereign_membersId, data }))
    await router.push('/sovereign_members/sovereign_members-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit sovereign_members')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit sovereign_members'} main>
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
        label="Name"
    >
        <Field
            name="name"
            placeholder="Name"
        />
    </FormField>

    <FormField
        label="IdentityNumber"
    >
        <Field
            name="identity_number"
            placeholder="IdentityNumber"
        />
    </FormField>

    <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/sovereign_members/sovereign_members-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditSovereign_members.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditSovereign_members
