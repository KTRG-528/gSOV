import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },

        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },

        contractsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.contract_title)
        },
        contractsOneListFormatter(val) {
            if (!val) return ''
            return val.contract_title
        },
        contractsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.contract_title}
            });
        },
        contractsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.contract_title, id: val.id}
        },

        dao_membersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.member_name)
        },
        dao_membersOneListFormatter(val) {
            if (!val) return ''
            return val.member_name
        },
        dao_membersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.member_name}
            });
        },
        dao_membersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.member_name, id: val.id}
        },

        documentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.document_title)
        },
        documentsOneListFormatter(val) {
            if (!val) return ''
            return val.document_title
        },
        documentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.document_title}
            });
        },
        documentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.document_title, id: val.id}
        },

        proposalsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.proposal_title)
        },
        proposalsOneListFormatter(val) {
            if (!val) return ''
            return val.proposal_title
        },
        proposalsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.proposal_title}
            });
        },
        proposalsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.proposal_title, id: val.id}
        },

        vendorsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.business_name)
        },
        vendorsOneListFormatter(val) {
            if (!val) return ''
            return val.business_name
        },
        vendorsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.business_name}
            });
        },
        vendorsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.business_name, id: val.id}
        },

}
