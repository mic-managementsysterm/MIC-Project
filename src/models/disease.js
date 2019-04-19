import { queryDisease, addDisease, removeDisease, updateDisease,queryDisAndSyn,querySymType,addSymType,querySearchSymType,removeSymType} from '@/services/api';

export default {
  namespace: 'disease',

  state: {
    pagination:{
      pageSize:10,
      showQuickJumper:true,
      hideOnSinglePage:false,
      current:1,
      total:0,
    },
    dataSource:[],
    DSdata:[],
    typeData:[],
    DSNoData:[],
    selectedId:null,
    current:1,
    pageSize:10,
    total:0,
    searchKey:'',
    value:'',
    defaultValue:[],
    diseaseData:[],
    modalVisible: false,
    relateModalVisible: false,
    selectedRows: [],
    selectDiseaseRows:[],
    selectRelateRows:[],
    Disease : {
      Id: "",
      Name: "",
      PinYin:"",
      Prevalent:false,
    },
    Type:{
      Id	:"",
      TypeName:	"",
      ParentId:	"",
      ChildrenTypes:	[]
    },
    formValues: {},
  },

  effects: {
    *querySymType({ payload,callback }, { call, put }) {
      const response = yield call(querySymType, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            typeData:response.Data,
            current:response.Data.pageindex,
            pageSize:response.Data.pagesize,
            total:response.Data.total,
            searchKey:payload.key
          },
        });
        if (callback) callback();
      }
    },
    *querySearchSymType({ payload,callback }, { call, put }) {
      const response = yield call(querySearchSymType, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            typeData:response.Data.rows,
            current:response.Data.pageindex,
            pageSize:response.Data.pagesize,
            total:response.Data.total,
            searchKey:payload.key
          },
        });
        if (callback) callback();
      }
    },
    *queryDisAndSyn({ payload,callback }, { call, put }) {
      const response = yield call(queryDisAndSyn, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            DSdata:response.Data.rows,
            current:response.Data.pageindex,
            pageSize:response.Data.pagesize,
            total:response.Data.total,
            searchKey:payload.key
          },
        });
        if (callback) callback();
      }
    },
    *queryDisease({ payload,callback }, { call, put }) {
      const response = yield call(queryDisease, payload);
      if(response.Success){
        yield put({
          type: 'set',
          payload: {
            dataSource:response.Data.rows,
            current:response.Data.pageindex,
            pageSize:response.Data.pagesize,
            total:response.Data.total,
            searchKey:payload.key
          },
        });
        if (callback) callback();
      }
    },
    *addDisease({ payload, callback }, { call }) {
      yield call(addDisease, payload);
      if (callback) callback();
    },
    *removeDisease({ payload, callback }, { call }) {
      yield call(removeDisease, payload);
      if (callback) callback();
    },
    *removeSymType({ payload, callback }, { call }) {
      yield call(removeSymType, payload);
      if (callback) callback();
    },
    *updateDisease({ payload, callback }, { call }) {
      yield call(updateDisease, payload);
      if (callback) callback();
    },

    *addSymType({ payload, callback }, { call }) {
      yield call(addSymType, payload);
      if (callback) callback();
    },

    *setStates({ payload, callback }, { put }) {
      yield put({
        type: 'set',
        payload: {
          ...payload
        },
      });
      if(callback) callback();
    },
  },

  reducers: {
    set(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
