import { getAllGauge, getPhy,changePhy, deletePhy } from '@/services/api';

export default {
  namespace: 'phy',
  state: {
    phys: [],
    phy:{
      Id:         null,
      Name:       null,
      Topics:     [
        {
          Id:         null,
          GaugeId:    null,
          GroupName:  null,
          GroupOrder: null,
          Title:      null,
          Order:      null,
          Type:       null,
          CreatedAt:       null
        }
      ],
      CreatedAt:  null,
    },
    Id:'',
    res:null,
    showLoading:true,
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
    *getPhy({ payload, callback }, { call, put }) {
      const response = yield call(getPhy, payload);
      yield put({
        type: 'show',
        payload: {
          phy: response.Data
        }
      });
      if (callback) callback(response.Data)
    },
    *changePhy({payload,callback},{call,put}){
      const response = yield call(changePhy,payload);
      if (callback) callback(response)
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
    change(state, payload) {
      return {
        ...state,
        status:payload.status,
      };
    },
  }
}
