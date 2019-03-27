import { querySyndrome } from '@/services/api';

export default {
  namespace: 'getSyndrome',

  state: {
    syndromeData:[],
  },

  effects: {
    *getSyndrome({ payload }, { call, put }) {
      const response = yield call(querySyndrome, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            syndromeData: response.Data.map(item =>{return item.Name})
          }

        });
      }
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
