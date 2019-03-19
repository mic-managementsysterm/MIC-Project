import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GaugeDetail from '@/components/GaugeDetail';

const { Description } = DescriptionList;

@connect(({ profile, detail, loading }) => ({
  profile,
  detail,
  loading: loading.effects['profile/fetchBasic'] && loading.effects['detail/fetchMOCADetail'],
}))
class MOCA extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'detail/fetchMOCADetail',
      payload: params.id || '1000000000',
    });

    this.getMOCADetail();
  }

  getMOCADetail = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'detail/fetchMOCADetail',
      payload: {
        Id: '',
      },
    });
  }

  render() {
    const { profile = {}, detail = {}, loading } = this.props;
    const { userInfo = {} } = profile;
    const { mocaData = {} } = detail;
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
          <GaugeDetail data={mocaData} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MOCA;
