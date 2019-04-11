import React from 'react';
import {Spin, Button, Input, Select, Tabs , message } from 'antd';
// import router from 'umi/router';
import { connect } from 'dva';

const { TabPane }=Tabs;
const { Option }=Select;

@connect(({phy,routerParams, loading})=>({
  phy,
  routerParams,
  loading:loading.models.loading
}))
class questionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.getTitle = this.getTitle.bind(this);

    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
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
        "检查项目类别":[{
          Title :          null,
          Order:           null,
          GroupName:       null,
          GroupOrder:       null,
          Type:            1,
        }]
      },
      tabNameArr:["检查项目类别"],
      currentTab:"检查项目类别",
      currentTabNewName:"",
    };
  }

  componentWillMount(){
    let Id = this.props.routerParams.phyId;
    if(Id){
      this.getQuestion(Id)
    }
  }

  getQuestion=(Id)=>{
    const {dispatch} = this.props
    dispatch({
      type:'phy/getPhy',
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

  getQuestions(questions) {
    return questions.map((question, questionIndex) => {
      return (
        <div style={{ padding: 20 }} key={questionIndex.toString()}>
          <div>
            <span>检查内容</span>
            <Input value={question.Title} style={{ borderStyle: 'none', width: '50%', marginLeft: 3 }} onChange={(e) => this.handleQuestionChange(e, questionIndex)} />
          </div>
          <div style={{ marginTop: 10}}>
            <span>检查结果类型</span>
            <Select
              style={{ width: 200 }}
              defaultValue={question.Type || 1}
              onChange={value => this.handleTypeChange(value,questionIndex)}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
            </Select>
          </div>
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
    let {record} = this.state;
    let newRecord = {
      ...record,
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

  handleTypeChange(value, questionIndex) {
    let { tabObj,currentTab } = this.state;
    tabObj[currentTab][questionIndex].Type = value - 0;
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

  handleSaveQuestionnaire() {
    let {record,tabObj,tabNameArr} = this.state;
    const { dispatch } = this.props;
    let upload ={};
    let Topics = [];
    upload.Name = record.Name;
    upload.Id = this.props.routerParams.phyId ? this.props.routerParams.phyId : null;
    tabNameArr.map((tabName,tabIndex) => {
      tabObj[tabName].map((topic,topicIndex) => {
        if(!topic.Title){
          message.warning(`${tabName}Q${topicIndex+1}没有输入标题`)
          return
        }
        Topics.push({
          Title:topic.Title,
          Order:topicIndex + 1,
          GroupName:tabName,
          GroupOrder:tabIndex + 1,
          Type:topic.Type,
        })
      })
    });
    upload.Topics = Topics;
    dispatch({
      type: 'phy/changePhy',
      payload: {body:upload},
    })
    console.log('@upload',upload)
  }

  // / tab部分
  changeTab(tabName){
    this.setState({
      currentTab:tabName
    })
  };

  tabNameChange(){
    let {currentTabNewName,tabObj,tabNameArr,currentTab} = this.state;
    if(currentTabNewName === ""){
      message.warning("请输入项目类别名称！");
      return
    }
    if(tabNameArr.indexOf(currentTabNewName) !== -1){
      message.warning("已存此名字的项目类别！");
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
    })
  };

  deleteTab(){
    let {tabObj,tabNameArr,currentTab} = this.state;
    if(tabNameArr.length === 1){
      message.warning("至少保留一个项目类别！");
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
    if(tmpCurrentIndex >= tmpTabNameArr.length){
      tmpCurrentIndex -= 1
    }

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
      message.warning("请输入项目类别名称！");
      return
    }
    if(tabNameArr.indexOf(currentTabNewName) !== -1){
      message.warning("已存此名字的项目类别！");
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
        <TabPane tab={tabName} key={tabName}>
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

  render() {
    return (
      <Spin spinning={this.state.showLoading} tip="正在保存">
        <div>
          {this.getTitle()}
          <div style={{ display: 'flex', padding: 20 }}>
            <Input style={{ width: '50%' }}  placeholder='请输入项目类别名称' onChange={e => {this.state.currentTabNewName = e.target.value;return null}} />
            <Button style={{ marginLeft: 10 }} onClick={() => this.tabNameChange()}>更改项目类别名称</Button>
            <Button style={{ marginLeft: 10 }} onClick={() => this.deleteTab()}>删除此项目类别名称</Button>
            <Button style={{ marginLeft: 10 }} onClick={() => this.addTab()}>新增项目类别</Button>
          </div>
          <div style={{ padding: 20, borderBottom: '2px solid #ccc' }}>
            <div style={{ marginBottom: 20 }}>
              {this.renderTabs()}
            </div>
            <div className="addQuestion" style={{ wdith: '100%', height: '100%', padding: 30, background: '#eee', textAlign: 'center'}} onClick={this.handleAddTopic}>
              添加检查内容
            </div>
          </div>
          {this.getFooter()}
        </div>
      </Spin>
    );
  }
}

export default questionAdd;
