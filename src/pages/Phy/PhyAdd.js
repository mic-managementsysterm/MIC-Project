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
  render() {
    return(
      <PageHeaderWrapper title="新增理化单">

        <div>123</div>
      </PageHeaderWrapper>
    )
  }
}

export default PhyAdd;
