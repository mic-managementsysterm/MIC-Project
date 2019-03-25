import { uploadMedical } from '@/services/api';

export default {
  namespace: 'addMedical',
  state: {},

  effects: {
    *upload({ payload ,callback}, { call }) {
      yield call(uploadMedical, payload);
      if (callback) callback()
    },
  },
};
