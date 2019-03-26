import { queryRelateSym, querySymptom, updateRelateSym} from '@/services/api';

export default {
  namespace: 'synAndSym',

  state: {
    diseaseId:"",
    relateSym:[],
    restSym:[],

    restKey:'',
    restPagination:{
      total: 0,
      pageSize:8,
      current:1
    }
  },

  effects: {
    *changeIdEff({ payload, callback }, { put}){
      yield put({
        type:"changeId",
        payload:payload
      });
      if(callback) callback()
    },
    *queryRelate({ payload }, { call, put }) {
      const response = yield call(queryRelateSym, payload);
      const {Data} = response;
      yield put({
        type: 'set',
        payload: {
          relateSyn:Data || [],
        },
      });
    },
    *querySym({ payload, callback }, { call, put }) {
      const response = yield call(querySymptom, payload);
      const {Data:{rows,pagesize,pageindex,total}} = response;
      yield put({
        type: 'setRest',
        payload: {
          restKey:payload.key,
          restSym:rows,
          restPagination:{
            total: total,
            pageSize:pagesize,
            current:pageindex
          }
        },
      });
      if (callback) callback();
    },
    *updateRelate({ payload, callback }, { call }) {
      yield call(updateRelateSym, payload);
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
    changeId(state, action){
      return {
        ...state,
        diseaseId:action.payload
      }
    },
    set(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setRest(state, action) {
      let { restSym,restPagination,restKey } = action.payload;
      let rest = [];
      if(Array.isArray(restSym)){
        rest = restSym.slice();
        let relateSymText = JSON.stringify(state.relateSym);
        rest.map(item=>{
          if(relateSymText.indexOf(item.Id) !== -1){
            item.disabled = true
          }
        });
      }

      return {
        ...state,
        restKey,
        restSym:rest,
        restPagination
      };
    },
  },
};
