import { getCognitionDetail, getDiagnosisDetail, getPhysicochemicalDetail, getMMSEDetail, getMOCADetail } from '@/services/api';

export default {
  namespace: 'detail',
  state: {
    cognitionData: {
      Images: [],
      Infos:[],
    },
    diagnosisData: {},
    physicochemicalData: {
      GaugeRecord: {},
      RecordInfos: []
    },
    mmseData: {
      Infos:[],
    },
    mocaData: {
      Infos:[],
    },
  },

  effects: {
    *fetchCognitionDetail({payload}, { call, put }) {
      const response = yield call(getCognitionDetail,payload);
      if (response.Success){
        yield put({
          type: 'show',
          payload: {
            cognitionData: response.Data,
          },
        });
      };
    },

    *fetchPhysicochemicalDetail({payload},{ call, put}) {
      const response = yield call(getPhysicochemicalDetail,payload);
      if (response.Success) {
        yield put({
          type: 'show',
          payload: {
            physicochemicalData: response.Data,
          },
        });
      };
    },

    *fetchDiagnosisDetail({payload},{ call, put}) {
      const response = yield call(getDiagnosisDetail,payload);
      if (response.Success) {
        yield put({
          type: 'show',
          payload: {
            diagnosisData: response.Data,
          },
        });
      };
    },

    *fetchMMSEDetail({payload},{ call, put}) {
      const response = yield call(getMMSEDetail,payload);
      if (response.Success) {
        yield put({
          type: 'show',
          payload: {
            mmseData: response.Data,
          },
        });
      };
    },

    *fetchMOCADetail({payload},{ call, put}) {
      const response = yield call(getMOCADetail,payload);
      if (response.Success) {
        yield put({
          type: 'show',
          payload: {
            mocaData: response.Data,
          },
        });
      };
    },
  },

  reducers: {
    show(state,action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
