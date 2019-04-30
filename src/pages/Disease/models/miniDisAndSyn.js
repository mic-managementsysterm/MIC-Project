import { queryRelate, querySyndrome, updateRelate} from '@/services/api';

export default {
  namespace: 'miniDisAndSyn',

  state: {
    diseaseId:"",
    relateSyn:[],
    restSyn:[],

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
      const response = yield call(queryRelate, payload);
      const {Data} = response;
      yield put({
        type: 'set',
        payload: {
          relateSyn:Data || [],
        },
      });
    },
    *querySyn({ payload, callback }, { call, put }) {
      const response = yield call(querySyndrome, payload);
      const {Data:{rows,pagesize,pageindex,total}} = response;
      yield put({
        type: 'setRest',
        payload: {
          restKey:payload.key,
          restSyn:rows,
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
      yield call(updateRelate, payload);
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
      let { restSyn,restPagination,restKey } = action.payload;
      let rest = [];
      if(Array.isArray(restSyn)){
        rest = restSyn.slice();
        let relateSynText = JSON.stringify(state.relateSyn);
        rest.map(item=>{
          if(relateSynText.indexOf(item.Id) !== -1){
            item.disabled = true
          }
        });
      }

      return {
        ...state,
        restKey,
        restSyn:rest,
        restPagination
      };
    },
  },
};
