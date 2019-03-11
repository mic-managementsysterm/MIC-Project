import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
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
const Data=[
    {
        title: 'MIC',
        TotalScore:13,
        PassCore:12,
        Topics:[
            {
                name:'选择一个工具',
                type:0,
                // score:5,
                pic:require('../../assets/img/cognition.jpg'),
                options:[
                    {
                        text:'锤子',
                        value:5
                    },
                    {
                        text:'锅',
                        value:0
                    }
                ]
            },
            {
                title:'选择一个数字',
                type:1,
                // score:1,
                options:[
                    {
                        text:'+1',
                        value:1
                    },
                    {
                        text:'+2',
                        value:2
                    },
                    {
                        text:'+3',
                        value:3
                    }
                ]
            }
        ]
    }
]
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
                                        pathname:'/edit',
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
            <div>
                <Link to={'/add'}>
                <Button style={{marginBottom:5,float:'right'}}>添加</Button>
                </Link>
                <Table align={'center'} columns={this.state.columns} dataSource={this.state.data}></Table>
            </div>
        )
    }
}