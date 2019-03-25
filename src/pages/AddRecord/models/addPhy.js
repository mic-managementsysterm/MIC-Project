import { queryPhy, addOrUpdatePhy } from '@/services/api';

export default {
  namespace: 'addPhy',

  state: {
    newPhy:{
      RespondentId:"",
      GaugeId:"",
      GaugeName:"",
      Infos:[],
    },
    Topics:[]
  },

  effects: {
    *getPhy({ payload }, { call, put }) {
      const response = yield call(queryPhy, payload);
      yield put({
        type: 'setNewPhy',
        payload: response.Data,
      });
    },
    *uploadPhy({ payload }, { call, }) {
      yield call(addOrUpdatePhy, payload)
    },
  },

  reducers: {
    setNewPhy(state, { payload }) {
      let newObj ={};
      newObj.GaugeId = payload.Id;
      newObj.GaugeName = payload.Name;
      newObj.Infos = [];
      if(Array.isArray( payload.Topics)) {
        payload.Topics.map(item => {
          newObj.Infos.push({
            TopicId: item.Id,
            GroupName:item.GroupName,
            ItemChecked:item.ItemChecked,
            ItemValue:item.ItemValue,
            ExceptionType:item.Exception,
          });
        });
      }

      return {
        ...state,
        newPhy:{...state.newPhy,...newObj},
        Topics:payload.Topics,
      };
    },
    setStates(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        ...payload,
      };
    },
    setInfos(state, { payload }) {
      let newInfos = state.newPhy.Infos.slice();
      newInfos[payload.index][payload.type] = payload.value;

      return {
        ...state,
        newPhy:{...state.newPhy,Infos:newInfos},
      };
    }
  },
};
