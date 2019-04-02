export default {
  namespace: 'routerParams',

  state: {
    Respondent:{},
    RecordId:'',
    RecordAddId:'',
  },

  effects: {
    *setStates({payload}, { _, put }) {
      yield put({
        type: 'set',
        payload: payload,
      });
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
