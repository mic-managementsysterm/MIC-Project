import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import DescriptionDetail from '@/components/DescriptionDetail';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from  './BasicProfile.less';

const { Description } = DescriptionList;

@connect(({ profile, detail, loading }) => ({
  profile,
  detail,
  loading: loading.effects['profile/fetchBasic'] && loading.effects['detail/fetchDiagnosisDetail'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'profile/fetchBasic',
      payload: params.id || '1000000000',
    });

    this.getDiagnosisDetail();
  }

  getDiagnosisDetail = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'detail/fetchDiagnosisDetail',
      payload: {
        Id: 'b9d6c4fe-69f7-42f9-ab64-318af8e7f62a'
      }
    })
  }

  render() {
    const { profile = {}, detail = {}, loading } = this.props;
    const { userInfo = {} } = profile;
    const { diagnosisData = {} } = detail;
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
            <Description term="主诉" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.ZS}。</Description>
            <Description term="现病史" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.XBS}。</Description>
            <Description term="既往史" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.JWS}。</Description>
            <Description term="过敏史" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.GMS}。</Description>
            <Description term="体格检查" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.TGJC}。</Description>
            <Description term="中医诊断" className={styles.term}>
              {diagnosisData&&diagnosisData.Diagnoses
                ? diagnosisData.Diagnoses.map((item, index) => {
                    return <span key={index}>{item.DiagnoseName}、</span>;
                  })
                : null}
            </Description>
            <Description term="四诊信息" className={styles.term}>
              {diagnosisData.Symptoms
                ? diagnosisData.Symptoms.map((item, index) => {
                    return <span key={index}>{item.SymptomName}、</span>;
                  })
                : null}
            </Description>
          </DescriptionDetail>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
