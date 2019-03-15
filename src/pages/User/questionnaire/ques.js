import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import './index.less'
const data=[
    {
      Name:'MoCA评分量表',
        TotalScore:25
    },
    {
      Name:'认知筛查量表',
        TotalScore:30
    }
]
// noinspection JSAnnotator
const Data= {
        Name: 'MIC',
        TotalScore:13,
        PassScore:12,
      Topics:[
            {
                Id:33033,
              QuestionnaireId:5556,
              Title:'选择一个工具',
                Type:0,
              TotalScore:5,
              Image:require('../../../assets/img/cognition.jpg'),
              Order:null,
              GroupName:'记忆组',
              CreatedAt:'2019-03-14'
            },
            {
              Id:33053,
              QuestionnaireId:5557,
              Title:'画钟表',
              Type:0,
              TotalScore:5,
              Image:require('../../../assets/img/cognition.jpg'),
              Order:null,
              GroupName:'视空间与执行能力',
              CreatedAt:'2019-03-14'
            }
        ]
    }
 @connect(({question,loading})=>({
  question,
  loading:loading.models.question
}))
export  default class Index extends Component{
    constructor(props){
        super(props)
        this.state={
            data:data,
            columns:[
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
                title:'得分',
                dataIndex:'PassScore',
                key:'PassScore',
                align:'center'
              },
                {
                    title:'操作',
                    dataIndex:'operation',
                    align:'center',
                    render:(text,record)=>(
                        this.state.data.length>=1?
                            (   <div className='operation'>
                                    <Link to={{
                                        pathname:'/list/question-list/questionEdit-list',
                                        state:{Id:record.Id}
                                    }}>
                                    <Button className='btn'>编辑</Button>
                                    </Link>
                                  <Button>填写</Button>
                                <Popconfirm  title="确定删除?"  okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                                    <Button>删除</Button>
                                </Popconfirm>
                                </div>
                            ) : null)
                }
            ]
        }
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
     console.log('@question',questions)
}
    render(){
      const {question:{questions},loading}=this.props
      questions.map((que,index)=>{
        que.CreatedAt=moment(que.CreatedAt).format('YYYY-MM-DD HH:mm:ss')
      })
      // console.log('@question',questions)
        return(
          <PageHeaderWrapper loading={loading}>
            <div >
              <div style={{display:'flex',flexDirection:'row-reverse'}}>
              <Link to={'/list/question-list/questionAdd-list'}>
                <Button className={'btn2'} style={{marginBottom:5,}} >添加</Button>
              </Link>
              </div>
                <Table style={{backgroundColor:'#ffffff'}} align={'center'} columns={this.state.columns} dataSource={questions}></Table>
            </div>
          </PageHeaderWrapper>
        )
    }
}
