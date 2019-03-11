import { queryRule, removeRule, addRule, updateRule,
  queryDisease, removeDisease, addDisease, updateDisease,} from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    data1: {
      list: [],
      pagination: {},
    },
    data2: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *fetchDisease({ payload }, { call, put }) {
      const response = yield call(queryDisease, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSyn({ payload,callback }, { call, put }) {
      const response = yield call(queryDisease, payload);
      yield put({
        type: 'relate',
        payload: response,
      });
      if(callback) callback();
    },
    *addDisease({ payload, callback }, { call, put }) {
      const response = yield call(addDisease, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *removeDisease({ payload, callback }, { call, put }) {
      const response = yield call(removeDisease, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *updateDisease({ payload, callback }, { call, put }) {
      const response = yield call(updateDisease, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    relate(relateState, action) {
      return {
        ...relateState,
        data2: action.payload,
      };
    },
  },
};
