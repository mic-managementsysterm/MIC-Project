import { getAllGauge, deletePhy } from '@/services/api';

export default {
  namespace: 'phy',

  state: {
    phys: [],
  },
  effects: {
    *getAllPhy({ payload }, { call, put }) {
      const response = yield call(getAllGauge,payload);
      yield put({
        type: 'show',
        payload: {
          phys: response.Data
        }
      });
      if (callback) callback()
    },
    *deletePhy({payload,callback},{call,put}){
      yield call(deletePhy,payload)
      if (callback) callback()
    },
  },
  reducers: {
    show(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
}
