import { querySymptom, addSymptom, removeSymptom, updateSymptom} from '@/services/api';
import { message} from 'antd';

export default {
  namespace: 'symptom',

  state: {
    dataSource:[],
    current:1,
    pageSize:10,
    total:0,
    searchKey:'',


    modalVisible: false,
    selectedRows: [],
    Symptom : {
      Id: '',
      Name: '',
      PinYin:'',
      Prevalent:false,
      SymptomTypeName:'',
      Type:''
    },
    formValues: {},
  },

  effects: {
    *querySymptom({ payload }, { call, put }) {
      const response = yield call(querySymptom, payload);
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
    *addSymptom({ payload, callback }, { call }) {
      const response = yield call(addSymptom, payload);
      if (response.Success && callback){
        callback();
      } else {
        message.error(response.Message || response.InnerMessage)
      }
    },
    *removeSymptom({ payload, callback }, { call }) {
      yield call(removeSymptom, payload);
      if (callback) callback();
    },
    *updateSymptom({ payload, callback }, { call }) {
      const response = yield call(updateSymptom, payload);
      if (response.Success && callback){
        callback();
      } else {
        message.error(response.Message || response.InnerMessage)
      }
    },
    *setStates ({ payload, callback }, { put }) {
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
