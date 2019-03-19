import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GaugeDetail from '@/components/GaugeDetail';
import styles from './Cognition.less';

const { Description } = DescriptionList;

@connect(({ profile, detail, loading }) => ({
  profile,
  detail,
  loading: loading.effects['profile/fetchBasic']  && loading.effects['detail/fetchCognitionDetail'],
}))
class Cognition extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'profile/fetchBasic',
      payload: params.id || '1000000000',
    });

    this.getCognitionDetail();
  }

  getCognitionDetail = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'detail/fetchCognitionDetail',
      payload: {
        Id: '0c7523d0-d157-4918-9ba6-ecfa7bed8527'
      }
    })
  }

  render() {
    const { profile = {}, loading , detail= {}} = this.props;
    const { userInfo = {} } = profile;
    const { cognitionData = {} } = detail;
    return (
      <PageHeaderWrapper title="基础详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">{userInfo.name}</Description>
            <Description term="用户性别">{userInfo.delivery}</Description>
            <Description term="联系电话">{userInfo.tel}</Description>
            <Description term="出生日期">{userInfo.tel}</Description>
            <Description term="家庭地址">{userInfo.addr}</Description>
            <Description term="时间">{userInfo.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <GaugeDetail data={cognitionData} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Cognition;
