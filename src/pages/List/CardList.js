import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Popconfirm } from 'antd';
import Link from "umi/link";
import router from 'umi/router';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CardList.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'list/getRecords',
      payload: {
        RespondentId: location.query.Id,
      },
    });
  }

  delRecord =(item) => {
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

  renderItem =(item)=> {
    const { location }=this.props;
    const { Name, Gender, Phone, Born,Address,CreatedAt } = location.query;
    return(
      item ? (
        <List.Item key={item.key}>
          <Card
            hoverable
            className={styles.card}
            actions={[
              <Link to={`${item.path}&Name=${Name}&Gender=${Gender}&Phone=${Phone}&Born=${Born}&Address=${Address}&CreatedAt=${CreatedAt}`}>
                <a>查看</a>
              </Link>,
              <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={()=>this.delRecord(item)}>
                <a>删除</a>
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
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
          <Button type="dashed" className={styles.newButton} onClick={() =>{router.push(`/profile/record?Id=${location.query.Id}`)}}>
            <Icon type="plus" /> 新增记录
          </Button>
        </List.Item>
      )
    )
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
            renderItem={item =>this.renderItem(item)}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
