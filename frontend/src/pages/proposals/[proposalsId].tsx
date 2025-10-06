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

import { update, fetch } from '../../stores/proposals/proposalsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditProposals = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'proposal_title': '',

    status: '',

    dao_member: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { proposals } = useAppSelector((state) => state.proposals)

  const { proposalsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: proposalsId }))
  }, [proposalsId])

  useEffect(() => {
    if (typeof proposals === 'object') {
      setInitialValues(proposals)
    }
  }, [proposals])

  useEffect(() => {
      if (typeof proposals === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (proposals)[el])

          setInitialValues(newInitialVal);
      }
  }, [proposals])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: proposalsId, data }))
    await router.push('/proposals/proposals-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit proposals')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit proposals'} main>
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
        label="ProposalTitle"
    >
        <Field
            name="proposal_title"
            placeholder="ProposalTitle"
        />
    </FormField>

    <FormField label="Status" labelFor="status">
        <Field name="status" id="status" component="select">

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>

        </Field>
    </FormField>

    <FormField label='DAOMember' labelFor='dao_member'>
        <Field
            name='dao_member'
            id='dao_member'
            component={SelectField}
            options={initialValues.dao_member}
            itemRef={'dao_members'}

            showField={'member_name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/proposals/proposals-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditProposals.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditProposals
