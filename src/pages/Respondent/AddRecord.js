import React, { Component } from 'react';
import { connect } from 'dva';
import Link from "umi/link";
import { Card, Button, List } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './RespondentRecord.less';
import router from 'umi/router';

@connect(({record,routerParams,loading}) =>({
  record,
  routerParams,
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
 };

  getAllGauge = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'record/fetchAllGauge'
    })
  };

  setAddId = (addId,path) => {
    const { dispatch} = this.props;
    dispatch({
      type: 'routerParams/set',
      payload:{
        RecordAddId:addId,
      },
    });
    router.push(`${path}`);
  };

  addRecord = (item) => {
    const {record:{allQuestionnaireData,allGaugeData}} =this.props;
    if(allGaugeData.includes(item)){
      this.setAddId(item.Id,'/respondent/respondent-list/respondent-record/add-record/physiology');
      return
    }
    if(allQuestionnaireData.includes(item)){
      this.setAddId(item.Id,'/respondent/respondent-list/respondent-record/add-record/add-questionnaire');
      return
    }
    this.setAddId(item.Id,'/respondent/respondent-list/respondent-record/add-record/diagnosis');
  };


  render() {
    const { record:{ allQuestionnaireData, allGaugeData } , loading } = this.props;
    let data = [{Name: "四诊数据采集"}];
    let Data = [];
    allQuestionnaireData.map(item =>{
      Data.push(item)
    })
    allGaugeData.map(item =>{
      Data.push(item)
    })
    data = data.concat(Data);
    return(
      <PageHeaderWrapper title="新增记录" loading={loading}>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <div className={styles.cardList}>
            <List
              rowKey="Id"
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
                      extra={<Button onClick={()=>this.addRecord(item)}>新增</Button>}
                    >
                      点击新增添加新记录。
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
