import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
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

const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)

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
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>

                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <>
                    <p className={'block font-bold mb-2'}>Dao_members User</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>MemberName</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.dao_members_user && Array.isArray(users.dao_members_user) &&
                              users.dao_members_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/dao_members/dao_members-view/?id=${item.id}`)}>

                                    <td data-label="member_name">
                                        { item.member_name }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.dao_members_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Executors User</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>OfficeName</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.executors_user && Array.isArray(users.executors_user) &&
                              users.executors_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/executors/executors-view/?id=${item.id}`)}>

                                    <td data-label="office_name">
                                        { item.office_name }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.executors_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Guests User</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>GuestName</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.guests_user && Array.isArray(users.guests_user) &&
                              users.guests_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/guests/guests-view/?id=${item.id}`)}>

                                    <td data-label="guest_name">
                                        { item.guest_name }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.guests_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Sovereign_members User</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Name</th>

                                <th>IdentityNumber</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.sovereign_members_user && Array.isArray(users.sovereign_members_user) &&
                              users.sovereign_members_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/sovereign_members/sovereign_members-view/?id=${item.id}`)}>

                                    <td data-label="name">
                                        { item.name }
                                    </td>

                                    <td data-label="identity_number">
                                        { item.identity_number }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.sovereign_members_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Vendors User</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>BusinessName</th>

                                <th>RegistrationNumber</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.vendors_user && Array.isArray(users.vendors_user) &&
                              users.vendors_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/vendors/vendors-view/?id=${item.id}`)}>

                                    <td data-label="business_name">
                                        { item.business_name }
                                    </td>

                                    <td data-label="registration_number">
                                        { item.registration_number }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.vendors_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;
