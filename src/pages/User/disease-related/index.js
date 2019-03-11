import React, { Component ,Fragment} from 'react';
import {
    Table, Input, Button, Popconfirm, Form, Modal, Row, Col, Radio,message
} from 'antd';
import './index.less';
// import $ from "jquery";
// import Api from "../../common/Api";
// import {message} from "antd/lib/index";
import { connect } from 'dva';

const FormItem = Form.Item;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
 class EditableTable extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {

      if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    };

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}
@connect(({ disease, loading }) => ({  // 连接disease.js文件
  disease,
  loading: loading.models.home,
}))
 class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            data1:[],
            data2:[],
            count: 2,
            loading: false,
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            disease:{
                Id:"",
                Name:"",
                PinYin:"",
                Prevalent:false
            },
            syndrome:{
                Id:"",
                Name:"",
                PinYin:""
            },
            disAndSyn : {
                DiseaseId:"",
                SyndromeIds:[]
            },
            selectedRowKeys: [],
            rowKey:null,
            value: false,
        };

        this.columns = [
            {
            title: '疾病名称',
            dataIndex: 'Name',
            width: '30%',
            editable: true,
                align: 'center'
        },
            {
            title: '疾病拼音',
            dataIndex: 'PinYin',
                align: 'center'
        },
            {
            title: '操作',
            dataIndex: 'operation', 
                align: 'center',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <div className='operation'>
                            <Button onClick={()=>this.setModal1Visible(record)} className='btn'>编辑</Button>
                            <Modal
                                centered
                                visible={this.state.modal1Visible}
                                title="编辑"
                                okText='保存'
                                cancelText='取消'
                                className={"form-modal1"}
                                bodyStyle={{ padding: '32px 40px 48px' }}
                                maskStyle={{backgroundColor:'rgba(0,0,0,.05)'}}
                                onOk={()=>this.handleOk()}
                                onCancel={this.handleCancel}
                                 >
                                <Input placeholder="编辑疾病名称" onChange={this.onChangeNameText}  className={"name-input"}/>
                                <Input placeholder="编辑疾病拼音" onChange={this.onChangePYText}  className={"py-input"} />
                                <div className={'is-common'}>
                                    <span className={'common'}>是否是常见病症</span>
                                    <RadioGroup onChange={this.onChange} value={this.state.disease.Prevalent}>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </RadioGroup>
                                </div>
                            </Modal>
                            <Button onClick={()=>this.setModal2Visible(record)} className='btn'>关联证型</Button>
                            <Modal
                                centered
                                width={1200}
                                title='关联证型'
                                okText='完成'
                                cancelText='取消'
                                visible={this.state.modal2Visible}
                                destroyOnClose={true}
                                onOk={this.handRelate}
                                onCancel={this.handleCancel}
                                className="form-modal"
                                maskStyle={{backgroundColor:'rgba(0,0,0,.3)'}}
                            >
                                <Row className="breadcrumb">
                                    <Col span={12} className="breadcrumb-title">
                                        <div className="syndrome-title">已关联证型</div>
                                        <Table
                                            dataSource={this.state.data1}
                                            columns={this.columns1}
                                        />
                                    </Col>
                                    <Col span={12} className="breadcrumb-title">
                                        <div  className="syndrome-title">
                                            <span>未关联证型</span>
                                            <Search
                                                placeholder="根据疾病名称或疾病首字母搜索证型"
                                                onSearch={value => this.searchSyndrome(value)}
                                                // onChange={value=>this.searchSyndrome(value)}
                                                style={{ width: 300, marginLeft: 180 }}
                                            />
                                        </div>
                                        <Table
                                            pagination={{
                                                onChange: (page) => {
                                                    console.log(page);
                                                },
                                                pageSize: 9,
                                            }}
                                            dataSource={this.state.data2}
                                            columns={this.columns2}
                                        />
                                        </Col>
                                    </Row>
                                </Modal>
                            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.Id)} okText="确认" cancelText="取消">
                                <Button>删除</Button>
                            </Popconfirm>
                        </div>
                    ) : null
            ),
        }
        ];
        this.columns2=[
            {
            title: '证型名称',
            dataIndex: 'Name',
            align: 'center',
        }, {
                title: '证型拼音',
                dataIndex: 'PinYin',
                align: 'center',
            },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: 'center',
            render: (text,record)=>(
                this.state.data2.length >= 1
                    ? (
                        <Popconfirm title="确认添加?" onConfirm={()=>this.addDisease(record)} okText="确认" cancelText="取消">
                            <Button >添加</Button>
                        </Popconfirm>
                    ):null
            ),
        }];
        this.columns1= [
            {
            title: '证型名称',
            dataIndex: 'Name',
            align: 'center',
        },{
                title: '证型拼音',
                dataIndex: 'PinYin',
                align: 'center',
            },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: 'center',
            render: (text,record)=>(
                this.state.data1.length >= 1
                    ? (
                        <Popconfirm title="确认删除?" onConfirm={()=>this.handleDeleteDisease(record)} okText="确认" cancelText="取消">
                            <Button>删除</Button>
                        </Popconfirm>
                    ):null
            ),
        }];

        this.init = this.init.bind(this);
    }

    componentDidMount(){
        // this.searchDisease()
      const { dispatch } = this.props;
      dispatch({
        type: 'disease/fetch',  // action的类型，由disease命名空间和其下面的fetch方法构成
      });                    // 派发这个action就会调用disease中的fetch函数，然后就会请求数据
      const { disease: { list } } = this.props;
      const dataSource = [...list];
      this.setState({
        dataSource:[...list]
      })
      console.log('@dataSource',dataSource)
    }

    onChange = (e) => {
        this.state.disease.Prevalent =  e.target.value;
        this.setState({disease:this.state.disease})
    };

    //初始化
    init = () => {
        this.state.disease = {
            Id:"",
            Name:"",
            PinYin:"",
            Prevalent:false
        };
        this.state.syndrome = {
            Id:"",
            Name:"",
            PinYin:""
        };
    };

    //获取疾病
    // searchDisease = key => {
    //     let _this = this;
    //     $.ajax({
    //         type:"GET",
    //         url:Api + "/disease/get/find",
    //         data:{key:key},
    //         dataType:"Json",
    //         success:function (data) {
    //             _this.setState({dataSource:data.Data})
    //         },
    //         async:true
    //     })
    // };

    //获取关联证型
    // getRelateSyndrome = Id => {
    //     let _this = this;
    //     $.ajax({
    //         type:"GET",
    //         url:Api + "/disease/get/findSyndromeById",
    //         data:{DiseaseId:Id},
    //         dataType:"Json",
    //         success:function (data) {
    //             _this.setState({data1:data.Data})
    //         },
    //         async:true
    //     })
    //
    // };

    //获取未关联证型
    // getRestSyndrome = Id => {
    //     let _this = this;
    //     $.ajax({
    //         type:"GET",
    //         url:Api + "/disease/get/findRestSyndrome",
    //         data:{DiseaseId:Id},
    //         dataType:"Json",
    //         success:function (data) {
    //             _this.setState({data2:data.Data})
    //         },
    //         async:true
    //     })
    // };

    //添加关联证型
    addDisease=(row)=>{
        let data1=this.state.data1;
        let data2=this.state.data2;
        let repeat =true;
        data1.map(data=>{
            if (data.Id ===row.Id){
                repeat =false
            }
        });
        if (!repeat){
            message.warning("Already Relate");
            return
        } else {
            data1.push(row)
        }

        data2 = data2.filter(item=>{
            return item.Id !==row.Id
        });

        this.setState({
            data1:data1,
            data2:data2,
        });
    };

    //删除关联证型
    handleDeleteDisease=(row)=>{
        let data1 = this.state.data1;
        let data2 = this.state.data2;
        data2.push(row);
        data1 = data1.filter(item => item.Id !== row.Id);
        this.setState({
            data1: data1,
            data2:data2,
        });
    };

    handRelate = () => {
        this.state.disAndSyn.SyndromeIds = [];
        this.state.data1.map( item => {
            this.state.disAndSyn.SyndromeIds.push(item.Id)
        });
        $.ajax({
            type:"POST",
            url:Api + "/disease/change/addSyndrome",
            data:{...this.state.disAndSyn},
            dataType:"Json",
            traditional:true,
            success:function (data) {
                if(data.Success){
                    message.success("Relate Success")
                }else {
                    message.warning("Relate Failed")
                }
            },
            async:true
        });
        this.handleCancel();
    };

    //搜索证型
    searchSyndrome = key => {
        let data1Text = JSON.stringify(this.state.data1);
        let set =(data)=> {
            if(data.length > 0){
               data = data.filter( item => data1Text.indexOf(item.Id) < 0 )
            }
            this.setState({data2:data})
        };
        $.ajax({
            type:"GET",
            url:Api + "/syndrome/get/find",
            data:{key:key},
            dataType:"Json",
            success:function (data) {
                if(data.Success){
                    set(data.Data)
                }
            },
            async:true
        });
    };

    //选中记录条数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };


    //显示编辑疾病Modal
    setModal1Visible = (row) => {
        let _disease = $.extend(true,{},row);
        this.setState({
            modal1Visible: true,
            disease : _disease
        });
    };

    //显示关联病症Modal
    setModal2Visible = (row) => {
        this.setState({
            modal2Visible: true,
        });
        this.state.disAndSyn.DiseaseId = row.Id;
        this.getRelateSyndrome(row.Id);
        this.getRestSyndrome(row.Id)
    };

    //显示增加疾病Modal
    setModal3Visible = () => {
        this.setState({
            modal3Visible: !this.state.modal3Visible,
        });
    };

    //确认编辑、修改、删除
    handleOk = () => {
        this.setState({
            modal1Visible: false,
        });
        let { disease } = this.state;
        let _this = this;
        $.ajax({
            type:"POST",
            url:Api+"/disease/change/update",
            data:{...disease},
            dataType:"Json",
            success: (data)=> {
                if(data.Success){
                    message.success('Update Success');
                }else {
                    message.warning('Update failed');
                }
                _this.searchDisease();
                _this.init();
            },
            async:true
        })
    };

    //取消编辑、修改、删除
    handleCancel = (e) => {
        this.setState({
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
        });
    };

    //添加疾病名称
    onChangeNameText= (e) => {
        this.state.disease.Name = e.target.value;
    };

    //添加疾病拼音
    onChangePYText= (e) => {
        this.state.disease.PinYin = e.target.value;
    };

    //删除一条疾病
    handleDelete = (key) => {
        let _this = this;
        $.ajax({
            type:"Post",
            url:Api+"/disease/delete/delete",
            data:{Id:key},
            dataType:"Json",
            success: (data)=> {
                if(data.Success){
                    message.success('Delete Success');
                }else {
                    message.warning('Delete failed');
                }
                _this.searchDisease();
                _this.init();
            },
            async:true
        })
    };

    //批量删除
    handleDeleteAll=()=>{
        const dataKey=[...this.state.selectedRowKeys];
        let _this = this;
        $.ajax({
            type:"Post",
            url:Api + "/disease/delete/batchDelete",
            data:{"Ids":dataKey},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            traditional:true,
            dataType:"Json",
            success: (data)=> {
                if(data.Success){
                    message.success('Delete Success');
                }else {
                    message.warning('Delete failed');
                }
                _this.searchDisease();
                _this.init();
            },
            async:true
        })
    };

    //添加一条疾病
    handleAdd = () => {
        let { disease } = this.state;
        let _this = this;
        _this.setModal3Visible();
        $.ajax({
            type:"POST",
            url:Api+"/disease/change/add",
            data:{...disease},
            dataType:"Json",
            success: (data)=> {
                if(data.Success){
                    message.success('Add Success');
                }else {
                    message.warning('Add failed');
                }
                _this.searchDisease();
                _this.init();
            },
            async:true
        })
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };


    render() {

        const { selectedRowKeys } = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const components = {
            body: {
                row: EditableFormRow,
                // cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className='content'>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.setModal3Visible}  style={{ marginRight: 5, marginBottom: 16 }}>
                        添加疾病
                    </Button>
                    <Modal
                        centered
                        title='添加疾病'
                        okText='添加'
                        cancelText='取消'
                        className={"form-modal1"}
                        visible={this.state.modal3Visible}
                        bodyStyle={{ padding: '32px 40px 48px' }}
                        onOk={this.handleAdd}
                        onCancel={this.handleCancel}
                    >
                        <Input placeholder="请输入疾病名称" onChange={this.onChangeNameText} className={"name-input"} />
                        <Input placeholder="请输入疾病拼音" onChange={this.onChangePYText} className={"py-input"} />
                        <div className={'is-common'}>
                            <span className={'common'}>是否是常见病症</span>
                            <RadioGroup onChange={this.onChange} value={this.state.disease.Prevalent}>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </RadioGroup>
                        </div>
                    </Modal>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDeleteAll()} okText="确认" cancelText="取消">
                        <Button
                            disabled={!hasSelected}
                        >
                            批量删除
                        </Button>
                    </Popconfirm>
                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选中 ${selectedRowKeys.length} 条记录` : ''}
                        <Search
                            placeholder="根据病名或拼音搜索疾病"
                            onSearch={value => this.searchDisease(value)}
                            style={{ width: 400, marginLeft: 900 }}
                        />
          </span>
                </div>


                <Table
                    components={components}
                    rowSelection={rowSelection}
                    rowClassName={() => 'editable-row'}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowKey = {record => record.Id}
                />
            </div>
        );
    }
}
export default Content;
