import { getAllQuestionnaire, getAllGauge } from '@/services/api';

export default {
  namespace: 'record',

  state: {
    allQuestionnaireData: [],
    allGaugeData:[]
  },

  effects: {
    *fetchAllQuestionnaire({payload}, { call, put }) {
      const response = yield call(getAllQuestionnaire,payload);
      yield put({
        type: 'show',
        payload: {
          allQuestionnaireData: response.Data,
        },
      });
    },
    *fetchAllGauge({payload}, { call, put }) {
      const response = yield call(getAllGauge);
      yield put({
        type: 'show',
        payload: {
          allGaugeData: response.Data,
        },
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
