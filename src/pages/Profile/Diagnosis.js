import React, { PureComponent } from 'react';
import { connect } from 'dva';import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from  './Diagnosis.less';

class DiagnosisForm extends PureComponent {
  componentDidMount() {
  }

  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <PageHeaderWrapper title="四诊数据采集">
        <div className={styles.content}>
          <Form  onSubmit={this.handleSubmit} className={styles.form}>
            <Form.Item
              label="主诉"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.test}
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入主诉!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label="现病史"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入现病史！',
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item
              label="既往史"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请输入既往史!',
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item
              label="过敏史"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入过敏史!', whitespace: true }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label="体格检查"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('residence', {
                rules: [{ type: 'array', required: true, message: '请输入体格检查!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label="中医诊断"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入中医诊断!' }],
              })(
                <Input  style={{ width: '100%' }} />
              )}
            </Form.Item>
            <Form.Item
              label="四诊信息"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('website', {
                rules: [{ required: true, message: '请输入四诊信息!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}

const Diagnosis = Form.create({ name: 'register' })(DiagnosisForm);
export default Diagnosis;
