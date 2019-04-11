import React, { Component } from 'react';
import { Table,Button, Popconfirm} from 'antd';
import Link from 'umi/link';
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
                <Link to={{
                  pathname:'/phy/phy-list/phyEdit-list',
                  state:{Id:record.Id}
                }}>
                  <Button className={styles.btn}>编辑</Button>
                </Link>
                <Popconfirm  title="确定删除?"  okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>删除</Button>
                </Popconfirm>
              </div>
            ) : null)
      }
    ]
    return(
      <PageHeaderWrapper title="理化单管理">
        <div style={{display:'flex',flexDirection:'row-reverse'}}>
          <Link to={'/phy/phy-list/phyAdd-list'}>
            <Button className={styles.btn2} style={{marginBottom:5}} >添加</Button>
          </Link>
        </div>
        <Table rowKey='Id' style={{backgroundColor:'#ffffff'}} align={'center'} columns={columns} dataSource={phys}> </Table>
      </PageHeaderWrapper>
    )
  }
}

export default Phy;
