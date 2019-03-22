import { queryVisit, addOrUpdateVisit, removeVisit} from '@/services/coustomApi/respondentApi';

export default {
  namespace: 'respondent',

  state: {
    dataSource:[],
    showSource:[],
    current:1,
    pageSize:10,
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    Respondent : {
      Id: "",
      Name: "",
      Gender: 0,
      Born: "1949-10-01",
      Education: "",
      MaritalStatus: 0,
      DwellingStatus: 0,
      Hobby: "",
      Phone: "",
      IDCard: "",
      Address: "",
      RecordUserId: "3c5e636a-c182-4ad7-a7b1-9205bbe534f5",
      CreatedAt: ""
    },


    formValues: {},
  },

  effects: {
    *queryRespondent({ payload ,callback}, { call, put }) {
      const response = yield call(queryVisit, payload);
      yield put({
        type: 'set',
        payload: {
          dataSource:response.Data,
          showSource:response.Data
        },
      });
      if(callback) callback();
    },
    *removeRespondent({ payload, callback }, { call }) {
      yield call(removeVisit, payload);
      if (callback) callback();
    },
    *addOrUpRespondent({ payload, callback }, { call }) {
      yield call(addOrUpdateVisit, payload);
      if (callback) callback();
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
    queryPage(state, action) {
      let { payload } = action;
      let start = (payload.currentPage - 1) * payload.pageSize;
      let end = start + payload.pageSize;
      let newSource = state.dataSource.slice(start,end);
      return {
        ...state,
        showSource:newSource,
        current:payload.currentPage,
        pageSize:payload.pageSize,
      };
    },
  },
};
