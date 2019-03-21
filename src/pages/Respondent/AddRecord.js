import React, { Component } from 'react';
import { connect } from 'dva';
import Link from "umi/link";
import { Card, Button, List } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './RespondentRecord.less';
import router from 'umi/router';

@connect(({record,loading}) =>({
  record,
  loading:loading.models.record,
}))
 class AddRecord extends Component{
  componentDidMount() {
    this.getAllQuestionnaire();
    this.getAllGauge();
  }

 getAllQuestionnaire = () =>{
   const { dispatch } = this.props;
   dispatch({
     type: 'record/fetchAllQuestionnaire',
   })
 }

  getAllGauge = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'record/fetchAllGauge'
    })
  }

  next = () =>{

  }

  render() {
    const { record:{ allQuestionnaireData, allGaugeData } , loading } = this.props;
    let data = [{Name: "四诊数据采集",path: `/record/diagnosis`},{Name: '理化数据',path: `/record/physiology`},{Name: '问卷',path: `/record/add-questionnaire`}];
    // let Data = [];
    // allQuestionnaireData.map((item,index) =>{
    //   Data.push(item)
    // })
    // allGaugeData.map((item,index) =>{
    //   Data.push(item)
    // })
    // data = data.concat(Data);
    return(
      <PageHeaderWrapper title="新增记录" loading={loading}>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={data}
              renderItem={item =>
                (
                  <List.Item key={item.key}>
                    <Card
                      hoverable
                      className={styles.card}
                      title={item.Name}
                      extra={
                        <Link to={item.path}>
                        <Button>新增</Button>
                        </Link>}
                    >
                      Card content
                    </Card>
                  </List.Item>
                )
              }
            />
          </div>
        </div>
      </PageHeaderWrapper>
    );
}
}

export default AddRecord;
