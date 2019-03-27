import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Question.less'

 @connect(({question,loading})=>({
  question,
  loading:loading.models.question
}))
export  default class Question extends Component{
    constructor(props){
        super(props);
        this.handleDelete=this.handleDelete.bind(this)
    }
componentWillMount(){
  this.fetchQuestionList()
}
   fetchQuestionList=()=>{
       const {dispatch}=this.props
         dispatch({
           type:'question/fetchQuestionList'
         })
     const {question:{questions}}=this.props
}
   handleDelete=(Id)=>{
      const {dispatch}=this.props
     dispatch({
       type:'question/deleteQuestions',
       payload:{Id},callback:()=>{
         this.fetchQuestionList()
     }})
   }
    render(){
      const {question:{questions},loading}=this.props;
      questions?
      questions.map((que,index)=>{
        que.CreatedAt=moment(que.CreatedAt).format('YYYY-MM-DD HH:mm:ss')
      }):null
      const columns=[
        {
          title:'题目',
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
          title:'总分',
          dataIndex:'TotalScore',
          key:'TotalScore',
          align:'center'
        },
        {
          title:'及格分数',
          dataIndex:'PassScore',
          key:'PassScore',
          align:'center'
        },
        {
          title:'操作',
          dataIndex:'operation',
          align:'center',
          render:(text,record)=>(
            questions.length>=1?
            (   <div className={styles.operation}>
          <Link to={
            `/gauge/question-list/questionEdit-list?Id=${record.Id}`
          }>
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
          <PageHeaderWrapper title="问卷管理" loading={loading}>
            <div >
              <div style={{display:'flex',flexDirection:'row-reverse'}}>
              <Link to={'/gauge/question-list/questionAdd-list'}>
                <Button className={styles.btn2} style={{marginBottom:5,}} >添加</Button>
              </Link>
              </div>
                <Table rowKey='Id' style={{backgroundColor:'#ffffff'}} align={'center'} columns={columns} dataSource={questions}> </Table>
            </div>
          </PageHeaderWrapper>
        )
    }
}
