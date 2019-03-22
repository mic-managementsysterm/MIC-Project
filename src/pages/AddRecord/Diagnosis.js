import React, { PureComponent } from 'react';
import { connect } from 'dva';import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Diagnosis.less';
const { TextArea } = Input;


@connect(({ addMedical, loading }) => ({
  addMedical,
  loading: loading.models.addMedical,
}))
class DiagnosisForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let upload = {};
      if (!err) {
        upload.RespondentId = this.props.location.query.Id;
        upload.ZS = values.ZS;
        upload.XBS = values.XBS;
        upload.JWS = values.JWS;
        upload.GMS = values.GMS;
        upload.TGJC = values.TGJC;
        upload.Diagnose = values.Diagnose;
        this.props.dispatch({
          type: 'addMedical/upload',
          payload:upload
        });
      }
    });
  };

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
          offset: 11,
        },
      },
    };

    return (
      <PageHeaderWrapper title="四诊数据采集">
        <div className={styles.content}>
          <Form  onSubmit={this.handleSubmit} className={styles.test}>
            <Form.Item
              label="主诉"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {getFieldDecorator('ZS', {
                rules: [{
                  required: true, message: '请输入主诉!',
                }],
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item
              label="现病史"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {getFieldDecorator('XBS', {
                rules: [{
                  required: true, message: '请输入现病史！',
                }],
              })(
                <TextArea  />
              )}
            </Form.Item>
            <Form.Item
              label="既往史"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {getFieldDecorator('JWS', {
                rules: [{
                  required: true, message: '请输入既往史!',
                }],
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item
              label="过敏史"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {getFieldDecorator('GMS', {
                rules: [{ required: true, message: '请输入过敏史!', whitespace: true }],
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item
              label="体格检查"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {getFieldDecorator('TGJC', {
                rules: [{ required: true, message: '请输入体格检查!' }],
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item
              label="中医诊断"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {getFieldDecorator('Diagnose', {
                rules: [{ required: true, message: '请输入中医诊断!' }],
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout} className={styles.form}>
              <Button type="primary" htmlType="submit" style={{ marginBottom: 20 }}>提交</Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}

const Diagnosis = Form.create({ name: 'register' })(DiagnosisForm);
export default Diagnosis;
