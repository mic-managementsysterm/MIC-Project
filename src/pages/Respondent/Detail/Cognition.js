import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GaugeDetail from '@/components/GaugeDetail';
const { Description } = DescriptionList;

@connect(({ detail,routerParams, loading }) => ({
  detail,
  routerParams,
  loading: loading.effects['detail/fetchCognitionDetail'],
}))
class Cognition extends Component {
  componentDidMount() {
    const { dispatch, routerParams } = this.props;
    dispatch({
      type: 'detail/fetchCognitionDetail',
      payload: {
        Id: routerParams.RecordId,
      },
    });
  }

  render() {
    const { loading , detail= {}} = this.props;
    const { cognitionData = {} } = detail;
    const { Name, Gender, Phone, Born,Address,Hobby } = this.props.routerParams.Respondent;
    return (
      <PageHeaderWrapper title="记录详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">{Name}</Description>
            <Description term="用户性别">{Gender === 0 ? '男' : '女'}</Description>
            <Description term="联系电话">{Phone}</Description>
            <Description term="出生日期">{Born}</Description>
            <Description term="家庭地址">{Address}</Description>
            <Description term="兴趣爱好">{Hobby}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <GaugeDetail data={cognitionData} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Cognition;
