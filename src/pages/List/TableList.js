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

const CreateForm = Form.create()(props => {
  const { Visit, modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Visit.Name = fieldsValue.Name;
      Visit.Education = fieldsValue.Education;
      Visit.Hobby = fieldsValue.Hobby;
      Visit.Phone = fieldsValue.Phone;
      Visit.IDCard = fieldsValue.IDCard;
      Visit.Address = fieldsValue.Address;
      handleAdd(Visit);
      form.resetFields();
    });
  };
  return (
    <Modal
      destroyOnClose
      width={640}
      title="新增患者"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('Name', {
          rules: [{ required: true, message: '请输入姓名！', min: 1 }],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性别">
        <RadioGroup
          onChange={value => {Visit.Gender = value.target.value}}
          defaultValue={0}
        >
          <Radio value={1}>男</Radio>
          <Radio value={0}>女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="出生日期">
        <DatePicker
          placeholder="请选择患者出生日期"
          onChange={value => {Visit.Born = value.format("YYYY-MM-DD")}}
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
          onChange={value => {Visit.MaritalStatus = value}}
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
          onChange={value => {Visit.DwellingStatus = value}}
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
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);
    const { Visit } = this.props;
    this.state = {
      Respondent:Visit,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleUpdateIn = () =>{
    const { handleUpdateModalVisible, form, handleUpdate } = this.props;
    const { Respondent } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      Respondent.Name = fieldsValue.Name;
      Respondent.Education = fieldsValue.Education;
      Respondent.Hobby = fieldsValue.Hobby;
      Respondent.Phone = fieldsValue.Phone;
      Respondent.IDCard = fieldsValue.IDCard;
      Respondent.Address = fieldsValue.Address;
      handleUpdate(Respondent);
      handleUpdateModalVisible(false);
      form.resetFields();
    });
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, form } = this.props;
    const { Respondent } = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑信息"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false)}
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
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    Respondent : {
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
    },
  };

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
        const {rule:{data}} = this.props;
        return data.list.length >= 1
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
      type: 'rule/fetch',
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
      type: 'rule/fetch',
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
        type: 'rule/fetch',
        payload: {
          searchKey:key
        },
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    const { Respondent } = this.state;
    this.state.Respondent =  record || Respondent;
    this.setState({
      updateModalVisible: !!flag,
      Respondent: record || Respondent,
    });
  };

  handleAdd = respondent => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        ...respondent,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = (record) => {
    const { dispatch } = this.props;
    const { Respondent } = this.state;
    dispatch({
      type: 'rule/update',
      payload: {
        query: Respondent.Id,
        body: {
          ...record,
          Id:Respondent.Id
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  handleDelete = () => {
    const { selectedRows } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/remove',
      payload: {
        rows:selectedRows,
      },
    });

    message.success('删除成功');

    this.setState({selectedRows:[]});
  };

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
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { Respondent, selectedRows, modalVisible, updateModalVisible } = this.state;

    const parentMethods = {
      Visit:Respondent,
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      Visit:Respondent,
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
          updateModalVisible={updateModalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
