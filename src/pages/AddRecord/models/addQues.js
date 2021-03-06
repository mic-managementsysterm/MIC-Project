import { queryQues, addOrUpdateQues } from '@/services/api';

export default {
  namespace: 'addQues',

  state: {
    newQues:{
      RespondentId:"",
      QuestionnaireId:"",
      QuestionnaireName:"",
      TotalScore:0,
      PassScore:0,
      Score:0,
      Infos:[],
      Images:[],
    },
    Topics:[

    ]
  },

  effects: {
    *getQues({ payload }, { call, put }) {
      const response = yield call(queryQues, payload);
      yield put({
        type: 'setNewQues',
        payload: response.Data,
      });
    },
    *uploadQues({ payload,callback }, { call, }) {
      const response = yield call(addOrUpdateQues, payload);
      if(callback) callback(response)
    },
  },
  reducers: {
    setNewQues(state, { payload }) {
      let newObj ={};
      let newTopics =[];
      newObj.QuestionnaireId = payload.Id;
      newObj.QuestionnaireName = payload.Name;
      newObj.TotalScore = payload.TotalScore;
      newObj.PassScore = payload.PassScore;
      newObj.Infos = [];
      if(Array.isArray( payload.Topics)) {
        payload.Topics.map(item => {
          newObj.Infos.push({
            TopicId: item.Id,
            Order: item.Order,
            Score: 0,
            Images: []
          });
          newTopics.push({
            ...item,
            insertImgs:[]
          })
        });
      }

      return {
        ...state,
        newQues:{...state.newQues,...newObj},
        Topics:newTopics,
      };
    },
    setStates(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setInfos(state, { payload }) {
      let newInfos = state.newQues.Infos.slice();
      let newTopics = state.Topics.slice();
      if(payload.type === "Score"){
        newInfos[payload.index].Score = payload.value;
      }else {
        // newInfos[payload.index].Images = [];
        newInfos[payload.index].Images.push(payload.value);
        newTopics[payload.index].insertImgs.push(payload.value);
      }

      return {
        ...state,
        newQues:{...state.newQues,Infos:newInfos},
        Topics:newTopics
      };
    },
    delImage(state, { payload }) {
      let newInfos = state.newQues.Infos.slice();
      let newTopics = state.Topics.slice();
      state.newQues.Infos[payload.index].Images.map( (image,index) => {
        if(image.Url === payload.value){
          newInfos[payload.index].Images.splice(index,1)
        }
      })
      state.Topics[payload.index].insertImgs.map( (image,index) => {
        if(image.Url === payload.value){
          newTopics[payload.index].insertImgs.splice(index,1)
        }
      })

      return {
        ...state,
        newQues:{...state.newQues,Infos:newInfos},
        Topics:newTopics
      };
    }
  },
};
