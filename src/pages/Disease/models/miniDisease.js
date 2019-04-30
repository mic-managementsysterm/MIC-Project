import { queryDisease, addDisease, removeDisease, updateDisease,queryDisAndSyn,querySymType,addSymType,querySearchSymType,removeSymType} from '@/services/api';

export default {
  namespace: 'disMini',

  state: {
    // 是否常见
    Prevalent:2,
    dataSource:[],
    current:1,
    pageSize:10,
    total:0,
    searchKey:'',
    modalVisible: false,
    relateModalVisible: false,
    selectedRows: [],

    Disease : {
      Id: "",
      Name: "",
      PinYin:"",
      Prevalent:false,
    },
    formValues: {},
  },

  effects: {
    *queryDisease({ payload,callback }, { call, put }) {
      const response = yield call(queryDisease, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            dataSource:response.Data.rows,
            current:response.Data.pageindex,
            pageSize:response.Data.pagesize,
            total:response.Data.total,
            searchKey:payload.key,
            Prevalent:payload.Prevalent
          },
        });
        if (callback) callback();
      }
    },
    *addDisease({ payload, callback }, { call }) {
      yield call(addDisease, payload);
      if (callback) callback();
    },
    *removeDisease({ payload, callback }, { call }) {
      yield call(removeDisease, payload);
      if (callback) callback();
    },
    *updateDisease({ payload, callback }, { call }) {
      yield call(updateDisease, payload);
      if (callback) callback();
    },

    *setStates({ payload, callback }, { put }) {
      yield put({
        type: 'set',
        payload: {
          ...payload
        },
      });
      if(callback) callback();
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
