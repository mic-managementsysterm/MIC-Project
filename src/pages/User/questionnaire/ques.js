import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import Link from 'umi/link';
import './index.less'
const data=[
    {
        name:'MoCA评分量表',
        TotalScore:25
    },
    {
        name:'认知筛查量表',
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

export  default class Index extends Component{
    constructor(props){
        super(props)
        this.state={
            data:data,
            columns:[
                {
                    title:'题目',
                    dataIndex:'name',
                    key:'name',
                    align:'center'
                },
                {
                    title:'分数',
                    dataIndex:'TotalScore',
                    key:'TotalScore',
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
                                        pathname:'/list/question/edit',
                                        state:{data:Data}
                                    }}>
                                    <Button className='btn'>编辑</Button>
                                    </Link>
                                <Popconfirm  title="确定删除?"  okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                                    <Button>删除</Button>
                                </Popconfirm>
                                </div>
                            ) : null)
                }
            ]
        }
    }

    render(){
        return(
            <div >
              <div style={{display:'flex',flexDirection:'row-reverse'}}>
              <Link to={'/list/question/add'}>
                <Button className={'btn2'} style={{marginBottom:5,}} >添加</Button>
              </Link>
              </div>
                <Table align={'center'} columns={this.state.columns} dataSource={this.state.data}></Table>
            </div>
        )
    }
}
