import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import mockData from '../../component/mockData';
const list = localStorage.list ? JSON.parse(localStorage.list) : [];
const defaultQuestionnaire = {
    title: '这里是标题',
    date: '',
    stage: '未发布',
    questions: [],
    titleEditable: false,
    addAreaVisible: false
};
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
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleFill = this.handleFill.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = { dataSource: list };
    }

    handleAdd(){
        const index = list.length;
        const setEditing = Object.assign({}, {...defaultQuestionnaire, index})
        localStorage.editing = JSON.stringify(setEditing);
        window.location.reload();
    }

    handleReset() {
        localStorage.list = JSON.stringify(mockData);
        window.location.reload();
    }

    handleEdit(index) {
        const setEditing = Object.assign({}, list[index]);
        localStorage.editing = JSON.stringify(setEditing);
        window.location.reload();
    }

    handleFill(index) {
        const setEditing = Object.assign({}, list[index]);
        localStorage.editing = JSON.stringify(setEditing);
        window.location.reload();
    }

    handleCheck(index) {
        const setEditing = Object.assign({}, list[index]);
        localStorage.editing = JSON.stringify(setEditing);
        window.location.reload();
    }

    handleDelete(key, index) {
        const dataSource = [...this.state.dataSource];

        if (list[index]) {
            list.splice(index, 1);
            localStorage.list = JSON.stringify(list);
            window.location.reload();
        } else if (key) {
            this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        }
    }

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: '25%',
            align: 'center'
        }, {
            title: '截止时间',
            dataIndex: 'date',
            key: 'date',
            width: '25%',
            align: 'center'
        }, {
            title: '阶段',
            dataIndex: 'stage',
            key: 'stage',
            width: '25%',
            align: 'center'
        }, {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record, index) => {
                let prevButton;
                switch (record.stage) {
                    case '未发布':
                        prevButton = <Link to={
                            {
                                pathname:'/edit',
                                state:{data:Data}
                            }
                        }><Button onClick={() => this.handleEdit(index)}>编辑问卷</Button></Link>
                        break;
                    case '发布中':
                        prevButton = (
                            <span>
                                <Link to="/fill"><Button onClick={() => this.handleFill(index)}>填写问卷</Button></Link>
                                <Link to="/check"><Button onClick={() => this.handleCheck(index)}>查看数据</Button></Link>
                            </span>
                        );
                        break;
                    case '已结束':
                        prevButton = <Link to="/check"><Button onClick={() => this.handleCheck(index)}>查看数据</Button></Link>
                        break;
                    default:
                        prevButton = <span></span>
                }
                return (
                    <span>
                        {prevButton}
                        <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record.key, index)}>
                            <Button style={{ marginLeft: 8 }}>删除问卷</Button>
                        </Popconfirm>
                    </span>
                );
            }
        }];

        return (
            <div>
                <Table columns={columns} dataSource={this.state.dataSource} pagination={false} />
                {/* 两行按钮 */}
                {/* <Link to="/edit"><Button type="primary" style={{ marginTop: 16, width: '100%', height: '40px' }} onClick={this.handleAdd}>新建问卷</Button></Link>
                <Button style={{ marginTop: 16, width: '100%', height: '40px' }} onClick={this.handleReset}初始化</Button> */}
                {/* 一行按钮，左右放 */}
                <Button style={{ marginTop: 16, width: '45%', height: '40px' }} onClick={this.handleReset}>初始化</Button>
                <Link to="/edit"><Button type="primary" style={{ marginTop: 16, marginLeft: '2%', width: '45%', height: '40px' }} onClick={this.handleAdd}>新建问卷</Button></Link>
            </div>
        );
    }
}