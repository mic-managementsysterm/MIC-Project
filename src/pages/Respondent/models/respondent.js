import { queryVisit, addOrUpdateVisit, removeVisit} from '@/services/api';

export default {
  namespace: 'respondent',

  state: {
    dataSource:[],
    showSource:[],
    current:1,
    pageSize:10,
    total:0,
    searchKey:'',

    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    Respondent : {
      Id: "",
      Name: "",
      Gender: 0,
      Born: "",
      Education: "",
      MaritalStatus: 0,
      DwellingStatus: 0,
      Hobby: "",
      Phone: "",
      IDCard: "",
      Address: "",
      RecordUserId: "",
      CreatedAt: ""
    },


    formValues: {},
  },

  effects: {
    *queryRespondent({ payload ,callback}, { call, put }) {
      const response = yield call(queryVisit, payload);
      const{rows,pageindex,pagesize,total} =response.Data;
      yield put({
        type: 'set',
        payload: {
          dataSource:rows,
          current:pageindex,
          pageSize:pagesize,
          total:total,
        },
      });
      if(callback) callback();
    },
    *removeRespondent({ payload, callback }, { call }) {
      yield call(removeVisit, payload);
      if (callback) callback();
    },
    *addOrUpRespondent({ payload, callback }, { call }) {
       const response = yield call(addOrUpdateVisit, payload);
      if (callback) callback(response);

    },
    *setStates({ payload }, { put }) {
      yield put({
        type: 'set',
        payload: {
          ...payload
        },
      });
    },
  },

  reducers: {
    set(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
