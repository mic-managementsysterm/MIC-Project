import { uploadMedical,getSymByType,addOrUpdatePic,queryDisAndSyn,querySyndrome } from '@/services/api';

export default {
  namespace: 'addMedical',
  state: {
    diagSearchValue:'',
    diagData:[],
    diaAndSynData:[],


    selectDiagnose:null,
    selectRelateRows:[],
    modalVisible:false,
    synData:[],
    synSearchKey:'',
    synCurrent:1,
    synPageSize:8,
    synTotal:0,
  },

  effects: {
    *upload({ payload ,callback}, { call }) {
      yield call(uploadMedical, payload);
      if (callback) callback()
    },
    *addOrUpdatePic({payload,callback},{call}){
      const  response = yield call(addOrUpdatePic, payload);
      if (callback) callback(response)
    },
    *getSym({ payload ,callback}, { call }) {
      const  response = yield call(getSymByType, payload);
      if (callback && response.Success) callback(response.Data)
    },
    *queryDisAndSyn({ payload,callback }, { call, put }) {
      const response = yield call(queryDisAndSyn, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            diaAndSynData:response.Data.rows,
            diagSearchValue:payload.key
          },
        });
        if (callback) callback();
      }
    },
    *querySyn({ payload, callback }, { call, put }) {
      const response = yield call(querySyndrome, payload);
      const {Data:{rows,pagesize,pageindex,total}} = response;
      yield put({
        type: 'set',
        payload: {
          synData:rows,
          synSearchKey:payload.key,
          synTotal: total,
          synPageSize:pagesize,
          synCurrent:pageindex
        },
      });
      if (callback) callback();
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
