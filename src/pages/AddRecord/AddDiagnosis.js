import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Spin, Button, AutoComplete, Select, Row, Col, Transfer, Tabs, Card,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './AddDiagnosis.less';
const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(({ getDisease, getSyndrome, loading }) => ({
  getDisease,
  getSyndrome,
  loading: loading.models.getDisease && loading.models.getSyndrome,
}))
class AddDiagnosis extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'getDisease/getDisease',
      payload: "",
    });
    dispatch({
      type: 'getSyndrome/getSyndrome',
      payload: ''
    })
  }

  callback=(key)=> {
    console.log(key);
  }

  render() {
    const {getDisease: {diseaseData},getSyndrome: {syndromeData}} = this.props;
    return(
      <PageHeaderWrapper title="新增中医诊断">
        <Card bordered={false}>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="病名" key="1">
            {
              diseaseData.map((item,index) =>{
                return (
                  <ul key={index} className={styles.list}>
                    <li onClick={() => router.go(-1)}>{item}</li>
                  </ul>
                )
              })
            }
          </TabPane>
          <TabPane tab="症型" key="2">
            {
              syndromeData.map((item,index) =>{
                return (
                  <ul key={index}>
                    <li>{item}</li>
                  </ul>
                )
              })
            }
          </TabPane>
        </Tabs>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default AddDiagnosis;
