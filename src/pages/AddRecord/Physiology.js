import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Icon, Radio, Form, Input, Button, Checkbox, message, Spin,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Physiology.less';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({addPhy,routerParams,loading}) =>({
  addPhy,
  routerParams,
  loading:loading.models.addPhy,
}))
@Form.create()
class Physiology extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      loading:false
    }
  }

  componentDidMount(){
    const { dispatch,routerParams,addPhy:{newPhy} } = this.props;
    dispatch({
      type: 'addPhy/setStates',
      payload:{
        newPhy:{
          ...newPhy,
          RespondentId:routerParams.Respondent.Id
        }
      }
    });
    dispatch({
      type: 'addPhy/getPhy',
      payload: {
        Id:routerParams.RecordAddId
      }
    });
  }

  handleSubmit = () => {
    const { dispatch,addPhy:{newPhy} } = this.props;
    this.setState({
    loading:true
  });
    dispatch({
      type: 'addPhy/uploadPhy',
      payload: {...newPhy},
      callback:()=>{
        this.setState({
          loading:false
        });
        router.go(-2);
      },
    });
  };

  setInfos = (index,type,value,GroupName) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addPhy/setInfos',
      payload: {
        index,
        type,
        value,
        GroupName
      },
    });
  };

  renderTopic = (data) => {
    let result=[];
    for(let i =0;i<data.length;i++){
      switch (data[i].Type){
        case 1:
          result.push(this.renderException(data[i],i));
          break;
        case 2:
          result.push(this.renderInput(data[i],i));
          break;
        case 3:
          result.push(this.renderCheckBox(data[i],i));
          break;
        case 4:
          result.push(this.renderTextArea(data[i],i));
          break;
        default:
          break
      }
    }
    return result
  };

  renderException = (item,index) => {
    const { getFieldDecorator } = this.props.form;
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
    const { addPhy:{Topics} } = this.props;
    let showGroup = false;
    if(index<1 ||Topics[index].GroupName !== Topics[index-1].GroupName  ){
      showGroup =true
    }
    return(
      <React.Fragment>
        {showGroup && <div className={styles.title}>{item.GroupName}</div>}
        <FormItem {...formItemLayout} label={item.Title} className={styles.form}>
          {getFieldDecorator(index+'', {
            rules: [
              {
                required: true,
                message: "请选择检查结果！",
              },
            ],
          })(
            <RadioGroup onChange={value => this.setInfos(index,"ExceptionType",value.target.value,null)}>
              <Radio value={0}>正常</Radio>
              <Radio value={1}>异常<Icon type="arrow-up" /></Radio>
              <Radio value={2}>异常<Icon type="arrow-down" /></Radio>
            </RadioGroup>)}
        </FormItem>
      </React.Fragment>
    )
  };

  renderInput = (item,index) => {
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
    const { addPhy:{Topics} } = this.props;
    let showGroup = false;
    if(index<1 ||Topics[index].GroupName !== Topics[index-1].GroupName  ){
      showGroup =true
    }
    return(
      <React.Fragment>
        {showGroup && <div className={styles.title}>{item.GroupName}</div>}
        <FormItem {...formItemLayout} label={item.Title} className={styles.form}>
          <Input style={{width: 50}} onChange={value => this.setInfos(index,"ItemValue",value.target.value,null)} />
          <span> 次/分钟</span>
        </FormItem>
      </React.Fragment>
    )
  };

  renderCheckBox = (item,index) => {
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
    const { addPhy:{Topics} } = this.props;
    let showGroup = false;
    if(index<1 ||Topics[index].GroupName !== Topics[index-1].GroupName  ){
      showGroup =true
    }
    return(
      <React.Fragment>
        {showGroup && <div className={styles.title}>{item.GroupName}</div>}
        <FormItem
          wrapperCol={{ span: 15, offset: 11 }}
          className={styles.form} >
          <Checkbox onChange={value => this.setInfos(index,"ItemChecked",value.target.checked,null)}>
            {item.Title}
          </Checkbox>
        </FormItem>
      </React.Fragment>
    )
  };

  renderTextArea = (item,index) => {
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
    const { addPhy:{Topics} } = this.props;
    let showGroup = false;
    if(index<1 ||Topics[index].GroupName !== Topics[index-1].GroupName  ){
      showGroup =true
    }
    return(
      <React.Fragment>
        {showGroup && <div className={styles.title}>{item.GroupName}</div>}
        <FormItem {...formItemLayout} label="检测结果：" className={styles.form}>
          <TextArea onChange={value => this.setInfos(index,"ItemValue",value.target.value,null)} />
        </FormItem>
      </React.Fragment>
    )
  };


  render() {
    const { addPhy:{Topics}, loading } = this.props;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 14 },
        sm: { span: 10, offset: 10 },
      },
    };
    return(
      <PageHeaderWrapper title="生理数据采集" loading={loading}>
        <Spin spinning={this.state.loading} tip={'正在提交'}>
        <div className={styles.content}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            {this.renderTopic(Topics)}
            <FormItem {...submitFormLayout} className={styles.form}>
              <Button type="primary" htmlType="submit" onClick={()=>this.handleSubmit()} style={{marginTop: 10, marginBottom: 10}}>提交</Button>
              {/*<Button onClick={()=>this.handleSubmit()} style={{marginTop: 10, marginBottom: 10}}>提交</Button>*/}
            </FormItem>
          </Form>
        </div>
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default Physiology;
