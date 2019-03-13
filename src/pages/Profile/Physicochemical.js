import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Icon } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import DescriptionDetail from '@/components/DescriptionDetail';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Physicochemical.less';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class Physicochemical  extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'profile/fetchBasic',
      payload: params.id || '1000000000',
    });
  }

  render() {
    const { profile = {}, loading } = this.props;
    const {
      userInfo = {},
      data = {},
    } = profile;
    // @ts-ignore
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
          <h1>理化检查详情</h1>
          <div className={styles.physicochemicalContentTitle}>
            <span>测定项目</span>
            <span>测定结果</span>
          </div>
          <div>{
            data.Data ?  data.Data.RecordInfos.map((item,index) =>{
            return(
            <div key={index}>
            <span className={styles.groupName}>{item.GroupName}</span>
            <div className={styles.physicochemicalContentDetail}>
            <ul className={styles.physicochemicalContentDetails}>
            <li>{item.Title}</li>
            </ul>
            <ul className={styles.physicochemicalContentDetails}>
            <li>{item.ItemResult}{item.ExceptionType === '1' ? <Icon type='arrow-up' /> : <Icon type='arrow-down' /> }</li>
            </ul>
            </div>
            </div>
            )
          }) : null}</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Physicochemical ;
