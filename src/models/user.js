import { queryUser, changeInfo,changePwd } from '@/services/api';
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
      const response = yield call(queryUser,payload);
      if(response.Success){
        response.Data.avatar = avatar;
        yield put({
          type: 'saveCurrentUser',
          payload: response.Data,
        });
      }else {
        yield put({
          type: 'login/logout',
        });
      }
    },
    *changeBaseInfo({payload, callback}, { call, put }) {
      const response = yield call(changeInfo,payload);
      if(response.Success){
        message.success("修改信息成功");
        yield put({
          type: 'saveCurrentUser',
          payload: payload,
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
      localStorage.setItem("userId",action.payload.Id);
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
