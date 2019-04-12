import {getAllQuestionnaire,getQuestion,changeQuestion,deleteQuestion} from '@/services/api'

export default {
  namespace:'question',
  state:{
    questions:[],
    // question:{},
    res:null,
    showLoading:true,
    question:{
      Id:         null,
      Name:       null,
      TotalScore: null,
      PassScore:  null,
      Topics:     [
        {
            Id:              null,
            QuestionnaireId: null,
            Title:           null,
            Image :          null,
            Order:           null,
            GroupName:       null,
            TotalScore:      null,
            Type:            null,
            CreatedAt:       null /* 2018-07-23 10:04:30 */
        }
      ],
      CreatedAt:  null,
    },
    Id:''
  },
  effects: {
    * fetchQuestionList({ payload }, { call, put }) {
      const response = yield call(getAllQuestionnaire, payload);
      yield put({
        type: 'show',
        payload: {
          questions: response.Data
        }
      })
    },
    * getQuestion({ payload, callback }, { call, put }) {
      const response = yield call(getQuestion, payload);
      yield put({
        type: 'show',
        payload: {
          question: response.Data
        }
      });
      if (callback) callback()
    },

    *changeQuestion({payload,callback},{call,put}){
      const response= yield call(changeQuestion,payload);
      yield put({
        type:'show',
        payload:{
          res:response
        }
      })
      if (callback) callback()
    },
    *deleteQuestions({payload,callback},{call,put}){
        yield call(deleteQuestion,payload)
      if (callback) callback()
    }
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
  },
}
