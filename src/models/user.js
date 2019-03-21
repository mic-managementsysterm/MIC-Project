import { queryUser, changeInfo,changePwd } from '@/services/coustomApi/accountApi';
import {message} from "antd"

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    // basicLayout
    *fetchCurrent({payload}, { call, put }) {
      const avatar =require("../assets/image/admin.jpg");
      const tmpId = {Id:"70cfa728-626d-492c-ba9b-8e20e9fa051a"};
      const response = yield call(queryUser,tmpId);
      response.Data.avatar = avatar;
      yield put({
        type: 'saveCurrentUser',
        payload: response.Data,
      });
    },
    *changeBaseInfo({payload, callback}, { call, put }) {
      const response = yield call(changeInfo,payload);
      if(response.Success){
        message.success("修改信息成功");
        yield put({
          type: 'fetchCurrent',
          payload: response,
        });
        if(callback) callback();
      } else {
        message.error(response.Message || response.InnerMessage);
      }

    },
    *changePassword({payload, callback}, { call }) {
      const response = yield call(changePwd,payload);
      if(response.Success){
        if(callback) callback();
      } else {
        message.error(response.Message || response.InnerMessage);
      }
    },
  },

  reducers: {
    // basicLayout
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    // models/global
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
