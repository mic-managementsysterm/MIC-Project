import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {Link} from "react-router-dom";
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
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

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
  Born: "1949-10-01",
  Education: "",
  MaritalStatus: 0,
  DwellingStatus: 0,
  Hobby: "",
  Phone: "",
  IDCard: "",
  Address: "",
  RecordUserId: "3c5e636a-c182-4ad7-a7b1-9205bbe534f5",
  CreatedAt: ""
};

const CreateForm = Form.create()(props => {
  const { respondent: { Respondent,modalVisible }, form, dispatch,  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Respondent.Name = fieldsValue.Name;
      Respondent.Education = fieldsValue.Education;
      Respondent.Hobby = fieldsValue.Hobby;
      Respondent.Phone = fieldsValue.Phone;
      Respondent.IDCard = fieldsValue.IDCard;
      Respondent.Address = fieldsValue.Address;
      dispatch({
        type: 'respondent/addOrUpRespondent',
        payload: {
          ...Respondent,
        },
        callback:()=>{
          dispatch({
            type: 'respondent/queryRespondent',
          });
        }
      });
      form.resetFields();
      dispatch({
        type: 'respondent/setStates',
        payload: {
          Respondent:clearRespondent,
          modalVisible:false
        },
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
          defaultValue={0}
        >
          <Radio value={1}>男</Radio>
          <Radio value={0}>女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="出生日期">
        <DatePicker
          placeholder="请选择患者出生日期"
          onChange={value => {Respondent.Born = value.format("YYYY-MM-DD")}}
        />
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="教育程度">
        {form.getFieldDecorator('Education', {
          rules: [{ message: '请输入教育程度'}],
        })(<Input placeholder="请输入教育程度" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="婚姻状况">
        <Select
          defaultValue={0}
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
          defaultValue={0}
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

@Form.create()
class UpdateForm extends PureComponent {
    formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };

  handleUpdateIn = () =>{
    const { respondent: { Respondent }, form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Respondent.Name = fieldsValue.Name;
      Respondent.Education = fieldsValue.Education;
      Respondent.Hobby = fieldsValue.Hobby;
      Respondent.Phone = fieldsValue.Phone;
      Respondent.IDCard = fieldsValue.IDCard;
      Respondent.Address = fieldsValue.Address;
      dispatch({
        type: 'respondent/addOrUpRespondent',
        payload: {
          ...Respondent,
        },
        callback:()=>{
          dispatch({
            type: 'respondent/queryRespondent',
          });
        }
      });
      form.resetFields();
      dispatch({
        type: 'respondent/setStates',
        payload: {
          Respondent:clearRespondent,
          updateModalVisible:false
        },
      });
    });
  };

  onCancel =() =>{
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'respondent/setStates',
      payload: {
        Respondent:clearRespondent,
        updateModalVisible:false
      },
    });
  };

  render() {
    const {respondent: { Respondent,updateModalVisible }, form } = this.props;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑信息"
        visible={updateModalVisible}
        onCancel={() => this.onCancel()}
        onOk={() => this.handleUpdateIn()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
          {form.getFieldDecorator('Name', {
            rules: [{ required: true, message: '请输入姓名！', min: 1 }],
          })(<Input placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性别">
          <RadioGroup
            onChange={value => {Respondent.Gender = value.target.value}}
            defaultValue={0}
          >
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="出生日期">
          <DatePicker
            placeholder="请选择患者出生日期"
            onChange={value => {Respondent.Born = value && value.format("YYYY-MM-DD")}}
            style={{paddingBottom: 5}}
          />
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="教育程度">
          {form.getFieldDecorator('Education', {
            rules: [{ message: '请输入教育程度'}],
          })(<Input placeholder="请输入教育程度" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="婚姻状况">
          <Select
            defaultValue={0}
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
            defaultValue={0}
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
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ respondent, loading }) => ({
  respondent,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {

  columns = [
    {
      title: '姓名',
      dataIndex: 'Name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'Gender',
    },
    {
      title: '出生日期',
      dataIndex: 'Born',
    },
    {
      title: '居住地址',
      dataIndex: 'Address',
    },
    {
      title: '上次操作时间',
      dataIndex: 'UpdatedAt'
    },
    {
      title: '操作',
      render: (text, record) => {
        const {respondent:{dataSource}} = this.props;
        return dataSource.length >= 1
          ? (
            <div key={record.Id}>
              <Link to={
                {
                  pathname: '',
                  state: {key: record.Id}
                }
              }
              >
                <Button className="btn">查看</Button>
              </Link>
              <Button onClick={() => this.handleUpdateModalVisible(true,record)}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'respondent/queryRespondent',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, formValues } = this.props;

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
      payload: {},
    });
  };

  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'respondent/setStates',
      payload: {formValues:{}},
    });
    dispatch({
      type: 'respondent/queryRespondent',
      payload: {},
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
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      const { key } = fieldsValue;
      dispatch({
        type: 'respondent/queryRespondent',
        payload: {
          key:key
        },
      });
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    dispatch({
      type: 'respondent/setStates',
      payload: {modalVisible:!!flag},
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    const { dispatch } = this.props;
    let newRecord = Object.assign({},record);
    if(flag){
      newRecord.MaritalStatus = 0;
      newRecord.DwellingStatus = 0;
      newRecord.Gender = 0;
    }
    dispatch({
      type: 'respondent/setStates',
      payload: {
        updateModalVisible:!!flag,
        Respondent:record?newRecord:clearRespondent
      },
    });
  };


  handleDelete = () => {
    const { dispatch, respondent: { selectedRows }, } = this.props;
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
          payload: {},
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
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            {selectedRows.length >=1 && (
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
    const { respondent: { dataSource,selectedRows }, loading, } = this.props;
    const data ={
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize:10,
        current:1
      },
    };
    return (
      <PageHeaderWrapper title="患者管理">
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
        <CreateForm {...this.props} />
        <UpdateForm {...this.props} />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
