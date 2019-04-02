import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Icon, Row, Col, Table  } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Physicochemical.less';
const { Description } = DescriptionList;

@connect(({ detail,routerParams, loading }) => ({
  detail,
  routerParams,
  loading: loading.effects['detail/fetchPhysicochemicalDetail'],
}))
class Physicochemical  extends Component {
  componentDidMount() {
    const { dispatch, routerParams } = this.props;
    dispatch({
      type: 'detail/fetchPhysicochemicalDetail',
      payload: {
        Id:  routerParams.RecordId,
      },
    });
  }

  render() {
    const { detail = {}, loading } = this.props;
    const { physicochemicalData = {} } = detail;
    const { Name, Gender, Phone, Born,Address,CreatedAt } = this.props.routerParams.Respondent;
    return (
      <PageHeaderWrapper title="记录详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">{Name}</Description>
            <Description term="用户性别">{Gender === 0 ? '男' : '女'}</Description>
            <Description term="联系电话">{Phone}</Description>
            <Description term="出生日期">{Born}</Description>
            <Description term="家庭地址">{Address}</Description>
            <Description term="创建时间">{CreatedAt}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <h1>{physicochemicalData&&physicochemicalData.GaugeRecord ? physicochemicalData.GaugeRecord.GaugeName : null}检查详情</h1>
          <Row clssName={styles.mainNav}>
            <Col span={6} className={styles.name}>测定项目</Col>
            <Col span={6} offset={6} className={styles.name}>测定结果</Col>
          </Row>
          {
            physicochemicalData&&physicochemicalData.RecordInfos ? physicochemicalData.RecordInfos.map((item,index) =>{
            return(
            <div key={index}>
            <Row className={styles.groupName}>
              {(index>0 && physicochemicalData.RecordInfos[index-1].GroupName == item.GroupName)?
                null:item.GroupName}
            </Row>
              <Row className={styles.que}>
                <Col span={6}>
                  <ul><li>{item.GroupName === '血常规(RBC)' || item.GroupName === '血糖' || item.GroupName === '肝、肾功能' ? item.Title : (item.GroupName === '静息心电图' ? item.Title : item.ItemValue) }</li></ul>
                </Col>
                <Col span={6} offset={6}>
                  <ul style={{marginLeft: item.ExceptionType === 0 ? 12 : (item.ExceptionType ===1 || item.ExceptionType === 2 ? 15: (item.ItemChecked ? 15 : 15)), color: item.ExceptionType === 0 ? (item.ItemChecked ? 'red' : '') : 'red'}}>
                  <li>{
                    item.GroupName === '血常规(RBC)' || item.GroupName === '血糖' || item.GroupName === '肝、肾功能' ?
                      (item.ExceptionType === 0 ? '正常' : (item.ExceptionType === 1 ? <Icon type='arrow-up' /> : (item.ExceptionType === 2 ? <Icon type='arrow-down' /> :  null)))
                      :
                      (item.GroupName === '静息心电图' ? (item.Title === '心率' ? item.ItemValue : (item.ItemChecked ? <Icon type="check" /> : <Icon type="close" />)) : null)
                  }</li>
                  </ul>
                  </Col>
              </Row>
              <Divider className={styles.line} />
            </div>
            )
          }) : null}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Physicochemical ;
