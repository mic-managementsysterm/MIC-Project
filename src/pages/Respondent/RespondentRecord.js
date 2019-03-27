import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from "umi/link";
import { Card, Button, Icon, List, Popconfirm } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './RespondentRecord.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class RespondentRecord extends PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'list/getRecords',
      payload: {
        RespondentId: location.query.Id,
      },
    });
  }

  delRecord = (item) => {
    const { dispatch,location } = this.props;
    dispatch({
      type: item.delAction,
      payload: {
        Id: item.Id,
      },
      callback:()=>{
        dispatch({
          type: 'list/getRecords',
          payload: {
            RespondentId: location.query.Id,
          },
        });
      }
    });
  };

  render() {
    const {
      list: { records },
      loading,
      location
    } = this.props;
    const { Name, Gender, Phone, Born,Address,CreatedAt } = location.query;
    return (
      <PageHeaderWrapper title="患者详情">
        <Card
          style={{marginBottom:5}}
          title={Name}>
          {
            Phone? <p><span>电话号码:</span>
              <span>{Phone}</span></p>:null
          }
          {
            Gender? <p> <span>性别:</span>
              <span>{Gender}</span></p>:null
          }
          {
            Born? <p> <span>出生日期:</span>
              <span>{Born}</span></p>:null
          }
          {
            Address? <p><span>家庭地址:</span>
              <span>{Address}</span></p>:null
          }
        </Card>
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
                      <Link to={`${item.path}&Name=${Name}&Gender=${Gender}&Phone=${Phone}&Born=${Born}&Address=${Address}&CreatedAt=${CreatedAt}`}>
                        查看
                      </Link>,
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
                  <Link to={`/respondent/respondent-list/respondent-record/add-record?Id=${location.query.Id}`}>
                    <Button type="dashed" className={styles.newButton}>
                      <Icon type="plus" /> 新增记录
                    </Button>
                  </Link>
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
