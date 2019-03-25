import React, { PureComponent } from 'react';
import { connect } from 'dva';import {
  Form, Input,Spin, Tooltip, Icon, Cascader, Select, Button, AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router'
import styles from './Diagnosis.less';
const { TextArea } = Input;


@connect(({ addMedical, loading }) => ({
  addMedical,
  loading: loading.models.addMedical,
}))
class DiagnosisForm extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      loading:false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading:true
    })
    console.log("@loading",this.state.loading)
    let upload = {};
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        upload.RespondentId = this.props.location.query.Id;
        upload.ZS = values.ZS;
        upload.XBS = values.XBS;
        upload.JWS = values.JWS;
        upload.GMS = values.GMS;
        upload.TGJC = values.TGJC;
        upload.Diagnose = values.Diagnose;

      }
    });
    const {loading}=this.props
    this.props.dispatch({
      type: 'addMedical/upload',
      payload:upload,callback:()=>{
        this.setState({
          loading:false
        })
        // const basePath = "/record/diagnosis";
        router.push(`/respondent/respondent-list/respondent-record/add-record?Id=${this.props.location.query.Id}`)
        // router.push('/respondent/respondent-list')
      }

    });
    // console.log("@loading",this.state.loading)
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
   const {loading}=this.props
   // console.log("@loading22",this.state.loading)
    return (
      <PageHeaderWrapper title="四诊数据采集" >
        <Spin spinning={this.state.loading} tip={'正在保存'}>
        <div className={styles.content}>
          <Form   onSubmit={this.handleSubmit} className={styles.test}>
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
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

const Diagnosis = Form.create({ name: 'register' })(DiagnosisForm);
export default Diagnosis;
