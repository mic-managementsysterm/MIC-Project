import React, { Component } from 'react';
import {Spin , DatePicker, Button, Input, Select ,InputNumber,Upload ,Row,message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const Option = Select.Option;

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
          GroupOrder: null,
          Title:      null,
          Order:      null,
          Type:       null
        }
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
    const handleChange = (value) => {
      console.log('@value',value)
      console.log(`selected ${value}`);
    };
    const handleBlur =()=> {
      console.log('blur');
    };
    const handleFocus =() => {
      console.log('focus');
    }
    return (phys.Topics.map((phy, phyIndex) => {
      if (phy.Type === 1 || 2 || 3 || 4) {
        return (
          <div style={{ padding: 30 }} key={phyIndex}>
            <div>
              <span>项目类型</span>
              <Input value={phy.Title} style={{ borderStyle: 'none', width: '50%', marginLeft: 3 }} onChange={(e) => this.handlePhyChange(e, phyIndex,1)} />
            </div>
            <div>
              <span>项目名称</span>
              <Input value={phy.GroupName} style={{ borderStyle: 'none', width: '50%', marginLeft: 3,marginTop:10 }} onChange={(e) => this.handlePhyChange(e, phyIndex,2)}></Input>
            </div>
           <span>项目类型</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择项目类型"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
            {this.getQuestionOperator(phyIndex,phys.Topics)}
            </div>
        );
      }
      else {
        return null;
      }
    }))
  }

  handleShiftPhy=(phyIndex, num) =>{
    const { phys } = this.state;
    let shiftQuestion = phys.Topics.splice(phyIndex, 1)[0];
    phys.Topics.splice(phyIndex + num, 0, shiftQuestion);
    this.setState({
      phys: phys
    })
  }

  handleCopyPhy = (phyIndex) => {
    const { phys } = this.state;
    let copy = Object.assign({}, phys.Topics[phyIndex]);
    phys.Topics.splice(phyIndex + 1, 0, copy);
    this.setState({
      phys: phys
    });
  }

  handleRemovePhy = (phyIndex) =>{
    const { phys } = this.state;
    phys.Topics.splice(phyIndex, 1);
    this.setState({
      phys: phys
    });
  }

  getQuestionOperator = (phyIndex, array) => {
    return (
      <div>
        <p style={{ float: 'right' }}>
          {phyIndex === 0 ? (
            null
          ) : (
            <span style={{ marginLeft: 8 }} onClick={() => this.handleShiftPhy(phyIndex, -1)}>上移</span>
          )}
          {phyIndex === array.length - 1 ? (
            null
          ) : (
            <span style={{ marginLeft: 8 }} onClick={() => this.handleShiftPhy(phyIndex, 1)}>下移</span>
          )}
          <span style={{ marginLeft: 8 }} onClick={() => this.handleCopyPhy(phyIndex)}>复用</span>
          <span style={{ marginLeft: 8 }} onClick={() => this.handleRemovePhy(phyIndex)}>删除</span>
        </p>
      </div>
    );
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

  render() {
    return(
      <PageHeaderWrapper title="新增理化单">
        <Spin spinning={this.state.showLoading} tip={'正在保存'}>
          {this.getTitle()}
          {this.getPhys()}
          <Button onClick={()=>this.savePhy(this.state.phys)}>保存理化单</Button>
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default PhyAdd;
