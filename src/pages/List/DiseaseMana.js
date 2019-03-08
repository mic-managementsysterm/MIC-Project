import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Modal,
  message,
  Table,
  Popconfirm
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './DiseaseMana.less';

const FormItem = Form.Item;
const {Search} = Input;
FormItem.className = styles["ant-form-item"];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { DiseaseIn, modalVisible, form, handleAdd, handleUpdate, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      DiseaseIn.Name = fieldsValue.Name;
      DiseaseIn.PinYin = fieldsValue.PinYin;
      if(DiseaseIn.Id){
        handleUpdate(DiseaseIn);
      }else {
        handleAdd(DiseaseIn);
      }

      form.resetFields();
    });
  };
  return (
    <Modal
      destroyOnClose
      width={640}
      title="新增疾病"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="病名">
        {form.getFieldDecorator('Name', {
          rules: [{ required: true, message: '请输入疾病名！', min: 1 }],
        })(<Input placeholder="请输入疾病名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="拼音">
        {form.getFieldDecorator('PinYin', {
          rules: [{ message: '请输入疾病拼音！'}],
        })(<Input placeholder="请输入疾病拼音缩写" />)}
      </FormItem>
    </Modal>
  );
});

const ClearDisease = {
  Id: "",
  Name: "",
  PinYin:"",
  CreatedAt: ""
};

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
  };

  constructor(props){
    super(props);
    this.state = {
      Disease:this.props.DiseaseIn,
      datal:[],
      data2:[]
    };
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
              <Popconfirm title="确认删除?" onConfirm={()=>this.deleteSyn(record)} okText="确认" cancelText="取消">
                <Button>删除</Button>
              </Popconfirm>
            ):null
        ),
      }];
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
              <Popconfirm title="确认添加?" onConfirm={()=>this.addSyn(record)} okText="确认" cancelText="取消">
                <Button>添加</Button>
              </Popconfirm>
            ):null
        ),
      }];
    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }


  addSyn = ( record ) => {
    let { data1, data2 } = this.state;
    let repeat =false;
    data1.map(data =>{
      if (data.Id ===record.Id){
        repeat =true
      }
    });
    if (!repeat){
      data1.push(record)
    } else {
      message.warning("Already Relate");
      return
    }

    data2 = data2.filter(item=>{
      return item.Id !==record.Id
    });

    this.setState({
      data1:data1,
      data2:data2,
    });
  };

  deleteSyn = ( record ) => {
    let {data1,data2} = this.state;
    data2.push( record );
    data1 = data1.filter(item => item.Id !== record.Id);
    this.setState({
      data1: data1,
      data2:data2,
    });
  };

  searchSyndrome = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchDisease',
      payload: {
        searchKey:value,
      },
    },(res) => {
      console.log("res",res)
      this.setState({data2:res.list})
    });
  };

  render() {
    const { ModalVisible, handleManaVisible,handRelate } = this.props;
    const { datal, data2, Disease} = this.state;
    return (
      <Modal
        centered
        width={1200}
        title='关联证型'
        okText='完成'
        cancelText='取消'
        visible={ModalVisible}
        destroyOnClose
        onOk={() => handRelate(Disease)}
        onCancel={()=> handleManaVisible(false)}
        className="form-modal"
        maskStyle={{backgroundColor:'rgba(0,0,0,.3)'}}
      >
        <Row className="breadcrumb">
          <Col span={12} className="breadcrumb-title">
            <div className="syndrome-title">已关联证型</div>
            <Table
              dataSource={datal}
              columns={this.columns1}
            />
          </Col>
          <Col span={12} className="breadcrumb-title">
            <div className="syndrome-title">
              <span>未关联证型</span>
              <Search
                placeholder="根据疾病名称或疾病首字母搜索证型"
                onSearch={value => this.searchSyndrome(value)}
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
              dataSource={data2}
              columns={this.columns2}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class DiseaseMana extends PureComponent {
  state = {
    modalVisible: false,
    manaVisible: false,
    selectedRows: [],
    formValues: {},
    Disease : {
      Id: "",
      Name: "",
      PinYin:"",
    },
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'Name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '拼音',
      dataIndex: 'PinYin',
    },
    {
      title: '操作',
      render: (text, record) => {
        const {rule:{data}} = this.props;
        return data.list.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleManaVisible(true,record)} className="btn">疾病关联</Button>
              <Button onClick={() => this.handleModalVisible(true,record)} className="btn">编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchDisease',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetchDisease',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { key } = fieldsValue;
      dispatch({
        type: 'rule/fetchDisease',
        payload: {
          searchKey:key
        },
      });
    });
  };

  handleModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
      Disease: record || ClearDisease,
    });
  };



  handleAdd = disease => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/addDisease',
      payload: {
        ...disease,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = (record) => {
    const { dispatch } = this.props;
    const { Disease } = this.state;
    dispatch({
      type: 'rule/updateDisease',
      payload: {
        query: Disease.Id,
        body: {
          ...record,
          Id:Disease.Id
        },
      },
    });

    message.success('配置成功');
    this.handleModalVisible(false);
  };

  handleDelete = () => {
    const { selectedRows } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/removeDisease',
      payload: {
        rows:selectedRows,
      },
    });

    message.success('删除成功');

    this.setState({selectedRows:[]});
  };


  // relate
  handleManaVisible = (flag, record) => {
    const { Disease } = this.state;
    this.setState({
      manaVisible: !!flag,
      Disease: record || Disease,
    });
  };

  handRelate =() => {};


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" justify="space-between">
          <Col md={8} lg={8} xl={8}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Button onClick={() => this.handleDelete()}>批量删除</Button>
              </span>
            )}
          </Col>
          <span className={styles.submitButtons} style={{alignItems:"flex-end",justifyContent:'flex-end'}}>
            {getFieldDecorator('key')(
              <Input placeholder="请输入姓名或身份证号码" style={{ width: 400,marginRight:20 }} />
            )}
            <Button type="primary" htmlType="submit">
                查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
            </Button>
          </span>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { Disease, selectedRows, modalVisible, manaVisible } = this.state;

    const parentMethods = {
      DiseaseIn:Disease,
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleManaVisible: this.handleManaVisible,
      handRelate: this.handRelate,
      DiseaseIn:Disease,
    };
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <UpdateForm
          {...updateMethods}
          ModalVisible={manaVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default DiseaseMana;
