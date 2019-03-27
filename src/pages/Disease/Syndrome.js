import React, { PureComponent } from 'react';
import { connect } from 'dva';
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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Syndrome.less';

const FormItem = Form.Item;
const {Search} = Input;
FormItem.className = styles["ant-form-item"];

const ClearSyndrome = {
  Id: "",
  Name: "",
  PinYin:"",
};
const setInfo={};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


const ManaForm = Form.create()(props => {
  const { syndrome:{Syndrome, modalVisible,pageSize,current,searchKey}, form,dispatch} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Syndrome.Name = fieldsValue.Name;
      Syndrome.PinYin = fieldsValue.PinYin;
      if(Syndrome.Id === ""){
        dispatch({
          type: 'syndrome/addSyndrome',
          payload: {
            Name:Syndrome.Name,
            PinYin:Syndrome.PinYin,
          },
          callback:()=>{
            dispatch({
              type: 'syndrome/querySyndrome',
              payload: {
                key:'',
                pagesize:pageSize,
                pageindex:1,
              },
            });
          }
        });
      }else {
        dispatch({
          type: 'syndrome/updateSyndrome',
          payload: {
            ...Syndrome
          },
          callback:()=>{
            dispatch({
              type: 'syndrome/querySyndrome',
              payload: {
                key:searchKey,
                pagesize:pageSize,
                pageindex:current,
              },
            });
          }
        });
      }
      dispatch({
        type: 'syndrome/setStates',
        payload: {
          modalVisible:false,
          Syndrome:ClearSyndrome,
        },
      });
      form.resetFields();
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'syndrome/setStates',
      payload: {
        modalVisible:false,
        Syndrome:ClearSyndrome,
      },
    });
  };

  setInfo.setBaseInfo = () => {
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = Syndrome[key] || null;
      form.setFieldsValue(obj);
    });
  };

  return (
    <Modal
      centered
      destroyOnClose
      width={640}
      title="疾病管理"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="证型名">
        {form.getFieldDecorator('Name', {
          rules: [{ required: true, message: '请输入证型名！', min: 1 }],
        })(<Input placeholder="请输入证型名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="证型拼音">
        {form.getFieldDecorator('PinYin', {
          rules: [{ message: '请输入证型拼音缩写！'}],
        })(<Input placeholder="请输入证型拼音缩写" />)}
      </FormItem>
    </Modal>
  );
});


@connect(({ synAndSym,syndrome, loading }) => ({
  synAndSym,
  loading: loading.models.synAndSym,
  relateModalVisible: syndrome.relateModalVisible,
}))
@Form.create()
class RelateForm extends PureComponent {
  columns1= [
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
        record ?
          <Button onClick={()=>this.deleteSym(record)}>删除</Button>
          :null
      ),
    }];

  columns2=[
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
        record ?
          <Button onClick={()=>this.addSym(record)} disabled={record.disabled}>添加</Button>
          :null
      ),
    }];

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addSym = ( record ) => {
    let { synAndSym:{relateSym, restSym},dispatch } = this.props;
    let relate = relateSym.slice();
    let rest = restSym.slice();
    let repeat =false;
    relate.map(data =>{
      if (data.Id ===record.Id){
        repeat =true
      }
    });
    if (!repeat){
      relate.push(record)
    } else {
      message.warning("Already Relate");
      return
    }
    rest.map(item=>{
      item.Id ===record.Id && (item.disabled = true)
    });
    dispatch({
      type: 'synAndSym/setStates',
      payload: {
        restSym:rest,
        relateSym:relate,
      },
    });
  };

  deleteSym = ( record ) => {
    let {synAndSym:{relateSym, restSym},dispatch} = this.props;
    let relate = relateSym.slice();
    let rest = restSym.slice();

    rest.map( item=>{
      item.Id === record.Id && (item.disabled =false)
    } );
    relate = relate.filter(item => item.Id !== record.Id);
    dispatch({
      type: 'synAndSym/setStates',
      payload: {
        restSym:rest,
        relateSym:relate,
      },
    });
  };

  searchSyndrome = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'synAndSym/querySym',
      payload: {
        key:value,
        pagesize:8,
        pageindex:1
      },
    });
  };

  handleRelate = () => {
    const {  synAndSym:{syndromeId,relateSym},dispatch } = this.props;
    let symIds = [];
    relateSym.map(item => {
      symIds.push(item.Id)
    });
    dispatch({
      type: 'synAndSym/updateRelate',
      payload: {
        SyndromeId:syndromeId,
        SymptomIds:symIds,
      },
    });
    this.handleCancel()
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'synAndSym/setStates',
      payload: {
        syndromeId:"",
        relateSym:[],
        restSym:[]
      },
    });
    dispatch({
      type: 'syndrome/setStates',
      payload: {
        relateModalVisible:false,
      },
    });
  };

  onRestChange = (pagination, filtersArg, sorter) => {
    const { dispatch,synAndSym:{restKey} } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'synAndSym/querySym',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:restKey
      },
    });
  };

  render() {
    const { relateModalVisible, synAndSym:{relateSym,restSym,restPagination} } = this.props;
    return (
      <Modal
        centered
        width={1200}
        title='关联证型'
        okText='完成'
        cancelText='取消'
        visible={relateModalVisible}
        destroyOnClose
        onOk={() => this.handleRelate()}
        onCancel={()=> this.handleCancel()}
        className={styles.formModal}
        maskStyle={{backgroundColor:'rgba(0,0,0,.3)'}}
      >
        <Row className="breadcrumb">
          <Col span={12} className="breadcrumb-title">
            <div className={styles["syndrome-title"]}>已关联证型</div>
            <Table
              pagination={{pageSize:8}}
              dataSource={relateSym}
              columns={this.columns1}
              rowKey={item => item.Id}
            />
          </Col>
          <Col span={12} className={styles.breadcrumbTitle}>
            <div className={styles["syndrome-title"]}>
              <span>未关联证型</span>
              <Search
                placeholder="根据疾病名称或疾病首字母搜索证型"
                onSearch={value => this.searchSyndrome(value)}
                style={{ width: 300, marginLeft: 180 }}
              />
            </div>
            <Table
              pagination={restPagination}
              dataSource={restSym}
              columns={this.columns2}
              rowKey={item => item.Id}
              onChange={(p,f,s)=>this.onRestChange(p,f,s)}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}



/* eslint react/no-multi-comp:0 */
@connect(({ syndrome,synAndSym, loading }) => ({
  syndrome,
  synAndSym,
  loading: loading.models.syndrome,
}))
@Form.create()
class Syndrome extends PureComponent {
  columns = [
    {
      title: '证型名称',
      dataIndex: 'Name',
      width: '40%',
    },
    {
      title: '拼音',
      dataIndex: 'PinYin',
      width: '30%',
    },
    {
      title: '操作',
      width: '30%',
      render: (text, record) => {
        const {syndrome:{dataSource}} = this.props;
        return dataSource && dataSource.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleRelateVisible(true,record)} className={styles.btn}>证型关联</Button>
              <Button onClick={() => this.handleModalVisible(true,record)} className={styles.btn}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount(){
    const { dispatch,syndrome:{current,pageSize,searchKey} } = this.props;
    dispatch({
      type: 'syndrome/querySyndrome',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        key:searchKey
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,syndrome:{formValues,searchKey} } = this.props;
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
      type: 'syndrome/querySyndrome',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:searchKey
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch,syndrome:{pageSize} } = this.props;
    form.resetFields();
    dispatch({
      type: 'syndrome/setStates',
      payload: {
        formValues:{},
        current:1,
        pageSize:pageSize,
        searchKey:''
      },
    });
    dispatch({
      type: 'syndrome/querySyndrome',
      payload: {
        pagesize:pageSize,
        pageindex:1,
        key:''
      },
    });
  };

  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'syndrome/setStates',
      payload: {
        selectedRows:rows
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form,syndrome:{pageSize} } = this.props;
    form.validateFields((err, fieldsValue) => {
      const { key } = fieldsValue;
      dispatch({
        type: 'syndrome/setStates',
        payload: {
          searchKey:key,
        },
      });
      dispatch({
        type: 'syndrome/querySyndrome',
        payload: {
          key,
          pagesize:pageSize,
          pageindex:1,
        },
      });
    });
  };

  handleModalVisible = async(flag, record) => {
    let newRecord = Object.assign({},record)
    const { dispatch } = this.props;
    await dispatch({
      type: 'syndrome/setStates',
      payload: {
        modalVisible:!!flag,
        Syndrome:record ? newRecord:ClearSyndrome,
      },
    });
    if(flag && record){
      setInfo.setBaseInfo();
    }
  };

  handleDelete = () => {
    const { dispatch,syndrome:{selectedRows,pageSize,current,searchKey} } = this.props;
    let Ids = [];
    selectedRows.map(item => {
      Ids.push(item.Id)
    });
    dispatch({
      type: 'syndrome/removeSyndrome',
      payload: {
        Ids:Ids,
      },
      callback:()=>{
        dispatch({
          type: 'syndrome/setStates',
          payload: {
            selectedRows:[],
          },
        });
        dispatch({
          type: 'syndrome/querySyndrome',
          payload: {
            key:searchKey,
            pagesize:pageSize,
            pageindex:current,
          },
        });
      }
    });
    message.success('删除成功');
  };


  // relate
  handleRelateVisible = (flag, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'syndrome/setStates',
      payload: {
        relateModalVisible:true
      },
    });

    dispatch({
      type: 'synAndSym/changeIdEff',
      payload: record.Id,
      callback:()=>{
        dispatch({
          type: 'synAndSym/queryRelate',
          payload:{
            SyndromeId:record.Id,
            pagesize:8,
            pageindex:1
          }
        });
        dispatch({
          type: 'synAndSym/querySym',
          payload:{
            key:'',
            pagesize:8,
            pageindex:1,
          }
        });
      }
    });
  };

  renderSimpleForm() {
    const {form: { getFieldDecorator },syndrome:{selectedRows}} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" justify="space-between">
          <Col md={8} lg={8} xl={8}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            {selectedRows && selectedRows.length > 0 && (
              <span>
                <Button onClick={() => this.handleDelete()}>批量删除</Button>
              </span>
            )}
          </Col>
          <span className={styles.submitButtons} style={{alignItems:"flex-end",justifyContent:'flex-end'}}>
            {getFieldDecorator('key')(
              <Input placeholder="请输入证型名或拼音缩写" style={{ width: 400,marginRight:20 }} />
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
    const { syndrome: {selectedRows,dataSource,pageSize,current,total }, loading, } = this.props;
    const data ={
      list: dataSource,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
    };
    return (
      <PageHeaderWrapper title="证型管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <StandardTable
              rowKey='Id'
              selectedRows={selectedRows || []}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
          <ManaForm {...this.props} />
          <RelateForm {...this.props} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Syndrome;
