import { uploadMedical,getSymByType } from '@/services/api';

export default {
  namespace: 'addMedical',
  state: {},

  effects: {
    *upload({ payload ,callback}, { call }) {
      yield call(uploadMedical, payload);
      if (callback) callback()
    },
    *getSym({ payload ,callback}, { call }) {
      const  response = yield call(getSymByType, payload);
      if (callback && response.Success) callback(response.Data)
    },
  },
};
