import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/dao_members/dao_membersSlice'
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

const Dao_membersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { dao_members } = useAppSelector((state) => state.dao_members)

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
              <title>{getPageTitle('View dao_members')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View dao_members')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/dao_members/dao_members-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>MemberName</p>
                    <p>{dao_members?.member_name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>User</p>

                        <p>{dao_members?.user?.firstName ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Proposals DAOMember</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ProposalTitle</th>

                                <th>Status</th>

                            </tr>
                            </thead>
                            <tbody>
                            {dao_members.proposals_dao_member && Array.isArray(dao_members.proposals_dao_member) &&
                              dao_members.proposals_dao_member.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/proposals/proposals-view/?id=${item.id}`)}>

                                    <td data-label="proposal_title">
                                        { item.proposal_title }
                                    </td>

                                    <td data-label="status">
                                        { item.status }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!dao_members?.proposals_dao_member?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/dao_members/dao_members-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Dao_membersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default Dao_membersView;
