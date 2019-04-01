import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Button, Icon, List, Popconfirm } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './RespondentRecord.less';

@connect(({ list,routerParams, loading }) => ({
  list,
  routerParams,
  loading: loading.models.list,
}))
class RespondentRecord extends PureComponent {
  componentDidMount() {
    const { dispatch, routerParams } = this.props;
    dispatch({
      type: 'list/getRecords',
      payload: {
        RespondentId: routerParams.Respondent.Id,
      },
    });
  }

  delRecord = (item) => {
    const { dispatch,routerParams } = this.props;
    dispatch({
      type: item.delAction,
      payload: {
        Id: item.Id,
      },
      callback:()=>{
        dispatch({
          type: 'list/getRecords',
          payload: {
            RespondentId: routerParams.Respondent.Id,
          },
        });
      }
    });
  };

  handlePush= (item) => {
    const { dispatch} = this.props;
    dispatch({
      type: 'routerParams/set',
      payload:{
        RecordId:item.Id,
      },
    });
    router.push(`${item.path}`)
  };

  handleAddRecord = () => {
    router.push(`/respondent/respondent-list/respondent-record/add-record`)
  };


  render() {
    const {
      list: { records },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="患者详情">
        <div className={styles.cardList}>
          <List
            rowKey="Id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...records]}
            renderItem={item =>
              item ? (
                <List.Item key={item.key}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a onClick={() => this.handlePush(item)}>
                        查看
                      </a>,
                      <Popconfirm title="确认删除？" onConfirm={()=>this.delRecord(item)} okText="确认" cancelText="取消">
                        删除
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      title={<a>{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleAddRecord()}>
                    <Icon type="plus" /> 新增记录
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default RespondentRecord;
