import {deleteQues,deleteGauge,deleteMedical,queryFakeList } from '@/services/api';

const format = (arr,) => {
  if(!Array.isArray(arr)){
    return []
  }
  let newArr = [];
  arr.map( item => {
    let title = "四诊记录表";
    let description = `创建时间：${item.CreatedAt}\n主诉：${item.ZS}`;
    let path = `/respondent/respondent-list/respondent-record/four-dagnostic`;
    let delAction = "list/delMedical";
    if(item.GaugeName){
      title = item.GaugeName;
      description = `创建时间：${item.CreatedAt}\n点击查看理化检查详情`;
      path = `/respondent/respondent-list/respondent-record/Physicochemical`;
      delAction = "list/delGauge";
    }
    if(item.QuestionnaireName){
      title = item.QuestionnaireName;
      description =`创建时间：${item.CreatedAt}\n总分：${item.TotalScore}\n及格分：${item.PassScore}\t得分：${item.Score}`;
      switch (item.QuestionnaireId){
        case "16c7071b-ec13-4788-bfce-123774b8e347":
          path = "/respondent/respondent-list/respondent-record/cognition";
          break;
        case "39c66d1e-cab6-412d-918b-5fb895e545d7":
          path = "/respondent/respondent-list/respondent-record/moca";
          break;
        case "87f5a6b4-ee86-4b2f-a984-1dc6edc77e9c":
          path = "/respondent/respondent-list/respondent-record/MMSE";
          break;
        default:
          path = "/exception/404"
      }
      delAction = "list/delQues";
    }
    newArr.push({
      title:title,
      description:description,
      path:path,
      delAction:delAction,
      ...item
    })
  });
  return newArr
};
export default {
  namespace: 'list',
  state: {
    list: [],
    records:[]
  },

  effects: {
    *getRecords({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'formatRecords',
        payload: response.Data,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *delMedical({ payload, callback }, { call }) {
      yield call(deleteMedical, payload);
      if(callback) callback();
    },
    *delGauge({ payload, callback }, { call }) {
      yield call(deleteGauge, payload);
      if(callback) callback();
    },
    *delQues({ payload, callback }, { call }) {
      yield call(deleteQues, payload);
      if(callback) callback();
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    formatRecords(state, action) {
      let {QuestionnaireRecords, MedicalRecords, GaugeRecords} = action.payload;
      let newRecords = [];
      newRecords.push(...format(QuestionnaireRecords),...format(MedicalRecords),...format(GaugeRecords));
      let compare = (a,b) => {
        let aTime = new Date(a.CreatedAt);
        let bTime = new Date(b.CreatedAt);
        let compareResult = aTime - bTime;
        if(compareResult>0){
          return -1
        }
        if(compareResult<0){
          return 1
        }
        return 0
      }
      newRecords = newRecords.sort(compare)
      return {
        ...state,
        records: newRecords,
      };
    },
  },
};

