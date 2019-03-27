import { queryDisease } from '@/services/api';

export default {
  namespace: 'getDisease',

  state: {
    diseaseData:[],
  },

  effects: {
    *getDisease({ payload }, { call, put }) {
      const response = yield call(queryDisease, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            diseaseData: response.Data.map(item =>{return item.Name})
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
