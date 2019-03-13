import { queryDisease, addDisease, removeDisease, updateDisease} from '@/services/diseaseApi';

export default {
  namespace: 'disease',

  state: {
    dataSource:[],
    relateData:[],
    restData:[],
    modalVisible: false,
    relateModalVisible: false,
    selectedRows: [],
    Disease : {
      Id: "",
      Name: "",
      PinYin:"",
      Prevalent:false,
    },
    formValues: {},
  },

  effects: {
    *queryDisease({ payload }, { call, put }) {
      const response = yield call(queryDisease, payload);
      yield put({
        type: 'set',
        payload: {
          dataSource:response.Data
        },
      });
    },
    *addDisease({ payload, callback }, { call }) {
      yield call(addDisease, payload);
      if (callback) callback();
    },
    *removeDisease({ payload, callback }, { call }) {
      yield call(removeDisease, payload);
      if (callback) callback();
    },
    *updateDisease({ payload, callback }, { call }) {
      yield call(updateDisease, payload);
      if (callback) callback();
    },
    *setStates({ payload, callback }, { put }) {
      yield put({
        type: 'set',
        payload: {
          ...payload
        },
      });
      if(callback) callback();
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
