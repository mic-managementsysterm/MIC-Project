import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List, Icon, Radio, Form, Input, Button,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Physiology.less';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class PhysiologyForm extends React.Component {
  state = {
    Data: {
      GaugeRecord: {
        Id: "",
        GaugeId: "",
        GaugeName: ""
      },
      RecordInfos: [
        {
          InfoId: "",
          RecordId: "",
          TopicId: "",
          GroupTime: "2019-02-22",
          ItemValue: "",
          ItemResult: "",
          ExceptionType: 1,
          GaugeId: "",
          GroupName: "",
          GroupOrder: 1,
          Title: "",
          Order: 1,
          Type: 1
        }
      ]
    }
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { Data } = this.state;
    const { getFieldDecorator } = this.props.form;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: 12 },
        sm: { span: 7, offset: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 14 },
        sm: { span: 10, offset: 10 },
      },
    };
    return(
      <PageHeaderWrapper title="生理数据采集">
       <div className={styles.content}>
         <Form hideRequiredMark style={{ marginTop: 8 }}>
           <div className={styles.title}>血常规(RBC)</div>
           <FormItem {...formItemLayout} label={'血红蛋白(Hbg)'} className={styles.form}>
             {getFieldDecorator('1', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'血细胞(WBC)'} className={styles.form}>
             {getFieldDecorator('2', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'中性粒细胞率(GRAN-R)'} className={styles.form}>
             {getFieldDecorator('3', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'淋巴细胞率(LYM-R)'} className={styles.form}>
             {getFieldDecorator('4', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <div className={styles.title}>血糖</div>
           <FormItem {...formItemLayout} label={'空腹葡萄糖'} className={styles.form}>
             {getFieldDecorator('5', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <div className={styles.title}>肝、肾功能</div>
           <FormItem {...formItemLayout} label={'丙氨酸氨基转移酶（ALT）'} className={styles.form}>
             {getFieldDecorator('6', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'天门冬氨酸氨基酸转移酶（AST）'} className={styles.form}>
             {getFieldDecorator('7', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'谷草/谷丙（AST/ALT）'} className={styles.form}>
             {getFieldDecorator('8', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'总胆红素（TBIL）'} className={styles.form}>
             {getFieldDecorator('9', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'酸素（Urea）'} className={styles.form}>
             {getFieldDecorator('10', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'肌酐（Gre）'} className={styles.form}>
             {getFieldDecorator('11', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'甘油三酯（TG）'} className={styles.form}>
             {getFieldDecorator('12', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'总胆固醇（TC）'} className={styles.form}>
             {getFieldDecorator('13', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'高密度脂蛋白胆固醇（HDL-C）'} className={styles.form}>
             {getFieldDecorator('14', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
           <FormItem {...formItemLayout} label={'低密度脂蛋白胆固醇（LDL-C）'} className={styles.form}>
             {getFieldDecorator('15', {
               rules: [
                 {
                   required: true,
                   message: "请选择检查结果！",
                 },
               ],
             })(<RadioGroup
               onChange={value => {Data.RecordInfos.ItemResult = value.target.value}}
             >
               <Radio value={0}>正常</Radio>
               <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
               <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
             </RadioGroup>)}
           </FormItem>
             <div className={styles.title}>静息电图</div>
               <FormItem {...formItemLayout} label={'心率'} className={styles.form}>
                 {getFieldDecorator('16', {
                   initialValue:'',
                   rules: [
                     { required: true,
                       message: "请选择检查结果！",
                     },
                   ],
                 })(<Input style={{width: 50}} />)}
                 <span> 次/分钟</span>
               </FormItem>
               <FormItem {...formItemLayout} label={'心电图结果'} className={styles.form}>
                 {getFieldDecorator('17', {
                   rules: [
                     {
                       required: true,
                       message: "请选择检查结果！",
                     },
                   ],
                 })(<RadioGroup>
                   <Radio style={radioStyle} value={1}>窦性心律</Radio>
                   <Radio style={radioStyle} value={2}>窦缓</Radio>
                   <Radio style={radioStyle} value={3}>窦速</Radio>
                   <Radio style={radioStyle} value={4}>窦不齐</Radio>
                   <Radio style={radioStyle} value={5}>心肌缺血</Radio>
                   <Radio style={radioStyle} value={6}>心肌梗死</Radio>
                   <Radio style={radioStyle} value={7}>传导阻滞</Radio>
                   <Radio style={radioStyle} value={8}>房颤</Radio>
                   <Radio style={radioStyle} value={9}>室颤</Radio>
                   <Radio style={radioStyle} value={10}>左室肥厚</Radio>
                   <Radio style={radioStyle} value={11}>室性早搏</Radio>
                 </RadioGroup>)}
               </FormItem>
             <div className={styles.title}>认知诱发电位（P300）</div>
             <FormItem {...formItemLayout} label={'检测结果：'} className={styles.form}>
               {getFieldDecorator('18', {
                 rules: [
                   {
                     required: true,
                     message: "请填写检查结果！",
                   },
                 ],
               })(<TextArea />)}
             </FormItem>
             <div className={styles.title}>核磁共振（MRI）</div>
             <FormItem {...formItemLayout} label={'检测结果：'} className={styles.form}>
               {getFieldDecorator('19', {
                 rules: [
                   {
                     required: true,
                     message: "请填写检查结果！",
                   },
                 ],
               })(<TextArea />)}
             </FormItem>
             <div className={styles.title}>静脉血中蛋白tau、Aβ1-42和P-tau检测</div>
             <FormItem {...formItemLayout} label={'检测结果：'} className={styles.form}>
               {getFieldDecorator('20', {
                 rules: [
                   {
                     required: true,
                     message: "请填写检查结果！",
                   },
                 ],
               })(<TextArea />)}
             </FormItem>
           <FormItem {...submitFormLayout} className={styles.form}>
             <Button onClick={this.handleSubmit} type="primary" htmlType="submit" style={{marginTop: 10, marginBottom: 10}}>提交</Button>
           </FormItem>
         </Form>
       </div>
      </PageHeaderWrapper>
    )
  }
}

const Physiology = Form.create({ name: 'register' })(PhysiologyForm);

export default Physiology;
