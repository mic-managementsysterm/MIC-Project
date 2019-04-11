import React from 'react';
import {Spin, Button, Input, Select, Icon,InputNumber,Tabs ,Row,message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import router from 'umi/router';
import { connect } from 'dva';
const { TabPane }=Tabs;



@connect(({question,loading})=>({
  question,
  loading:loading.models.loading
}))
class questionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.handleAddArea = this.handleAddArea.bind(this);

    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleShiftQuestion = this.handleShiftQuestion.bind(this);
    this.handleCopyQuestion = this.handleCopyQuestion.bind(this);
    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);

    this.changeTab = this.changeTab.bind(this);
    this.tabNameChange = this.tabNameChange.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    this.addTab = this.addTab.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.handleSaveQuestionnaire = this.handleSaveQuestionnaire.bind(this);
    this.state = {
      titleEditable:false,
      addAreaVisible:false,
      defaultGroupName:null,
      fileList:[],
      indexCurrent:null,
      loading1:false,
      loading2:false,
      showLoading:false,
      record:{
        Id:         null,
        Name:       '这里是标题',
        Topics:     [
          {
            Title :          null,
            Order:           null,
            GroupName:       null,
            GroupOrder:       null,
            Type:            0,
          }
        ],
      },
      tabObj:{
        "group1":[{
          Title :          null,
          Order:           null,
          GroupName:       null,
          GroupOrder:       null,
          Type:            1,
        }]
      },
      tabNameArr:["group1"],
      currentTab:"group1",
      currentTabNewName:"",
    };
  }
  componentWillMount(){
    const Id=this.props.location.state.Id;
    Id && this.getQuestion(Id)
  }

  getQuestion=(Id)=>{
    const {dispatch}=this.props
    dispatch({
      type:'question/getQuestion',
      payload:{
        Id
      },
      callback:(res)=>{
        let tabObj ={};
        let tabNameArr = [];
        res.Topics.map(q => {
          if(tabObj[q.GroupName]){
            tabObj[q.GroupName].push(q)
          }else {
            tabObj[q.GroupName]=[q,];
            tabNameArr.push(q.GroupName)
          }
        });
        this.setState({
          record:res,
          tabObj,
          tabNameArr,
          currentTab:tabNameArr[0]
        })
      }
    })
  };

  /// 问卷标题
  getTitle() {
    return (
      this.state.titleEditable ? (
        <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 3, textAlign: 'center' }} onClick={this.handleTitleClick}>
          <Input style={{ fontSize: 18, fontWeight: 'bold', padding: 30, textAlign: 'center' }} value={this.state.record.Name} onChange={this.handleTitleChange} onBlur={this.handleTitleBlur} />
        </div>
      ) : (
        <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 20, textAlign: 'center' }} onClick={this.handleTitleClick}>
          <h2><strong>{this.state.record.Name}</strong></h2>
        </div>
      )
    );
  }

  handleTitleClick() {
    this.setState({
      titleEditable: true
    })
  }

  handleTitleChange(e) {
    let newRecord = {
      ...this.state.record,
      Name:e.target.value
    };
    this.setState({
      record:newRecord
    })
  }

  handleTitleBlur() {
    this.setState({
      titleEditable: false
    })
  }

  handleAddArea() {
    this.setState({
      addAreaVisible: !this.state.addAreaVisible
    })
  }
  /// 问卷标题


  /// 问卷内容
  handleAddTopic() {
    const newTopic = {
      Title :          null,
      Order:           null,
      GroupName:       null,
      GroupOrder:       null,
      Type:            1,
    };
    let {tabObj,currentTab} = this.state;
    tabObj[currentTab].push({...newTopic});
    this.setState( {
      addAreaVisible: false,
      tabObj
    });
  }

  handleQuestionChange(e, questionIndex) {
    let { tabObj,currentTab } = this.state;
    tabObj[currentTab][questionIndex].Title = e.target.value;
    this.setState({
      tabObj
    });
  }

  handleShiftQuestion(questionIndex, num) {
    let { tabObj,currentTab } = this.state;
    let shiftQuestion = tabObj[currentTab].splice(questionIndex, 1)[0];
    tabObj[currentTab].splice(questionIndex + num, 0, shiftQuestion);
    this.setState({
      tabObj
    })
  }

  handleCopyQuestion(questionIndex) {
    let { tabObj,currentTab } = this.state;
    let copy = Object.assign({}, tabObj[currentTab][questionIndex]);
    tabObj[currentTab].splice(questionIndex + 1, 0, copy);
    this.setState({
      tabObj
    });
  }

  handleRemoveQuestion(questionIndex) {
    let { tabObj,currentTab } = this.state;
    tabObj[currentTab].splice(questionIndex, 1);
    this.setState({
      tabObj
    });
  }
  /// 问卷内容


  handleSaveQuestionnaire() {
    let {record,tabObj,tabNameArr} = this.state;
    let upload ={};
    let Topics = [];
    upload.Name = record.Name;
    tabNameArr.map((tabName,tabIndex) => {
      tabObj[tabName].map((topic,topicIndex) => {
        Topics.push({
          Title:topic.Title,
          Order:topicIndex + 1,
          GroupName:tabName,
          GroupOrder:tabIndex + 1,
          Type:topic.Type,
        })
      })
    });
    console.log("uploadProps",upload)
  }


  /// 绘制部分
  getAddArea() {
    return (
      this.state.addAreaVisible ? (
        <div style={{ padding: 30, textAlign: 'center', border: '1px solid #eee' }}>
          <Button icon="check-circle-o" size="large" onClick={this.handleAddTopic}>添加问题</Button>
        </div>
      ) : ''
    );
  }

  getQuestions(questions) {

    return questions.map((question, questionIndex) => {
      const handleChange = (value) => {
        questions[questionIndex].Type = value - 0
      };
      return (
        <div style={{ padding: 30 }} key={questionIndex}>
          <div>
            <span>项目内容</span>
            <Input value={question.Title} style={{ borderStyle: 'none', width: '50%', marginLeft: 3 }} onChange={(e) => this.handleQuestionChange(e, questionIndex)} />
          </div>
          <span>项目类型</span>
          <Select
            style={{ width: 200 }}
            defaultValue={question.Type || 1}
            onChange={handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
          </Select>
          {this.getQuestionOperator(questionIndex,question)}
        </div>
      );
    })
  }

  getQuestionOperator(questionIndex, array) {
    return (
      <div>
        <p style={{ float: 'right' }}>
          {questionIndex === 0 ? (
            null
          ) : (
            <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleShiftQuestion(questionIndex, -1)}>上移</span>
          )}
          {questionIndex === array.length - 1 ? (
            null
          ) : (
            <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleShiftQuestion(questionIndex, 1)}>下移</span>
          )}
          <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleCopyQuestion(questionIndex)}>复用</span>
          <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleRemoveQuestion(questionIndex)}>删除</span>
        </p>
      </div>
    );
  }

  getFooter() {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ float: 'right' }}>
          <Button onClick={()=>this.handleSaveQuestionnaire()}>保存问卷</Button>
        </div>
      </div>
    );
  }
  /// 绘制部分

  /// tab部分
  changeTab(tabName){
    this.setState({
      currentTab:tabName
    })
  };

  tabNameChange(){
    let {currentTabNewName,tabObj,tabNameArr,currentTab} = this.state;
    if(currentTabNewName === ""){
      message.warning("请输入组名！");
      return
    }
    if(tabNameArr.indexOf(currentTabNewName) !== -1){
      message.warning("已存此名字的组！");
      return
    }
    let tmpTopics =[];
    let tmpTabNameArr = [];
    tabObj[currentTab].map(topic => {
      tmpTopics.push({...topic})
    });
    let tmpTabObj = {};

    tabNameArr.map(tabName => {
      if(tabName!== currentTab){
        tmpTabObj[tabName] = tabObj[tabName];
        tmpTabNameArr.push(tabName)
      }else {
        tmpTabObj[currentTabNewName] = tmpTopics;
        tmpTabNameArr.push(currentTabNewName);
      }
    });

    this.setState({
      tabObj:tmpTabObj,
      tabNameArr:tmpTabNameArr,
      currentTab:currentTabNewName,
      currentTabNewName:"",
    })
  };

  deleteTab(){
    let {tabObj,tabNameArr,currentTab} = this.state;
    if(tabNameArr.length === 1){
      message.warning("至少保留一个组！");
      return
    }
    let tmpTabNameArr = [];
    let tmpTabObj = {};
    let tmpCurrentIndex = 0;

    tabNameArr.map((tabName,index) => {
      if(tabName!== currentTab){
        tmpTabObj[tabName] = tabObj[tabName];
        tmpTabNameArr.push(tabName)
      }else {
        tmpCurrentIndex = index
      }
    });
    tmpCurrentIndex >= tmpTabNameArr.length && (tmpCurrentIndex -= 1);

    this.setState({
      tabObj:tmpTabObj,
      tabNameArr:tmpTabNameArr,
      currentTab:tmpTabNameArr[tmpCurrentIndex],
      currentTabNewName:"",
    })
  };

  addTab() {
    let {currentTabNewName,tabObj,tabNameArr} = this.state;
    if(currentTabNewName === ""){
      message.warning("请输入组名！");
      return
    }
    if(tabNameArr.indexOf(currentTabNewName) !== -1){
      message.warning("已存此名字的组！");
      return
    }
    tabObj[currentTabNewName] = [{
      Title :          null,
      Order:           null,
      GroupName:       null,
      GroupOrder:       null,
      Type:            1,
    }];
    tabNameArr.push(currentTabNewName);

    this.setState({
      addAreaVisible: false,
      tabObj,
      tabNameArr,
      currentTab:currentTabNewName
    });
  }

  renderTabs =() =>{
    const {tabObj,tabNameArr,currentTab} =this.state;
    let tabComponents= [];
    tabNameArr.map(tabName =>{
      tabComponents.push(
        <TabPane tab={tabName} key={tabName} >
          {this.getQuestions(tabObj[tabName])}
        </TabPane>
      )
    });
    return(
      <Tabs onChange={this.changeTab} activeKey={currentTab}>
        {tabComponents}
      </Tabs>
    )
  };
  /// tab部分

  render() {
    return (
      <Spin spinning={this.state.showLoading} tip={'正在保存'}>
        <div>
          {this.getTitle()}
          <div>
            <Input onChange={e => this.state.currentTabNewName = e.target.value} />
            <Button onClick={() => this.tabNameChange()}>更改组名</Button>
            <Button onClick={() => this.deleteTab()}>删除此组</Button>
            <Button onClick={() => this.addTab()}>新增组类</Button>
          </div>
          <div style={{ padding: 20, borderTop: '2px solid #ccc', borderBottom: '2px solid #ccc' }}>
            <div style={{ marginBottom: 20 }}>
              {this.renderTabs()}
            </div>
            {this.getAddArea()}
            <div className="addQuestion" style={{ wdith: '100%', height: '100%', padding: 30, background: '#eee', textAlign: 'center'}} onClick={this.handleAddArea}>
              添加问题
            </div>
          </div>
          {this.getFooter()}
        </div>
      </Spin>
    );
  }
}

export default questionAdd;
