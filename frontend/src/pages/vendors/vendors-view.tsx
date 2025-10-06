import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/vendors/vendorsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const VendorsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { vendors } = useAppSelector((state) => state.vendors)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View vendors')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View vendors')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/vendors/vendors-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>BusinessName</p>
                    <p>{vendors?.business_name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>RegistrationNumber</p>
                    <p>{vendors?.registration_number}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>User</p>

                        <p>{vendors?.user?.firstName ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Contracts Vendor</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ContractTitle</th>

                                <th>StartDate</th>

                                <th>EndDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {vendors.contracts_vendor && Array.isArray(vendors.contracts_vendor) &&
                              vendors.contracts_vendor.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/contracts/contracts-view/?id=${item.id}`)}>

                                    <td data-label="contract_title">
                                        { item.contract_title }
                                    </td>

                                    <td data-label="start_date">
                                        { dataFormatter.dateTimeFormatter(item.start_date) }
                                    </td>

                                    <td data-label="end_date">
                                        { dataFormatter.dateTimeFormatter(item.end_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!vendors?.contracts_vendor?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/vendors/vendors-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

VendorsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default VendorsView;
