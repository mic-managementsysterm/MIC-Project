import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input,Spin, Button, AutoComplete,Select
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './AddDiagnosis.less';
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


class DiagnosisInfo extends PureComponent {
  render() {
    let handleChange  =(value) =>{
      console.log(`selected ${value}`);
    }
    return(
      <PageHeaderWrapper title="新增四诊信息">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          onChange={handleChange}
          tokenSeparators={[',']}
        >
          {children}
        </Select>,
      </PageHeaderWrapper>
    )
  }
}

export default DiagnosisInfo;
