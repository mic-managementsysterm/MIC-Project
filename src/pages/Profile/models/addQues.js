import { queryQues, addOrUpdateQues } from '@/services/coustomApi/addQuesApi';

export default {
  namespace: 'addQues',

  state: {
    newQues:{
      RespondentId:"fb2413f6-7cea-ea8e-82b3-17b6a9327b68",
      QuestionnaireId:"",
      QuestionnaireName:"",
      TotalScore:0,
      PassScore:0,
      Score:0,
      Infos:[],
      Images:[],
    },
    Topics:[
      {
        "Id": "3dc9b1b9-653b-4d93-a07f-8223092ff72b",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "记忆力",
        "Image": "",
        "Order": 1,
        "GroupName": "主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）",
        "TotalScore": 1,
        "Type": 0
      },
      {
        "Id": "bf381da0-7cd5-4bf6-9a07-6eaae90a4db9",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "语言 / 找词困难",
        "Image": "",
        "Order": 2,
        "GroupName": "主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）",
        "TotalScore": 1,
        "Type": 0
      },
      {
        "Id": "40d7d9d8-1302-4b77-86fb-2ff5afccc9f8",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "组织能力 / 计划能力",
        "Image": "",
        "Order": 3,
        "GroupName": "主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）",
        "TotalScore": 1,
        "Type": 0
      },
      {
        "Id": "9ec568f2-9a57-4ba5-a36b-9f234858f5fe",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "注意力 / 专心",
        "Image": "",
        "Order": 4,
        "GroupName": "主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）",
        "TotalScore": 1,
        "Type": 0
      },
      {
        "Id": "1d4252b0-9555-454c-b459-abe9eb495892",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "其他认知功能方面",
        "Image": "",
        "Order": 5,
        "GroupName": "主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）",
        "TotalScore": 1,
        "Type": 0
      },
      {
        "Id": "ec68d923-ab7b-4548-9b71-f3549204e2b1",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "请记住五个词语:教堂.红色.气球.荷花.鼠标（嘱患者复述一遍，不计分）",
        "Image": "",
        "Order": 6,
        "GroupName": "记忆力",
        "TotalScore": 0,
        "Type": 0
      },
      {
        "Id": "8e7b06d3-0919-4cbc-8599-872ff315af8e",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "画钟试验：请受试者画个钟表:说明：钟表轮廓1分，数字1分，指针1分）",
        "Image": "",
        "Order": 7,
        "GroupName": "执行能力及空间思维能力",
        "TotalScore": 3,
        "Type": 1
      },
      {
        "Id": "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
        "QuestionnaireId": "16c7071b-ec13-4788-bfce-123774b8e347",
        "Title": "请重复刚才的五个词语:每个词1分。",
        "Image": "",
        "Order": 8,
        "GroupName": "记忆力",
        "TotalScore": 5,
        "Type": 1
      }
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
    *uploadQues({ payload }, { call, }) {
      yield call(addOrUpdateQues, payload)
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
            insertImg:""
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
      if(payload.type === "Score"){
        newInfos[payload.index].Score = payload.value;
      }else {
        newInfos[payload.index].Images = [];
        newInfos[payload.index].Images.push(payload.value);
      }

      return {
        ...state,
        newQues:{...state.newQues,Infos:newInfos},
      };
    }
  },
};
