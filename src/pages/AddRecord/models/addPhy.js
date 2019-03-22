import { queryPhy, addOrUpdatePhy } from '@/services/coustomApi/phyApi';

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
            GroupTime:"",
            ItemChecked:false,
            ItemValue:"",
            ExceptionType:0,
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
      return {
        ...state,
        ...payload,
      };
    },
    setInfos(state, { payload }) {
      let newInfos = state.newPhy.Infos.slice();
      if(payload.type === "GroupTime"){
        newInfos.map(item => {
          if(item.GroupName === payload.GroupName){
            item.GroupTime = payload.value;
          }
        })
      }else {
        newInfos[payload.index][payload.type] = payload.value;
      }

      return {
        ...state,
        newPhy:{...state.newPhy,Infos:newInfos},
      };
    }
  },
};
