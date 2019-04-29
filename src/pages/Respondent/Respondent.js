import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Modal,
  message,
  Radio, Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Respondent.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
FormItem.className = styles["ant-form-item"];
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const clearRespondent = {
  Id: "",
  Name: "",
  Gender: 0,
  Born: "",
  Education: "",
  MaritalStatus: 0,
  DwellingStatus: 0,
  Hobby: "",
  Phone: "",
  IDCard: "",
  Address: "",
  RecordUserId: "",
  CreatedAt: ""
};
const setInfo = {};

const ManaForm = Form.create()(props => {
  const { respondent: { Respondent,modalVisible,pageSize,current,searchKey }, form, dispatch,currentUser } = props;

  setInfo.setBaseInfo =() =>{
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = Respondent[key] || null;
      form.setFieldsValue(obj);
    });
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if(!Respondent.Born){
        message.error('请选择出生日期！')
        return
      }
      Respondent.Name = fieldsValue.Name;
      Respondent.Education = fieldsValue.Education;
      Respondent.Hobby = fieldsValue.Hobby;
      Respondent.Phone = fieldsValue.Phone;
      Respondent.IDCard = fieldsValue.IDCard;
      Respondent.Address = fieldsValue.Address;
      if(Respondent.RecordUserId === ''){
        Respondent.RecordUserId = currentUser.Id;
      }
      dispatch({
        type: 'respondent/addOrUpRespondent',
        payload: {
          ...Respondent,
        },
        callback:(res)=>{
          if(res.Success){
            dispatch({
              type: 'respondent/queryRespondent',
              payload:{
                pagesize:pageSize,
                pageindex:current,
                key:searchKey
              }
            });
            dispatch({
              type: 'respondent/setStates',
              payload: {
                Respondent:clearRespondent,
                modalVisible:false
              },
            });
            form.resetFields();
          } else {
            message.error(res.Message || res.InnerMessage)
          }
        }
      });
    });
  };

  const handleCancel =() =>{
    form.resetFields();
    dispatch({
      type: 'respondent/setStates',
      payload: {
        Respondent:clearRespondent,
        modalVisible:false
      },
    });
  };

  const bornChange = (value) =>{
    if(value){
      Respondent.Born = value.format("YYYY-MM-DD")
    }else {
      Respondent.Born = ''
    }
  };

  return (
    <Modal
      destroyOnClose
      width={640}
      title="新增患者"
      visible={modalVisible}
      onOk={() => okHandle()}
      onCancel={() => handleCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('Name', {
          rules: [{ required: true, message: '请输入姓名！', min: 1 }],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性别">
        <RadioGroup
          onChange={value => {Respondent.Gender = value.target.value}}
          defaultValue={Respondent.Gender|| 0}
        >
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="出生日期">
        <DatePicker
          defaultValue={Respondent.Born?moment(Respondent.Born,'YYYY-MM-DD'):moment(new Date())}
          placeholder="请选择患者出生日期"
          onChange={value => bornChange(value)}
        />
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="教育程度">
        {form.getFieldDecorator('Education', {
          rules: [{ message: '请输入教育程度'}],
        })(<Input placeholder="请输入教育程度" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="婚姻状况">
        <Select
          defaultValue={Respondent.MaritalStatus || 0}
          style={{ width: 120, paddingRight:  20, paddingBottom: 10}}
          placeholder="请选择患者婚姻状况"
          onChange={value => {Respondent.MaritalStatus = value}}
        >
          <Option value={0}>未婚</Option>
          <Option value={1}>已婚</Option>
        </Select>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="居住状况">
        <Select
          defaultValue={Respondent.DwellingStatus || 0}
          style={{ width: 120,paddingBottom: 10}}
          placeholder="请选择患者居住状况"
          onChange={value => {Respondent.DwellingStatus = value}}
        >
          <Option value={0}>独自居住</Option>
          <Option value={1}>夫妻同居</Option>
          <Option value={2}>子女同居</Option>
        </Select>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="爱好">
        {form.getFieldDecorator('Hobby', {
          rules: [{ message: '请输入爱好' }],
        })(<Input placeholder="请输入爱好" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号码">
        {form.getFieldDecorator('Phone', {
          rules: [{  message: '请输入手机号码！', min: 11 }],
        })(<Input placeholder="请输入手机号码" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="身份证号码">
        {form.getFieldDecorator('IDCard', {
          rules: [{ required: true, message: '请输入身份证号码！', min: 15 }],
        })(<Input placeholder="请输入身份证号码" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="居住地址">
        {form.getFieldDecorator('Address', {
          rules: [{  message: '请输入居住地址！' }],
        })(<Input placeholder="请输入居住地址" />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ respondent, loading,user,routerParams }) => ({
  respondent,
  routerParams,
  currentUser:user.currentUser,
  loading: loading.models.rule,
}))
@Form.create()
class Respondent extends PureComponent {

  columns = [
    {
      title: '姓名',
      dataIndex: 'Name',
      width: '10%',
      align: 'center',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'Gender',
      width: '10%',
      align: 'center',
      render: (text,record) =>{
        return record.Gender === 0 ? '男':'女'
      }
    },
    {
      title: '出生日期',
      dataIndex: 'Born',
      width: '20%',
      align: 'center',
    },
    {
      title: '居住地址',
      dataIndex: 'Address',
      width: '20%',
      align: 'center',
    },
    {
      title: '上次操作时间',
      dataIndex: 'UpdatedAt',
      width: '20%',
      align: 'center',
    },
    {
      title: '操作',
      width: '20%',
      align: 'center',
      render: (text, record) => {
        return record
          ? (
            <div key={record.Id}>
              <Button className={styles.btn} onClick={() => this.handlePush(record)}>查看</Button>
              <Button onClick={() => this.handleModalVisible(true,record)}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount() {
    const { dispatch,respondent:{pageSize,current,searchKey} } = this.props;
    dispatch({
      type: 'respondent/queryRespondent',
      payload:{
        pagesize:pageSize,
        pageindex:current,
        key:searchKey,
      }
    });
  }

  handlePush = (record) => {
    const { dispatch} = this.props;
    dispatch({
      type: 'routerParams/set',
      payload:{
        Respondent:record,
      },
    });
    router.push(router.push(`/respondent/respondent-list/respondent-record`))
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, formValues,respondent:{searchKey} } = this.props;

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
      type: 'respondent/queryRespondent',
      payload:{
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:searchKey,
      },
    });
  };

  previewItem = () => {
    // router.push(`/profile/basic/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch,respondent:{pageSize} } = this.props;
    form.resetFields();
    dispatch({
      type: 'respondent/setStates',
      payload: {formValues:{}},
    });
    dispatch({
      type: 'respondent/queryRespondent',
      payload:{
        pagesize:pageSize,
        pageindex:1,
        key:'',
      },
    });
  };

  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'respondent/setStates',
      payload: {selectedRows:rows},
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form,respondent:{pageSize} } = this.props;
    form.validateFields((err, fieldsValue) => {
      const { key } = fieldsValue;
      dispatch({
        type: 'respondent/queryRespondent',
        payload:{
          pagesize:pageSize,
          pageindex:1,
          key:key,
        }
      });
    });
  };

  handleModalVisible = async(flag,record) => {
    const newObj =Object.assign({},record)
    const { dispatch } = this.props;
    if(!record){
      clearRespondent.Born = moment(new Date()).format('YYYY-MM-DD')
    }
    await dispatch({
      type: 'respondent/setStates',
      payload: {
        modalVisible:!!flag,
        Respondent:record?newObj:clearRespondent
      },
    });
    if(flag && record){
      setInfo.setBaseInfo();
    }

  };

  handleDelete = () => {
    const { dispatch, respondent: { selectedRows,pageSize,current,searchKey }, } = this.props;
    let Ids =[];
    selectedRows.map(item => {
      Ids.push(item.Id)
    });
    dispatch({
      type: 'respondent/removeRespondent',
      payload: {
        Ids:Ids,
      },
      callback:() => {
        dispatch({
          type: 'respondent/queryRespondent',
          payload:{
            pagesize:pageSize,
            pageindex:current,
            key:searchKey,
          },
        })
      }
    });

    message.success('删除成功');

    dispatch({
      type: 'respondent/setStates',
      payload: {
        selectedRows:[],
      },
    });
  };

  renderSimpleForm() {
    const {form: { getFieldDecorator },respondent: { selectedRows }} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" justify="space-between">
          <Col md={8} lg={8} xl={8}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} style={{ marginRight: 5 }}>
              新建
            </Button>
            {selectedRows && selectedRows.length >=1 && (
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
  }

  render() {
    const { respondent: { selectedRows,dataSource,pageSize,current,total }, loading, } = this.props;
    const data ={
      list: dataSource,
      pagination: {
        total: total||0,
        pageSize:pageSize,
        current:current
      },
    };
    return (
      <PageHeaderWrapper title="受访者管理">
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
        </Card>
        <ManaForm {...this.props} />
      </PageHeaderWrapper>
    );
  }
}

export default Respondent;
