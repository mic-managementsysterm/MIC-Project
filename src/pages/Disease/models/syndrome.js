import { querySyndrome, addSyndrome, removeSyndrome, updateSyndrome} from '@/services/api';

export default {
  namespace: 'syndrome',

  state: {
    dataSource:[],
    current:1,
    pageSize:10,
    total:0,
    searchKey:'',


    modalVisible: false,
    relateModalVisible: false,
    selectedRows: [],
    Syndrome : {
      Id: "",
      Name: "",
      PinYin:"",
    },
    formValues: {},
  },

  effects: {
    *querySyndrome({ payload }, { call, put }) {
      const response = yield call(querySyndrome, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            dataSource:response.Data.rows,
            current:response.Data.pageindex,
            pageSize:response.Data.pagesize,
            total:response.Data.total,
            searchKey:payload.key
          },
        });
      }
    },
    *addSyndrome({ payload, callback }, { call }) {
      yield call(addSyndrome, payload);
      if (callback) callback();
    },
    *removeSyndrome({ payload, callback }, { call }) {
      yield call(removeSyndrome, payload);
      if (callback) callback();
    },
    *updateSyndrome({ payload, callback }, { call }) {
      yield call(updateSyndrome, payload);
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
