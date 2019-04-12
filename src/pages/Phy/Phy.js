import React, { Component } from 'react';
import { Table,Button, Popconfirm} from 'antd';
import Router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../Gauge/Question.less';

@connect(({phy,loading})=>({
  phy,
  loading:loading.models.phy
}))
class Phy extends Component{
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'phy/getAllPhy'
    })
  }

  handleDelete=(Id)=>{
    const {dispatch}=this.props
    dispatch({
      type:'phy/deletePhy',
      payload:{Id},callback:()=>{
        dispatch({
          type: 'phy/getAllPhy'
        })
      }})
  }

  handleRouteEdit = (Id) =>{
    const { dispatch } = this.props;
    dispatch({
      type:'routerParams/setStates',
      payload: {phyId: Id}
    })
    Router.push('/phy/phy-list/phyEdit-list')
}

handleRouteAdd = (Id) =>{
  const { dispatch } = this.props;
  dispatch({
    type:'routerParams/setStates',
    payload: {phyId: Id}
  })
    Router.push('/phy/phy-list/phyAdd-list')
}

  render() {
    const {phy:{phys},loading}=this.props;
    phys ? phys.map(phy=>{
        phy.CreatedAt=moment(phy.CreatedAt).format('YYYY-MM-DD HH:mm:ss')
      }):null
    const columns=[
      {
        title:'标题',
        dataIndex:'Name',
        key:'Name',
        align:'center'
      },
      {
        title:'创建时间',
        dataIndex:'CreatedAt',
        key:'CreatedAt',
        align:'center'
      },
      {
        title:'操作',
        dataIndex:'operation',
        align:'center',
        render:(text,record)=>(
          phys.length>=1?
            (   <div className={styles.operation}>
                  <Button className={styles.btn} onClick={() =>this.handleRouteEdit(record.Id)}>编辑</Button>
                <Popconfirm  title="确定删除?"  okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.Id)}>
                  <Button>删除</Button>
                </Popconfirm>
              </div>
            ) : null)
      }
    ]
    return(
      <PageHeaderWrapper title="理化单管理">
        <div style={{display:'flex',flexDirection:'row-reverse'}}>
          <Button style={{marginBottom:5}} onClick={() =>this.handleRouteAdd('')}>新增</Button>
        </div>
        <Table rowKey='Id' style={{backgroundColor:'#ffffff'}} align={'center'} columns={columns} dataSource={phys}> </Table>
      </PageHeaderWrapper>
    )
  }
}

export default Phy;
