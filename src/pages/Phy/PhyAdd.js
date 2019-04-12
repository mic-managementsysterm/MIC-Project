import React, { Component } from 'react';
import {Spin , DatePicker, Button, Input, Icon,InputNumber,Upload ,Row,message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({phy,loading})=>({
  phy,
  loading:loading.models.loading
}))
class PhyAdd extends Component{
constructor(props) {
  super(props);
  this.state = {
    titleEditable:false,
    addAreaVisible:false,
    phys:{
      Id:         null,
      Name:       '这里是标题',
      Topics:     [
        {
          Id:         null,
          GaugeId:    null,
          GroupName:  null,
          GroupOrder: 1,
          Title:      null,
          Order:      null,
          Type:       null
        },
      ],
      CreatedAt:  null,
    }
    ,
    title:'这里是标题',
    showLoading:false,
  };
}

  handleTitleClick = () => {
    this.setState({
      titleEditable: true
    })
  }

  handleTitleChange = (e) =>{
    this.state.phys.Name=e.target.value;
    this.setState({
      phys:this.state.phys
    })
  }

  handleTitleBlur = () => {
    this.setState({
      titleEditable: false
    })
  }

  handlePhyChange = (e, phyIndex,int) =>{
    const { phys } = this.state;
    if (int===1) {
      phys.Topics[phyIndex].Title = e.target.value;
      phys.Topics[phyIndex].Order = phyIndex,
      this.setState({
        phys: phys
      });
    }else {
      phys.Topics[phyIndex].GroupName = e.target.value;
      phys.Topics[phyIndex].Order = phyIndex,
      this.setState({
        phys: phys
      });
    }
  }

  getAddArea=()=> {
    return (
      this.state.addAreaVisible ? (
        <div style={{ padding: 30, textAlign: 'center', border: '1px solid #eee' }}>
          <Button icon="check-circle-o" size="large">类型一</Button>
          <Button icon="check-square-o" size="large" style={{ marginLeft: 16 }}>类型二</Button>
          <Button icon="check-square-o" size="large" style={{ marginLeft: 16 }}>类型三</Button>
          <Button icon="check-square-o" size="large" style={{ marginLeft: 16 }}>类型四</Button>
        </div>
      ) : ''
    );
  }

  handleAddPhy=()=> {
    this.setState({
      addAreaVisible: !this.state.addAreaVisible
    })
  }

  getQuestionOperator(questionIndex, array) {
    return (
      <div>
        {/*<p style={{ float: 'right' }}>*/}
          {/*{questionIndex === 0 ? (*/}
            {/*null*/}
          {/*) : (*/}
            {/*<span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleShiftQuestion(questionIndex, -1)}>上移</span>*/}
          {/*)}*/}
          {/*{questionIndex === array.length - 1 ? (*/}
            {/*null*/}
          {/*) : (*/}
            {/*<span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleShiftQuestion(questionIndex, 1)}>下移</span>*/}
          {/*)}*/}
          {/*<span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleCopyQuestion(questionIndex)}>复用</span>*/}
          {/*<span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleRemoveQuestion(questionIndex)}>删除</span>*/}
        {/*</p>*/}
        11111111111111111
      </div>
    );
  }

  addPsyGroup=()=>{
    const {phys} = this.state;
    const newRow={
          Id:         null,
          GaugeId:    null,
          GroupName:  null,
          GroupOrder: 1,
          Title:      null,
          Order:      null,
          Type:       null
        }
      phys.Topics.push(newRow)
        this.setState({
          phys:phys
        })

  }

  savePhy = (body) => {
  const { dispatch } = this.props;
    this.setState({
      showLoading:true
    })
    dispatch({
        type:'phy/changePhy',
        payload: {body},callback:()=>{
          this.setState({
            showLoading:false
          })
          router.go(-1)
        }
      }
    )
  }

  getTitle = () => {
    return (
      this.state.titleEditable ? (
        <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 3, textAlign: 'center' }} onClick={this.handleTitleClick}>
          <Input style={{ fontSize: 18, fontWeight: 'bold', padding: 30, textAlign: 'center' }} value={this.state.phys.Name} onChange={this.handleTitleChange} onBlur={this.handleTitleBlur} />
        </div>
      ) : (
        <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 20, textAlign: 'center' }} onClick={this.handleTitleClick}>
          <h2><strong>{this.state.phys.Name}</strong></h2>
        </div>
      )
    );
  }

  getPhys = () => {
    const {phys} = this.state;
    return (phys.Topics.map((phy, phyIndex) => {
      phys.Topics.map((order,index)=>{
        if (phy.GroupOrder===order.GroupOrder) {
          <div style={{ padding: 30 }} key={phyIndex}>
            <Input value={phy.Title} style={{ borderStyle: 'none', width: '50%', marginLeft: 3 }} onChange={(e) => this.handlePhyChange(e, phyIndex,1)} />
            <span>项目名称</span>
            <Input value={phy.GroupName} style={{ borderStyle: 'none', width: '50%', marginLeft: 3,marginTop:10 }} onChange={(e) => this.handlePhyChange(e, phyIndex,2)}></Input>
            <span>项目类型</span>
            <Button style={{ textAlign: 'center'}} onClick={this.handleAddPhy}>
              添加问题
            </Button>
            {this.getQuestionOperator(phyIndex,phy.Topics)}
          </div>
        }
      })
      if (phy.Type === 1 || 2 || 3 || 4) {
        return (
          <div style={{ padding: 30 }} key={phyIndex}>
            <Input value={phy.Title} style={{ borderStyle: 'none', width: '50%', marginLeft: 3 }} onChange={(e) => this.handlePhyChange(e, phyIndex,1)} />
            <span>项目名称</span>
            <Input value={phy.GroupName} style={{ borderStyle: 'none', width: '50%', marginLeft: 3,marginTop:10 }} onChange={(e) => this.handlePhyChange(e, phyIndex,2)}></Input>
            <span>项目类型</span>
            <Button style={{ textAlign: 'center'}} onClick={this.handleAddPhy}>
              添加问题
            </Button>
            </div>
        );
      }
      else {
        return null;
      }
    }))
  }

  render() {
    return(
      <PageHeaderWrapper title="新增理化单">
        <Spin spinning={this.state.showLoading} tip={'正在保存'}>
          {this.getTitle()}
          {this.getPhys()}
          {this.getAddArea()}
          <div style={{ wdith: '100%', height: '100%', padding: 30, background: '#eee', textAlign: 'center'}} onClick={this.addPsyGroup}>
            添加类型
          </div>
          <Button onClick={()=>this.savePhy(this.state.phys)}>保存理化单</Button>
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default PhyAdd;
