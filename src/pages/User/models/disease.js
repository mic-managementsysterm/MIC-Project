import { getDisease } from '@/services/api';

export default {
  namespace: '_disease',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(getDisease, payload);
      yield put({
        type: 'show',
        payload: response,
      });
      if (callback) callback()
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
