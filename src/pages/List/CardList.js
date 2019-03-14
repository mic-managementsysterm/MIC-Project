import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Popconfirm } from 'antd';
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
      type: 'list/fetch',
      payload: {
        count: 8,
        Id: this.props.location.query.Id,
      },
    });
    console.log('@123',this.props.location.query.Id)
  }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    console.log('@props',this.props)
    return (
      <PageHeaderWrapper title="患者详情">
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.key}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                        <Button onClick={() => {
                          router.push('/profile/basic')
                        }}>查看</Button>,
                      <Popconfirm title="确认删除？" okText="确认" cancelText="取消">
                        <Button>删除</Button>
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
                    <Button type="dashed" className={styles.newButton} onClick={() =>{router.push('/profile/record')}} >
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

export default CardList;
