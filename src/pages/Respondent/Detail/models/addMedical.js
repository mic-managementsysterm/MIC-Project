import { uploadMedical } from '@/services/api';

export default {
  namespace: 'addMedical',

  state: {},

  effects: {
    *upload({ payload }, { call, }) {
      yield call(uploadMedical, payload)
    },
  },
};
