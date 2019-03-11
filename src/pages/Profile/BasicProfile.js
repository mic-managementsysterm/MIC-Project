import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import DescriptionDetail from '@/components/DescriptionDetail';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from  './BasicProfile.less';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
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
      basicGoods = [],
      basicProgress = [],
      userInfo = {},
      application = {},
      diagnosisData = {},
      cognitionData = {},
    } = profile;
    console.log('@diagnosisData', diagnosisData);
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
          <DescriptionDetail size="large" title="记录详情" style={{ marginBottom: 32 }}>
            <Description term="主诉:">{diagnosisData.ZS}</Description>
            <Description term="现病史:">{diagnosisData.XBS}</Description>
            <Description term="既往史:">{diagnosisData.JWS}</Description>
            <Description term="过敏史:">{diagnosisData.GMS}</Description>
            <Description term="体格检查:">{diagnosisData.TGJC}</Description>
            <Description term="中医诊断:">
              {diagnosisData.Diagnoses
                ? diagnosisData.Diagnoses.map((item, index) => {
                    return <span key={index}>{item.DiagnoseName}、</span>;
                  })
                : null}
            </Description>
            <Description term="四诊信息:">
              {diagnosisData.Symptoms
                ? diagnosisData.Symptoms.map((item, index) => {
                    return <span key={index}>{item.SymptomName}、</span>;
                  })
                : null}
            </Description>
          </DescriptionDetail>
          <Divider style={{ marginBottom: 32 }} />
          <div>{cognitionData.Infos ? cognitionData.Infos.map((item,index) =>{
            return (
              <div key={index}>
                <div className={styles.cognitionContentName}>
                  <div className={styles.cognitionContentGroupname}>
                    {(index>0 && cognitionData.Infos[index-1].TopicInfo.GroupName == item.TopicInfo.GroupName)?
                      null:item.TopicInfo.GroupName}
                  </div>
                  <div className={styles.cognitionContentDetail}>
                    <ul className={styles.cognitionContentDetailTitle}>
                      <li>{item.TopicInfo.Order}.{item.TopicInfo.Title}</li>
                    </ul>
                    <ul className={styles.cognitionContentDetailScore}>
                      <li>{item.Score}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }) :null }</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
