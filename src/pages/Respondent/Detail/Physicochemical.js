import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Icon, Row, Col } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Physicochemical.less';
const { Description } = DescriptionList;

@connect(({ detail, loading }) => ({
  detail,
  loading: loading.effects['detail/fetchPhysicochemicalDetail'],
}))
class Physicochemical  extends Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'detail/fetchPhysicochemicalDetail',
      payload: {
        Id:  location.query.Id ? location.query.Id : '',
      },
    });
  }

  render() {
    const { detail = {}, loading } = this.props;
    const { physicochemicalData = {} } = detail;
    const { Name, Gender, Phone, Born,Address,CreatedAt } = this.props.location.query;
    return (
      <PageHeaderWrapper title="基础详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">{Name}</Description>
            <Description term="用户性别">{Gender}</Description>
            <Description term="联系电话">{Phone}</Description>
            <Description term="出生日期">{Born}</Description>
            <Description term="家庭地址">{Address}</Description>
            <Description term="创建时间">{CreatedAt}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <h1>{physicochemicalData&&physicochemicalData.GaugeRecord ? physicochemicalData.GaugeRecord.GaugeName : null}检查详情</h1>
          <Row>
            <Col span={6}>测定项目</Col>
            <Col span={6} offset={6}>测定结果</Col>
          </Row>
          <div>{
            physicochemicalData&&physicochemicalData.RecordInfos ? physicochemicalData.RecordInfos.map((item,index) =>{
            return(
            <div key={index}>
            <Row className={styles.groupName}>{item.GroupName}</Row>
              <Row>
                <Col span={6}>
                  <ul>
                  <li>{item.Title}</li>
                  </ul>
                </Col>
                <Col span={6} offset={6}>
                  <ul>
                  <li>{item.ItemResult}{item.ExceptionType === '1' ? <Icon type='arrow-up' /> : <Icon type='arrow-down' /> }</li>
                  </ul>
                  </Col>
              </Row>
            </div>
            )
          }) : null}</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Physicochemical ;
