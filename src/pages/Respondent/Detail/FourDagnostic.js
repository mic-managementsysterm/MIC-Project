import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider,Row } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import DescriptionDetail from '@/components/DescriptionDetail';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { service } from "@/services/config";
import styles from  './FourDagnostic.less';
const { Description } = DescriptionList;

@connect(({ detail,routerParams, loading }) => ({
  detail,
  routerParams,
  loading: loading.effects['detail/fetchDiagnosisDetail'],
}))
class FourDagnostic extends Component {
  componentDidMount() {
    const { dispatch,routerParams } = this.props;
    dispatch({
      type: 'detail/fetchDiagnosisDetail',
      payload: {
        Id: routerParams.RecordId,
      },
    });
  }

  render() {
    const { detail = {}, loading } = this.props;
    const { diagnosisData = {} } = detail;
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
          <DescriptionDetail size="large" title="记录详情" style={{ marginBottom: 32 }}>
            <Description term="主诉" className={styles.term}>
              <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>{diagnosisData.ZS}</Row>
            </Description>
            <Description term="现病史" className={styles.term}>
              <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>{diagnosisData.XBS}</Row>
            </Description>
            <Description term="既往史" className={styles.term}>
              <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>{diagnosisData.JWS}</Row>
            </Description>
            <Description term="过敏史" className={styles.term}>
              <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>{diagnosisData.GMS}</Row>
            </Description>
            <Description term="体格检查" className={styles.term}>
              <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>{diagnosisData.TGJC}</Row>
            </Description>
            <Description term="中医诊断" className={styles.term}>
               <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>
                 {diagnosisData&&diagnosisData.Diagnoses
                   ? diagnosisData.Diagnoses.map((item, index) => {
                     return <span key={index}>{item.DiagnoseName}&nbsp;&nbsp;</span>;
                   })
                   : null}
               </Row>
            </Description>
            <Description term="四诊信息" className={styles.term}>
              <Row style={{ color: '#0e0c0ca6',fontSize: 14,padding: 5 }}>
                {diagnosisData&&diagnosisData.Symptoms
                  ? diagnosisData.Symptoms.map((item, index) => {
                    return <span key={index}>{item.SymptomName}&nbsp;&nbsp;</span>;
                  })
                  : null}
              </Row>
            </Description>
            <Description term="四诊照片" className={styles.term}>
              {diagnosisData.MedicalImgs && diagnosisData.MedicalImgs ? diagnosisData.MedicalImgs.map(img => <img
                src={`${service}${img.Img}`} className={styles.img}/>) : null
              }
            </Description>
          </DescriptionDetail>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default FourDagnostic;
