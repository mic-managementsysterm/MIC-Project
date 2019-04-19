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
  Radio
} from 'antd';
import pinyin from './convertPinYin';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Disease.less';
import Syndrome from "./Syndrome";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Search} = Input;
FormItem.className = styles["ant-form-item"];

const ClearDisease = {
  Id: "",
  Name: "",
  PinYin:"",
  Prevalent:false,
};
const setInfo = {};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


const ManaForm = Form.create()(props => {
  const { disease:{Disease, modalVisible,pageSize,current,searchKey}, form,dispatch} = props;
  setInfo.setBaseInfo = () => {
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = Disease[key] || null;
      form.setFieldsValue(obj);
    });
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Disease.Name = fieldsValue.Name;
      if(Disease.Id === ""){
        dispatch({
          type: 'disease/addDisease',
          payload: {
            Name:Disease.Name,
            PinYin:Disease.PinYin,
            Prevalent:Disease.Prevalent,
          },
          callback:()=>{
            dispatch({
              type: 'disease/queryDisease',
              payload: {
                pagesize:pageSize,
                pageindex:1,
                key:''
              },
            });
          }
        });
      }else {
        dispatch({
          type: 'disease/updateDisease',
          payload: {
            ...Disease
          },
          callback:()=>{
            dispatch({
              type: 'disease/queryDisease',
              payload: {
                pagesize:pageSize,
                pageindex:current,
                key:searchKey
              },
            });
          }
        });
      }
      dispatch({
        type: 'disease/setStates',
        payload: {
          modalVisible:false,
          Disease:ClearDisease,
        },
      });
      form.resetFields();
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:false,
        Disease:ClearDisease,
      },
    });
  };

  return (
    <Modal
      centered
      destroyOnClose
      width={640}
      title="新增疾病"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="病名">
        {form.getFieldDecorator('Name', {
          rules: [{ required: true, message: '请输入疾病名！', min: 1 }],
        })(<Input placeholder="请输入疾病名" onChange={value => {Disease.PinYin = pinyin.getCamelChars(value.target.value ).toLowerCase()}} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="拼音">
        {form.getFieldDecorator('PinYin', {
          rules: [{ message: '请输入疾病拼音！'}],
        })(<Input placeholder="请输入疾病拼音缩写" value={Disease.PinYin} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否常用">
        <RadioGroup
          onChange={value => {Disease.Prevalent = value.target.value}}
          defaultValue={Disease.Prevalent || false}
        >
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </RadioGroup>
      </FormItem>
    </Modal>
  );
});


@connect(({ disAndSyn,disease, loading }) => ({
  disAndSyn,
  loading: loading.models.disAndSyn,
  relateModalVisible: disease.relateModalVisible,
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
          <Button onClick={()=>this.deleteSyn(record)}>删除</Button>
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
          <Button onClick={()=>this.addSyn(record)} disabled={record.disabled}>添加</Button>
          :null
      ),
    }];

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addSyn = ( record ) => {
    let { disAndSyn:{relateSyn, restSyn},dispatch } = this.props;
    let relate = relateSyn.slice();
    let rest = restSyn.slice();
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
      type: 'disAndSyn/setStates',
      payload: {
        restSyn:rest,
        relateSyn:relate,
      },
    });
  };

  deleteSyn = ( record ) => {
    let {disAndSyn:{relateSyn, restSyn},dispatch} = this.props;
    let relate = relateSyn.slice();
    let rest = restSyn.slice();

    rest.map( item=>{
      item.Id === record.Id && (item.disabled =false)
    } );
    relate = relate.filter(item => item.Id !== record.Id);
    dispatch({
      type: 'disAndSyn/setStates',
      payload: {
        restSyn:rest,
        relateSyn:relate,
      },
    });
  };

  searchSyndrome = (value) => {
    const { dispatch }  = this.props;
    dispatch({
      type: 'disAndSyn/querySyn',
      payload: {
        key:value,
        pagesize:8,
        pageindex:1
      },
    });
  };

  handleRelate = () => {
    const {  disAndSyn:{diseaseId,relateSyn},dispatch } = this.props;
    let synIds = [];
    relateSyn.map(item => {
      synIds.push(item.Id)
    });
    dispatch({
      type: 'disAndSyn/updateRelate',
      payload: {
        DiseaseId:diseaseId,
        SyndromeIds:synIds,
      },
    });
    this.handleCancel()
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'disAndSyn/setStates',
      payload: {
        diseaseId:"",
        relateSyn:[],
        restSyn:[]
      },
    });
    dispatch({
      type: 'disease/setStates',
      payload: {
        relateModalVisible:false,
      },
    });
  };

  onRestChange = (pagination, filtersArg, sorter) => {
    const { dispatch,disAndSyn:{restKey} } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'disAndSyn/querySyn',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:restKey
      },
    });
  };

  render() {
    const { relateModalVisible, disAndSyn:{relateSyn,restSyn,restPagination} } = this.props;
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
              dataSource={relateSyn}
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
              dataSource={restSyn}
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
@connect(({ disease,disAndSyn, loading }) => ({
  disease,
  disAndSyn,
  loading: loading.models.disease,
}))
@Form.create()
class Disease extends PureComponent {
  columns = [
    {
      title: '疾病名称',
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
        const {disease:{dataSource}} = this.props;
        return dataSource && dataSource.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleRelateVisible(true,record)} className={styles.btn}>疾病关联</Button>
              <Button onClick={() => this.handleModalVisible(true,record)} className={styles.btn}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount(){
    const { dispatch,disease:{current,pageSize,searchKey} } = this.props;
    dispatch({
      type: 'disease/queryDisease',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        key:searchKey
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,disease:{formValues,searchKey} } = this.props;
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
      type: 'disease/queryDisease',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:searchKey
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch,disease:{pageSize} } = this.props;
    form.resetFields();
    dispatch({
      type: 'disease/setStates',
      payload: {
        formValues:{},
        current:1,
        pageSize:pageSize,
        searchKey:''
      },
    });
    dispatch({
      type: 'disease/queryDisease',
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
      type: 'disease/setStates',
      payload: {
        selectedRows:rows
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form,disease:{pageSize} } = this.props;
    form.validateFields((err, fieldsValue) => {
      const { key } = fieldsValue;
      dispatch({
        type: 'disease/setStates',
        payload: {
          searchKey:key,
        },
      });
      dispatch({
        type: 'disease/queryDisease',
        payload: {
          key,
          pagesize:pageSize,
          pageindex:1,
        },
      });
    });
  };

  handleModalVisible = async(flag, record) => {
    let newRecord = Object.assign({},record);
    const { dispatch } = this.props;
    await dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:!!flag,
        Disease:record ? newRecord:ClearDisease,
      },
    });
    if(flag && record){
      setInfo.setBaseInfo();
    }
  };

  handleDelete = () => {
    const { dispatch,disease:{selectedRows,pageSize,current,searchKey} } = this.props;
    let Ids = [];
    selectedRows.map(item => {
      Ids.push(item.Id)
    });
    dispatch({
      type: 'disease/removeDisease',
      payload: {
        Ids:Ids,
      },
      callback:()=>{
        dispatch({
          type: 'disease/setStates',
          payload: {
            selectedRows:[],
          },
        });
        dispatch({
          type: 'disease/queryDisease',
          payload: {
            pagesize:pageSize,
            pageindex:current,
            key:searchKey
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
      type: 'disease/setStates',
      payload: {
        relateModalVisible:true
      },
    });

    dispatch({
      type: 'disAndSyn/changeIdEff',
      payload: record.Id,
      callback:()=>{
        dispatch({
          type: 'disAndSyn/queryRelate',
          payload:{
            DiseaseId:record.Id,
            pagesize:8,
            pageindex:1
          }
        });
        dispatch({
          type: 'disAndSyn/querySyn',
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
    const {form: { getFieldDecorator },disease:{selectedRows}} = this.props;
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
              <Input placeholder="请输入疾病名或拼音" style={{ width: 400,marginRight:20 }} />
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
    const { disease: {selectedRows,dataSource,pageSize,current,total }, loading, } = this.props;
    const data ={
      list: dataSource,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
    };
    return (
      <PageHeaderWrapper title="疾病关联">
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

export default Disease;
