import { queryRelate, queryRest, querySyndrome, updateRelate} from '@/services/api';
export default {
  namespace: 'disAndSyn',

  state: {
    diseaseId:"",
    relateSyn:[],
    restSyn:[]
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
      yield put({
        type: 'set',
        payload: {
          relateSyn:response.Data || []
        },
      });
    },
    *queryRest({ payload, callback }, { call, put }) {
      const response = yield call(queryRest, payload);
      const {Data:{rows}} = response
      yield put({
        type: 'set',
        payload: {
          restSyn:rows || []
        },
      });
      if (callback) callback();
    },
    *querySynEff({ payload, callback }, { call, put }) {
      const response = yield call(querySyndrome, payload);
      yield put({
        type: 'querySyn',
        payload: {
          restSyn:response.Data
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
    querySyn(state, action) {
      let { restSyn } = action.payload;
      let rest = [];
      if(restSyn.constructor.prototype === Array.prototype){
        rest = restSyn.slice();
        let relateSynText = JSON.stringify(state.relateSyn);
        restSyn = rest.filter( item => relateSynText.indexOf(item.Id) < 0 )
      }else {
        restSyn = []
      }
      return {
        ...state,
        restSyn,
      };
    },
  },
};
