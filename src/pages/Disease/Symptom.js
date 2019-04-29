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
  Radio,
  Select
} from 'antd';
import pinyin from './convertPinYin';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Symptom.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const setInfo={};

FormItem.className = styles["ant-form-item"];
const ClearSymptom = {
  Id: "",
  Name: "",
  PinYin:"",
  Prevalent:false,
  SymptomTypeName:'',
  Type:''
};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ symptom,loading }) => ({
  symptom,
  loading: loading.models.symptom,
}))
@Form.create()
class ManaForm extends PureComponent{
  constructor(props){
    super(props);
    this.setBaseInfo = this.setBaseInfo.bind(this)
  }

  componentWillMount(){
    setInfo.setBaseInfo = this.setBaseInfo;
  }

  setBaseInfo = () => {
    const { symptom:{Symptom}, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = Symptom[key] || null;
      form.setFieldsValue(obj);
    });
  };

  okHandle = () => {
    const {dispatch,form,symptom:{Symptom,pageSize,searchKey,Prevalent,current}} = this.props;
    if(!Symptom.SymptomTypeName){
      message.error('症状类型尚未选择');
      return
    }
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Symptom.Name = fieldsValue.Name;
      Symptom.PinYin = fieldsValue.PinYin;
      if(Symptom.Id === ""){
        dispatch({
          type: 'symptom/addSymptom',
          payload: {
            Name:Symptom.Name,
            PinYin:Symptom.PinYin,
            Prevalent:Symptom.Prevalent,
            SymptomTypeName:Symptom.SymptomTypeName,
            Type:Symptom.Type
          },
          callback:()=>{
            this.handleCancel();
            dispatch({
              type: 'symptom/querySymptom',
              payload: {
                pageindex:1,
                pagesize:pageSize,
                Key:'',
                Prevalent
              },
            });
          }
        });
      }else {
        dispatch({
          type: 'symptom/updateSymptom',
          payload: {
            ...Symptom
          },
          callback:()=>{
            this.handleCancel();
            dispatch({
              type: 'symptom/querySymptom',
              payload: {
                pagesize:pageSize,
                pageindex:current,
                Key:searchKey,
                Prevalent
              },
            });
          }
        });
      }
    });
  };

  handleCancel = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'symptom/set',
      payload: {
        modalVisible:false,
        Symptom:ClearSymptom,
      },
    });
  };

  onChangeText=(value)=>{
    const {dispatch,symptom:{Symptom}}=this.props
    Symptom.PinYin = pinyin.getCamelChars(value.target.value ).toLowerCase()
    dispatch({
      type: 'symptom/set',
      payload: {
        Symptom: Symptom,
      },
    })
    setInfo.setBaseInfo();
  }

  render(){
    const {form,symptom:{Symptom,modalVisible}} = this.props;
    return (
      <Modal
        centered
        destroyOnClose
        width={640}
        title={Symptom.Id === "" ? "新增症状" : "编辑症状"}
        visible={modalVisible}
        onOk={()=>this.okHandle()}
        onCancel={() => this.handleCancel()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="症状名">
          {form.getFieldDecorator('Name', {
            rules: [{ required: true, message: '请输入症状名！', min: 1 }],
          })(<Input placeholder="请输入症状名" onChange={value => this.onChangeText(value)} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="拼音">
          {form.getFieldDecorator('PinYin', {
            rules: [{ required: true, message: '请输入症状首字母！'}],
          })(<Input placeholder="请输入症状首字母" value={Symptom.PinYin} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否常用">
          <RadioGroup
            onChange={value => {Symptom.Prevalent = value.target.value}}
            defaultValue={Symptom.Prevalent || false}
          >
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </RadioGroup>
        </FormItem>
      </Modal>
    );
  }
}




/* eslint react/no-multi-comp:0 */
@connect(({ symptom,loading }) => ({
  symptom,
  loading: loading.models.symptom,
}))
@Form.create()
class Symptom extends PureComponent {
  columns = [
    {
      title: '症状名称',
      dataIndex: 'Name',
      width: '30%',
      align: 'center'
    },
    {
      title: '拼音',
      dataIndex: 'PinYin',
      width: '20%',
      align: 'center'
    },
    {
      title: '是否常见',
      width: '20%',
      align: 'center',
      render: (text, record) => {
        const {symptom:{dataSource}} = this.props;
        return dataSource && dataSource.length >= 1
          ? (
            <div key={record.Id}>{record.Prevalent ? '是' : '否'}</div>
          ) : null
      },
    },
    {
      title: '操作',
      width: '30%',
      align: 'center',
      render: (text, record) => {
        const {symptom:{dataSource}} = this.props;
        return dataSource && dataSource.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleModalVisible(true,record)} className={styles.btn}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount(){
    const { dispatch,symptom:{current,pageSize,searchKey,Prevalent} } = this.props;
    dispatch({
      type: 'symptom/querySymptom',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        Key:searchKey,
        Prevalent
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,symptom:{formValues,searchKey,Prevalent} } = this.props;
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
      type: 'symptom/querySymptom',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        Key:searchKey,
        Prevalent
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch,symptom:{pageSize} } = this.props;
    form.resetFields();
    dispatch({
      type: 'symptom/setStates',
      payload: {
        formValues:{},
        current:1,
        pageSize:pageSize,
        searchKey:''
      },
    });
    dispatch({
      type: 'symptom/querySymptom',
      payload: {
        pagesize:pageSize,
        pageindex:1,
        Key:'',
        Prevalent:2
      },
    });
  };

  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'symptom/setStates',
      payload: {
        selectedRows:rows
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form,symptom:{pageSize,Prevalent} } = this.props;
    form.validateFields((err, fieldsValue) => {
      const { key } = fieldsValue;
      dispatch({
        type: 'symptom/setStates',
        payload: {
          searchKey:key,
        },
      });
      dispatch({
        type: 'symptom/querySymptom',
        payload: {
          Key:key,
          Prevalent,
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
      type: 'symptom/setStates',
      payload: {
        modalVisible:!!flag,
        Symptom:record ? newRecord:ClearSymptom,
      },
    });
    if(flag && record){
      setInfo.setBaseInfo();
    }
  };

  handleDelete = () => {
    const { dispatch,symptom:{selectedRows,pageSize,searchKey,Prevalent,current} } = this.props;
    let Ids = [];
    selectedRows.map(item => {
      Ids.push(item.Id)
    });
    dispatch({
      type: 'symptom/removeSymptom',
      payload: {
        Ids:Ids,
      },
      callback:()=>{
        dispatch({
          type: 'symptom/setStates',
          payload: {
            selectedRows:[],
          },
        });
        dispatch({
          type: 'symptom/querySymptom',
          payload: {
            pagesize:pageSize,
            pageindex:current,
            Key:searchKey,
            Prevalent
          },
        });
      }
    });
    message.success('删除成功');
  };

  renderSimpleForm() {
    const {dispatch,form: { getFieldDecorator },symptom:{selectedRows,Prevalent}} = this.props;
    const handlePrevalent = (v) => {
      dispatch({
        type: 'symptom/set',
        payload: {
          Prevalent:v
        },
      });
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" justify="space-between">
          <Col md={8} lg={8} xl={8}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} style={{ marginRight: 5 }}>
              新建
            </Button>
            {selectedRows && selectedRows.length > 0 && (
              <span>
                <Button onClick={() => this.handleDelete()}>批量删除</Button>
              </span>
            )}
          </Col>
          <span className={styles.submitButtons} style={{alignItems:"flex-end",justifyContent:'flex-end'}}>
            <Select value={Prevalent} style={{ width: 120, marginRight: 5 }} onChange={v =>handlePrevalent(v)}>
              <Option value={2}>全部症状</Option>
              <Option value={1}>常见症状</Option>
              <Option value={0}>非常见症状</Option>
            </Select>
            {getFieldDecorator('key')(
              <Input placeholder="请输入症状名或拼音" style={{ width: 400,marginRight:20 }} />
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
    const { symptom: {selectedRows,dataSource,pageSize,current,total }, loading, } = this.props;
    const data ={
      list: dataSource,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
    };
    return (
      <PageHeaderWrapper title="症状管理">
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
          <ManaForm />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Symptom;
