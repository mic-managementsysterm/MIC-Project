import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import DescriptionDetail from '@/components/DescriptionDetail';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from  './FourDagnostic.less';
const { Description } = DescriptionList;

@connect(({ detail, loading }) => ({
  detail,
  loading: loading.effects['detail/fetchDiagnosisDetail'],
}))
class FourDagnostic extends Component {
  componentDidMount() {
    const { dispatch,location } = this.props;
    dispatch({
      type: 'detail/fetchDiagnosisDetail',
      payload: {
        Id: location.query.Id ? location.query.Id : '',
      },
    });
  }

  render() {
    const { detail = {}, loading } = this.props;
    const { diagnosisData = {} } = detail;
    const { Name, Gender, Phone, Born,Address,CreatedAt } = this.props.location.query;
    return (
      <PageHeaderWrapper title="记录详情页" loading={loading}>
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
          <DescriptionDetail size="large" title="记录详情" style={{ marginBottom: 32 }}>
            <Description term="主诉" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.ZS}</Description>
            <Description term="现病史" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.XBS}</Description>
            <Description term="既往史" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.JWS}</Description>
            <Description term="过敏史" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.GMS}</Description>
            <Description term="体格检查" className={styles.term}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{diagnosisData.TGJC}</Description>
            <Description term="中医诊断" className={styles.term}>
              {/*{diagnosisData&&diagnosisData.Diagnoses*/}
                {/*? diagnosisData.Diagnoses.map((item, index) => {*/}
                  {/*return <span key={index}>{item.DiagnoseName}、</span>;*/}
                {/*})*/}
                {/*: null}*/}
              {diagnosisData.Diagnose}
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

export default FourDagnostic;
