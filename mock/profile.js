import mockjs from 'mockjs';

const basicGoods = [
  {
    id: '1234561',
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: '联系客户',
    status: 'processing',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: '取货员出发',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '1h',
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: '取货员接单',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: '申请审批通过',
    status: 'success',
    operator: '系统',
    cost: '1h',
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: '发起退货申请',
    status: 'success',
    operator: '用户',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

const addRecord = [
  {
    id: '123456',
    name: '四诊数据采集',
  },{
    id: '123456',
    name: '生理数据采集',
  },{
    id: '123456',
    name: '量表填写',
  },
];

const { Random } = mockjs;

export default {
  'GET /api/profile/advanced': getProfileAdvancedData,
  'GET /api/profile/basic': (req, res) => {
    const { id } = req.query;
    const diagnosisData = {
      Id: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a',
      RespondentId: 'fb2413f6-7cea-ea8e-82b3-17b6a9327b68',
      ZS: 'aa',
      XBS: 'cc',
      JWS: 'xx',
      GMS: 'aa',
      TGJC: 'sa',
      Diagnoses: [
        {
          Id: '09da15f8-903f-472a-93b4-d91c967871f9',
          RecordId: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a',
          DiagnoseId: '6dff6e7c-9eca-11e8-aeb3-00155dd71001',
          ParentId: '',
          DiagnoseName: '痹症',
          Order: 1,
          Type: 1,
        },
        {
          Id: '79ed6aa0-322c-4ad3-ab43-b88502fe7444',
          RecordId: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a',
          DiagnoseId: '6dfea797-9eca-11e8-aeb3-00155dd71001',
          ParentId: '',
          DiagnoseName: '腰痛病',
          Order: 0,
          Type: 1,
        },
        {
          Id: 'c447c153-2136-4de2-98ca-7d258f1fac35',
          RecordId: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a',
          DiagnoseId: 'f0d3d31d-9ecb-11e8-aeb3-00155dd71001',
          ParentId: '09da15f8-903f-472a-93b4-d91c967871f9',
          DiagnoseName: '温热壅滞证',
          Order: 0,
          Type: 2,
        },
      ],
      Symptoms: [
        {
          Id: '2f2dacc3-4069-4996-bb12-8e2d64850aab',
          RecordId: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a',
          Order: 0,
          SymptomName: '踢腿等运动性抽动',
          SymptomId: '6ff0d278-9ecb-11e8-aeb3-00155dd71001',
          SymptomLevel: 1,
        },
        {
          Id: '63927849-12c4-4005-88a7-293fbcf38228',
          RecordId: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a',
          Order: 1,
          SymptomName: '或月经失调',
          SymptomId: '6ff0d843-9ecb-11e8-aeb3-00155dd71001',
          SymptomLevel: 1,
        },
      ],
      MedicalImgs: [],
      Diagnose: '',
      CreatedAt: '2019-01-05 17:40:32',
    };
    const cognitionData = {
      Id: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
      RespondentId: 'fb2413f6-7cea-ea8e-82b3-17b6a9327b68',
      QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
      QuestionnaireName: '认知筛查量表',
      TotalScore: 13,
      PassScore: 12,
      Score: 13,
      Infos: [
        {
          Id: '0235ecf5-7623-4660-9a84-8380cd9959cc',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: '3dc9b1b9-653b-4d93-a07f-8223092ff72b',
          TopicInfo: {
            Id: '3dc9b1b9-653b-4d93-a07f-8223092ff72b',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '记忆力(是/否)',
            Image: '',
            Order: 1,
            GroupName: '主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）',
            TotalScore: 1,
            Type: 0,
          },
          Score: 1,
          Order: 1,
          Images: [],
        },
        {
          Id: '6579fa33-a098-4dcd-a575-6b49f11a1585',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: 'bf381da0-7cd5-4bf6-9a07-6eaae90a4db9',
          TopicInfo: {
            Id: 'bf381da0-7cd5-4bf6-9a07-6eaae90a4db9',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '语言 / 找词困难',
            Image: '',
            Order: 2,
            GroupName: '主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）',
            TotalScore: 1,
            Type: 0,
          },
          Score: 1,
          Order: 2,
          Images: [
            {
              Id: 'bd4a0ab2-9488-44cf-a2c6-a0ffbb7773e5',
              InfoId: '6579fa33-a098-4dcd-a575-6b49f11a1585',
              RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
              Url: '/assets/images/upload/2019-01-05/1972acf8-a2ae-4ce1-ae5f-c019f1439ecd.jpg',
            },
          ],
        },
        {
          Id: '98001842-7d2b-4ef1-b41d-605c339dc487',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: '40d7d9d8-1302-4b77-86fb-2ff5afccc9f8',
          TopicInfo: {
            Id: '40d7d9d8-1302-4b77-86fb-2ff5afccc9f8',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '组织能力 / 计划能力',
            Image: '',
            Order: 3,
            GroupName: '主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）',
            TotalScore: 1,
            Type: 0,
          },
          Score: 1,
          Order: 3,
          Images: [],
        },
        {
          Id: '41bf2d98-a82c-4b25-aa3e-fa266f21b5f5',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: '9ec568f2-9a57-4ba5-a36b-9f234858f5fe',
          TopicInfo: {
            Id: '9ec568f2-9a57-4ba5-a36b-9f234858f5fe',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '注意力 / 专心',
            Image: '',
            Order: 4,
            GroupName: '主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）',
            TotalScore: 1,
            Type: 0,
          },
          Score: 1,
          Order: 4,
          Images: [],
        },
        {
          Id: '0559d65e-a2b5-48ba-922f-6194499f0461',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: '1d4252b0-9555-454c-b459-abe9eb495892',
          TopicInfo: {
            Id: '1d4252b0-9555-454c-b459-abe9eb495892',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '其他认知功能方面',
            Image: '',
            Order: 5,
            GroupName: '主观认知下降.你觉得以下方面哪方面有问题？（受访者需要即刻回答）',
            TotalScore: 1,
            Type: 0,
          },
          Score: 1,
          Order: 5,
          Images: [],
        },
        {
          Id: '676b4bfc-3b08-4554-8bc8-7ebc68bda2b2',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: 'ec68d923-ab7b-4548-9b71-f3549204e2b1',
          TopicInfo: {
            Id: 'ec68d923-ab7b-4548-9b71-f3549204e2b1',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '请记住五个词语:教堂.红色.气球.荷花.鼠标（嘱患者复述一遍，不计分）',
            Image: '',
            Order: 6,
            GroupName: '记忆力',
            TotalScore: 0,
            Type: 0,
          },
          Score: 0,
          Order: 6,
          Images: [],
        },
        {
          Id: '73c0fe04-5593-4d1b-9d80-da3af0da706b',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: '8e7b06d3-0919-4cbc-8599-872ff315af8e',
          TopicInfo: {
            Id: '8e7b06d3-0919-4cbc-8599-872ff315af8e',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '画钟试验：请受试者画个钟表:说明：钟表轮廓1分，数字1分，指针1分）',
            Image: '',
            Order: 7,
            GroupName: '执行能力及空间思维能力',
            TotalScore: 3,
            Type: 1,
          },
          Score: 3,
          Order: 7,
          Images: [],
        },
        {
          Id: '0e0499e0-1c8a-4024-bca5-73f330a1da1c',
          RecordId: '0c7523d0-d157-4918-9ba6-ecfa7bed8527',
          TopicId: '0a7c71b8-02f2-49c2-a687-f206a7b4719f',
          TopicInfo: {
            Id: '0a7c71b8-02f2-49c2-a687-f206a7b4719f',
            QuestionnaireId: '16c7071b-ec13-4788-bfce-123774b8e347',
            Title: '请重复刚才的五个词语:每个词1分。',
            Image: '',
            Order: 8,
            GroupName: '记忆力',
            TotalScore: 5,
            Type: 1,
          },
          Score: 5,
          Order: 8,
          Images: [],
        },
      ],
      Images: [],
    };
    const mmseData = {
        Id: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
        RespondentId: "fb2413f6-7cea-ea8e-82b3-17b6a9327b68",
        QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
        QuestionnaireName: "MMSE评分量表",
        TotalScore: 13,
        PassScore: 12,
        Score: 13,
        Infos: [
          {
            Id: "0235ecf5-7623-4660-9a84-8380cd9959cc",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "3dc9b1b9-653b-4d93-a07f-8223092ff72b",
            TopicInfo: {
              Id: "3dc9b1b9-653b-4d93-a07f-8223092ff72b",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "星期几",
              Image: "",
              Order: 1,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 1,
            Images: []
          },
          {
            Id: "6579fa33-a098-4dcd-a575-6b49f11a1585",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "bf381da0-7cd5-4bf6-9a07-6eaae90a4db9",
            TopicInfo: {
              Id: "bf381da0-7cd5-4bf6-9a07-6eaae90a4db9",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "几号",
              Image: "",
              Order: 2,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 2,
            Images: [
              {
                Id: "bd4a0ab2-9488-44cf-a2c6-a0ffbb7773e5",
                InfoId: "6579fa33-a098-4dcd-a575-6b49f11a1585",
                RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
                Url: "/assets/images/upload/2019-01-05/1972acf8-a2ae-4ce1-ae5f-c019f1439ecd.jpg"
              }
            ]
          },
          {
            Id: "98001842-7d2b-4ef1-b41d-605c339dc487",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "40d7d9d8-1302-4b77-86fb-2ff5afccc9f8",
            TopicInfo: {
              Id: "40d7d9d8-1302-4b77-86fb-2ff5afccc9f8",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "几月",
              Image: "",
              Order: 3,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 3,
            Images: []
          },
          {
            Id: "41bf2d98-a82c-4b25-aa3e-fa266f21b5f5",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "9ec568f2-9a57-4ba5-a36b-9f234858f5fe",
            TopicInfo: {
              Id: "9ec568f2-9a57-4ba5-a36b-9f234858f5fe",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "什么季节",
              Image: "",
              Order: 4,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 4,
            Images: []
          },
          {
            Id: "0559d65e-a2b5-48ba-922f-6194499f0461",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "1d4252b0-9555-454c-b459-abe9eb495892",
            TopicInfo: {
              Id: "1d4252b0-9555-454c-b459-abe9eb495892",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "哪一年",
              Image: "",
              Order: 5,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 5,
            Images: []
          },
          {
            Id: "676b4bfc-3b08-4554-8bc8-7ebc68bda2b2",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "ec68d923-ab7b-4548-9b71-f3549204e2b1",
            TopicInfo: {
              Id: "ec68d923-ab7b-4548-9b71-f3549204e2b1",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "省市",
              Image: "",
              Order: 6,
              GroupName: "定向力",
              TotalScore: 0,
              Type: 0
            },
            Score: 0,
            Order: 6,
            Images: []
          },
          {
            Id: "73c0fe04-5593-4d1b-9d80-da3af0da706b",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "8e7b06d3-0919-4cbc-8599-872ff315af8e",
            TopicInfo: {
              Id: "8e7b06d3-0919-4cbc-8599-872ff315af8e",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "区县",
              Image: "",
              Order: 7,
              GroupName: "定向力",
              TotalScore: 3,
              Type: 1
            },
            Score: 3,
            Order: 7,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "街道或乡",
              Image: "",
              Order: 8,
              GroupName: "定向力",
              TotalScore: 5,
              Type: 1
            },
            Score: 5,
            Order: 8,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "什么地方",
              Image: "",
              Order: 9,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 1
            },
            Score: 5,
            Order: 9,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "第几层楼",
              Image: "",
              Order: 10,
              GroupName: "定向力",
              TotalScore: 1,
              Type: 1
            },
            Score: 5,
            Order: 10,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "皮球",
              Image: "",
              Order: 11,
              GroupName: "记忆力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 11,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "国旗",
              Image: "",
              Order: 12,
              GroupName: "记忆力",
              TotalScore: 1,
              Type: 1
            },
            Score: 1,
            Order: 12,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "树木",
              Image: "",
              Order: 13,
              GroupName: "记忆力",
              TotalScore: 3,
              Type: 1
            },
            Score: 5,
            Order: 13,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "100-7=93",
              Image: "",
              Order: 14,
              GroupName: "注意力和计算力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 14,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（93）-7=86",
              Image: "",
              Order: 15,
              GroupName: "注意力和计算力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 15,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（79）-7=72",
              Image: "",
              Order: 16,
              GroupName: "注意力和计算力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 16,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（93）-7=86",
              Image: "",
              Order: 17,
              GroupName: "注意力和计算力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 17,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（72）-7=65",
              Image: "",
              Order: 18,
              GroupName: "注意力和计算力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 18,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "皮球",
              Image: "",
              Order: 19,
              GroupName: "回忆能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 19,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "国旗",
              Image: "",
              Order: 20,
              GroupName: "回忆能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 20,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "树木",
              Image: "",
              Order: 21,
              GroupName: "回忆能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 21,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "命名能力",
              Image: "",
              Order: 22,
              GroupName: "语言能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 22,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "复述能力",
              Image: "",
              Order: 23,
              GroupName: "语言能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 23,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "三步命令",
              Image: "",
              Order: 24,
              GroupName: "语言能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 24,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "阅读能力",
              Image: "",
              Order: 25,
              GroupName: "语言能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 25,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "书写能力",
              Image: "",
              Order: 26,
              GroupName: "语言能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 26,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "结构能力",
              Image: "",
              Order: 27,
              GroupName: "语言能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 27,
            Images: []
          },
        ],
        Images: []
      };
    const mocaData = {
        Id: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
        RespondentId: "fb2413f6-7cea-ea8e-82b3-17b6a9327b68",
        QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
        QuestionnaireName: "MoCA评分量查表",
        TotalScore: 13,
        PassScore: 12,
        Score: 13,
        Infos: [
          {
            Id: "0235ecf5-7623-4660-9a84-8380cd9959cc",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "3dc9b1b9-653b-4d93-a07f-8223092ff72b",
            TopicInfo: {
              Id: "3dc9b1b9-653b-4d93-a07f-8223092ff72b",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "",
              Image: "",
              Order: 1,
              GroupName: "视空间与执行功能",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 1,
            Images: []
          },
          {
            Id: "6579fa33-a098-4dcd-a575-6b49f11a1585",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "bf381da0-7cd5-4bf6-9a07-6eaae90a4db9",
            TopicInfo: {
              Id: "bf381da0-7cd5-4bf6-9a07-6eaae90a4db9",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "",
              Image: "",
              Order: 2,
              GroupName: "视空间与执行功能",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 2,
            Images: [
              {
                Id: "bd4a0ab2-9488-44cf-a2c6-a0ffbb7773e5",
                InfoId: "6579fa33-a098-4dcd-a575-6b49f11a1585",
                RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
                Url: "/assets/images/upload/2019-01-05/1972acf8-a2ae-4ce1-ae5f-c019f1439ecd.jpg"
              }
            ]
          },
          {
            Id: "98001842-7d2b-4ef1-b41d-605c339dc487",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "40d7d9d8-1302-4b77-86fb-2ff5afccc9f8",
            TopicInfo: {
              Id: "40d7d9d8-1302-4b77-86fb-2ff5afccc9f8",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "画钟表（11点过10分）（3分）",
              Image: "",
              Order: 3,
              GroupName: "视空间与执行功能",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 3,
            Images: []
          },
          {
            Id: "41bf2d98-a82c-4b25-aa3e-fa266f21b5f5",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "9ec568f2-9a57-4ba5-a36b-9f234858f5fe",
            TopicInfo: {
              Id: "9ec568f2-9a57-4ba5-a36b-9f234858f5fe",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "",
              Image: "",
              Order: 4,
              GroupName: "命名",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 4,
            Images: []
          },
          {
            Id: "0559d65e-a2b5-48ba-922f-6194499f0461",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "1d4252b0-9555-454c-b459-abe9eb495892",
            TopicInfo: {
              Id: "1d4252b0-9555-454c-b459-abe9eb495892",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "",
              Image: "",
              Order: 5,
              GroupName: "命名",
              TotalScore: 1,
              Type: 0
            },
            Score: 1,
            Order: 5,
            Images: []
          },
          {
            Id: "676b4bfc-3b08-4554-8bc8-7ebc68bda2b2",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "ec68d923-ab7b-4548-9b71-f3549204e2b1",
            TopicInfo: {
              Id: "ec68d923-ab7b-4548-9b71-f3549204e2b1",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "",
              Image: "",
              Order: 6,
              GroupName: "命名",
              TotalScore: 0,
              Type: 0
            },
            Score: 0,
            Order: 6,
            Images: []
          },
          {
            Id: "73c0fe04-5593-4d1b-9d80-da3af0da706b",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "8e7b06d3-0919-4cbc-8599-872ff315af8e",
            TopicInfo: {
              Id: "8e7b06d3-0919-4cbc-8599-872ff315af8e",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（面孔、天鹅绒、教堂、菊花、红色）读出下列词语，然后由患者 重复上述过程2次，5分钟后回忆。（不计分）",
              Image: "",
              Order: 7,
              GroupName: "记忆",
              TotalScore: 3,
              Type: 1
            },
            Score: 3,
            Order: 7,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（21854顺背 742倒背）读出下列数字，请患者重复（每秒1个）。21854顺背 742倒背",
              Image: "",
              Order: 8,
              GroupName: "注意",
              TotalScore: 5,
              Type: 1
            },
            Score: 5,
            Order: 8,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（52139411806215194511141905112）读出下列数字，每当数字出现1时，患者敲一下桌面，错误数大于或等于2不给分。",
              Image: "",
              Order: 9,
              GroupName: "注意",
              TotalScore: 1,
              Type: 1
            },
            Score: 5,
            Order: 9,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "100连续减7，答案93-86-79-72-65.4~5个正确给3分，2~3个正确给1分，全部错误为0分。",
              Image: "",
              Order: 10,
              GroupName: "注意",
              TotalScore: 1,
              Type: 1
            },
            Score: 5,
            Order: 10,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "重复：我只知道今天张亮是来帮过忙的人。狗在房间的时候，猫总是躲在沙发下面",
              Image: "",
              Order: 11,
              GroupName: "语言",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 11,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "流畅性：在1分钟内尽可能多地说出动物的名字。大于等于11个名称",
              Image: "",
              Order: 12,
              GroupName: "语言",
              TotalScore: 1,
              Type: 1
            },
            Score: 1,
            Order: 12,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "词语相似性：香蕉-桔子=水果 [ ]火车-自行车[ ]手表-尺子",
              Image: "",
              Order: 13,
              GroupName: "抽象",
              TotalScore: 3,
              Type: 1
            },
            Score: 5,
            Order: 13,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "回忆时不能提醒（面孔、天鹅绒、教堂、菊花、红色）",
              Image: "",
              Order: 14,
              GroupName: "延迟回忆",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 14,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "日期几？",
              Image: "",
              Order: 15,
              GroupName: "定向",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 15,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "几月份？",
              Image: "",
              Order: 16,
              GroupName: "定向",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 16,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "年代？",
              Image: "",
              Order: 17,
              GroupName: "定向",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 17,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "（72）-7=65",
              Image: "",
              Order: 18,
              GroupName: "星期几？",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 18,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "地点",
              Image: "",
              Order: 19,
              GroupName: "定向",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 19,
            Images: []
          },
          {
            Id: "0e0499e0-1c8a-4024-bca5-73f330a1da1c",
            RecordId: "0c7523d0-d157-4918-9ba6-ecfa7bed8527",
            TopicId: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
            TopicInfo: {
              Id: "0a7c71b8-02f2-49c2-a687-f206a7b4719f",
              QuestionnaireId: "16c7071b-ec13-4788-bfce-123774b8e347",
              Title: "城市",
              Image: "",
              Order: 20,
              GroupName: "回忆能力",
              TotalScore: 5,
              Type: 1
            },
            Score: 1,
            Order: 20,
            Images: []
          }
        ],
        Images: []
      };
    const data={
        Data: {
          GaugeRecord: {
            Id: "3001",
            GaugeId: "1001",
            GaugeName: "测试量表1"
          },
          RecordInfos: [
            {
              InfoId: "4001",
              RecordId: "3001",
              TopicId: "2001",
              GroupTime: "2019-02-22",
              ItemValue: "10",
              ItemResult: "异常",
              ExceptionType: 1,
              GaugeId: "1001",
              GroupName: "组1",
              GroupOrder: 1,
              Title: "项目1",
              Order: 1,
              Type: 1
            },
            {
              InfoId: "4003",
              RecordId: "3001",
              TopicId: "2003",
              GroupTime: "2019-02-22",
              ItemValue: "2",
              ItemResult: "异常",
              ExceptionType: 2,
              GaugeId: "1001",
              GroupName: "组1",
              GroupOrder: 1,
              Title: "项目2",
              Order: 2,
              Type: 2
            },
            {
              InfoId: "4002",
              RecordId: "3001",
              TopicId: "2002",
              GroupTime: "2019-02-22",
              ItemValue: "1",
              ItemResult: "正常",
              ExceptionType: 0,
              GaugeId: "1001",
              GroupName: "组2",
              GroupOrder: 2,
              Title: "项目1",
              Order: 1,
              Type: 1
            }
            ]
        },
        Message: "",
        InnerMessage: "",
        Success: true
      };
    const userInfo = {
      name: Random.cname(),
      tel: '18100000000',
      delivery: '菜鸟物流',
      addr: '浙江省杭州市西湖区万塘路18号',
      remark: '备注',
    };
    res.json({
      userInfo,
      diagnosisData,
      cognitionData,
      basicGoods,
      basicProgress,
      mmseData,
      mocaData,
      data
    });
  },
  'GET /api/questionnaire/get/getAll': addRecord,
};
