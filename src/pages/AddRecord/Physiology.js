import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Icon, Radio, Form, Input, Button,Checkbox
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Physiology.less';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({addPhy,loading}) =>({
  addPhy,
  loading:loading.models.addPhy,
}))
@Form.create()
class Physiology extends PureComponent {

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'addPhy/getPhy',
      payload: {Id:"1001"},
    });
  }

  handleSubmit = () => {
    const { dispatch,addPhy:{newPhy} } = this.props;
    // 模拟GroupTime
    newPhy.Infos.map(item => {
      item.GroupTime = "2019-03-22"
    });
    dispatch({
      type: 'addPhy/uploadPhy',
      payload: {...newPhy},
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
        <FormItem {...formItemLayout} className={styles.form}>
          <Checkbox onChange={value => this.setInfos(index,"ItemChecked",value.target.checked,null)}>
            {item.Title}
          </Checkbox>,
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
    const { addPhy:{Topics} } = this.props;
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
            {this.renderTopic(Topics)}
            <FormItem {...submitFormLayout} className={styles.form}>
              {/*<Button type="primary" htmlType="submit" style={{marginTop: 10, marginBottom: 10}}>提交</Button>*/}
              <Button onClick={()=>this.handleSubmit()} style={{marginTop: 10, marginBottom: 10}}>提交</Button>
            </FormItem>
          </Form>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Physiology;
