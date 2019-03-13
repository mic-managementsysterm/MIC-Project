import { addRecord } from '@/services/api';

export default {
  namespace: 'record',

  state: {
    list: [],
    data:{},
  },

  effects: {
    *fetchRecord(_, { call, put }) {
      const response = yield call(addRecord);
      console.log('@response', response)
      yield put({
        type: 'show',
        payload: response.Data,
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
