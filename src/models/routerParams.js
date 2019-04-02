import { DataType } from '@/utils/buildParams'

export default {
  namespace: 'routerParams',

  state: {
    Respondent:{},
    RecordId:'',
    RecordAddId:'',
  },

  effects: {
    *setStates({payload}, { _, put }) {
      yield put({
        type: 'set',
        payload: payload,
      });
    },
    *resets({payload}, { _, put }) {
      let obj ={};
      for(let k in state){
        if(state.hasOwnProperty(k)){
          let session = sessionStorage.getItem(k);
          session && (obj[k] = JSON.parse(session))
        }
      }
      console.log('obj',obj)
      yield put({
        type: 'set',
        payload: obj,
      });
    },
  },

  reducers: {
    set(state, action) {
      const {payload} = action;
      for(let key in payload){
        if(payload.hasOwnProperty(key)){
          payload[key] && sessionStorage.setItem(key,JSON.stringify(payload[key]))
        }
      }
      return {
        ...state,
        ...action.payload,
      };
    },
    reset(state, action) {
      let obj ={};
      for(let k in state){
        if(state.hasOwnProperty(k)){
          let session = sessionStorage.getItem(k);
          session && (obj[k] = JSON.parse(session))
        }
      }
      return {
        ...state,
        ...obj,
      };
    },
  },


  subscriptions: {
    restore({ dispatch,_ }) {
      dispatch({
        type: 'reset',
      });
    },
  },
};
