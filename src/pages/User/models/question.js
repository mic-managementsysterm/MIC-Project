import {getAllQuestionnaire,getQuestion} from '@//services/api'

export default {
  namespace:'question',
  state:{
    questions:[],
    question:{}
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
      }),
        console.log('@response11', response)
      if (callback) callback()
    }
  },
  reducers: {
    show(state, action) {
      console.log('@1111')
      return {
        ...state,
        ...action.payload,
      };
    },
  },
}
