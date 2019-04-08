import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Spin, Button, AutoComplete, Modal, Tabs,Radio, message, Icon, Row,Tag, Col, Checkbox
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './Diagnosis.less';
const Option = AutoComplete.Option

const {TabPane} = Tabs;

@connect(({ addMedical,routerParams,disease,disAndSyn, loading }) => ({
  addMedical,
  disease,
  disAndSyn,
  loading: loading.models.addMedical &&loading.models.disease&&loading.models.disAndSyn,
  routerParams,
}))
class DiagnosisForm extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      loading:false,
      modalVisible:false,
      selectedRows:[],
      visible:false,
      diagnoseData:[],
      diagnoseType:'see',
      searchText:'',
      fourDiagnoseData: [],
      fourDiagnoseType:'see',
      data: [],
    }
  }

  componentDidMount() {
    const { dispatch ,disease:{current,pageSize,searchKey}} = this.props;
    dispatch({
      type: 'disease/queryDisease',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        key:searchKey
      },
    });
    this.handleSelectRows([])
    this.handleSelectRelateRows([])
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading:true
    });
    let upload = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        upload.RespondentId = this.props.routerParams.Respondent.Id;
        upload.ZS = values.ZS;
        upload.XBS = values.XBS;
        upload.JWS = values.JWS;
        upload.GMS = values.GMS;
        upload.TGJC = values.TGJC;
        upload.Diagnose = this.state.selectedRows;
        this.props.dispatch({
          type: 'addMedical/upload',
          payload:upload,
          callback:()=>{
            this.setState({
              loading:false
            });
            router.go(-2);
          }
        });
      }else {
        this.setState({
          loading:false
        });
      }
    });
  };

  handleDiagnosisAdd=()=>{
    this.setState({
      modalVisible:true
    })
  }

  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'disease/setStates',
      payload: {
        selectDiseaseRows:rows
      },
    });
  };

  handleSelectRelateRows=rows=>{
    const { dispatch ,disease:{selectRelateRows}} = this.props;
    dispatch({
      type: 'disease/setStates',
      payload: {
        selectRelateRows:rows
      },
    });
  };

  handleClose=(removedTag,int)=>{
    const { dispatch ,disease:{selectDiseaseRows,selectRelateRows}} = this.props;
    if (int===1) {
      const tags = selectDiseaseRows.filter(function(disease, index) {
        return disease.Id!==removedTag.Id;
      });
      this.handleSelectRows(tags)
    }
     else {
      const rows = selectRelateRows.filter(function(relate, index) {
        return relate.Id!==removedTag.Id;
      });

      this.handleSelectRelateRows(rows)
    }
  }

  callback = (key) =>{
    console.log(key);
  }

  handleMore = () =>{
    this.setState({
      visible: true
    })
  }

 changeTab = (type) =>{
   const {dispatch} =this.props;
   const {searchText} =this.state;
   dispatch({
     type: 'addMedical/getSym',
     payload: {
       type:type,
       key:'',
       pagesize:10,
       pageindex:1,
     },
     callback:(res)=>{
       this.setState({
         fourDiagnoseData:res,
         fourDiagnoseType:type
       })
     }
   });
 }


renderRow = () =>{
    const { fourDiagnoseData,data } = this.state;
    let da = data;

    return fourDiagnoseData.map(item=>{
      da = da.push(item)
      return <Button onClick={() =>this.setState({data : da})}>{item.Name}</Button>
  })
}
  //auto
  renderOption = (item) => {
    return (
      <Option key={item.Id} text={item.Name}>
        <span>{item.Name+`\t`+item.PinYin}</span>
      </Option>
    );
  };

  onSearch = (v) => {
    const {dispatch} =this.props;
    const {diagnoseType} =this.state;
    dispatch({
      type: 'addMedical/getSym',
      payload: {
        type:diagnoseType,
        key:v,
        pagesize:10,
        pageindex:1,
      },
      callback:(res)=>{
        this.setState({
          diagnoseData:res,
          searchText:v,
        })
      }
    });
  };

  onTyChange = (type) => {
    const {dispatch} =this.props;
    const {searchText} =this.state;
    dispatch({
      type: 'addMedical/getSym',
      payload: {
        type:type,
        key:searchText,
        pagesize:10,
        pageindex:1,
      },
      callback:(res)=>{
        this.setState({
          diagnoseData:res,
          diagnoseType:type
        })
      }
    });
  };

  onSelect = (v) => {
    console.log(v)
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      disAndSyn:{relateSyn,restSyn,restPagination},
      disease:{diseaseData,dataSource, selectDiseaseRows,selectRelateRows,pageSize,current,total,modalVisible },
      loading,
    } = this.props;
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
    const { diagnoseData, data } =this.state;
    console.log('@data',data)
    return (
      <PageHeaderWrapper title="四诊数据采集">
        <Spin spinning={this.state.loading} tip="正在提交">
          <div className={styles.content}>
            <Form onSubmit={this.handleSubmit} className={styles.test}>
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

                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
              )}
              </Form.Item>
              <Form.Item
                label="中医诊断"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                className={styles.form}
              >
                {/* {getFieldDecorator('Diagnose', { */}
                {/* rules: [{ required: true, message: '请输入中医诊断!' }], */}
                {/* })( */}
                {/* <div> */}
                <Button onClick={()=>{this.handleDiagnosisAdd()}}>添加诊断</Button>
                {
                selectDiseaseRows.map((disease,index)=>{
                return <Tag key={disease.Id} closable onClose={() => this.handleClose(disease,1)}>{disease.Name}</Tag>
              })
              }
                {
                selectRelateRows.map((relate,index)=>{
                return <Tag key={relate.Id} closable onClose={() => this.handleClose(relate,2)}>{relate.Name}</Tag>
              })
              }
                {/* </div> */}
                {/* )} */}
              </Form.Item>
              <Form.Item
                label="四诊信息"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                className={styles.form}
              >
                {getFieldDecorator('DiagnoseInfo', {
                 rules: [{ required: true, message: '请输入四诊信息!' }],
                 })(
                   <div style={{ display: 'flex' }}>
                     <div>
                       <AutoComplete
                         className="global-search"
                         size="large"
                         style={{ width: '100%' }}
                         dataSource={diagnoseData.map(this.renderOption)}
                         onSelect={this.onSelect}
                         onSearch={this.onSearch}
                         placeholder="input here"
                         optionLabelProp="text"
                       >
                         <Input />
                       </AutoComplete>
                       <Radio.Group
                         onChange={value => { this.onTyChange(value.target.value)}}
                         defaultValue={'see'}
                       >
                         <Radio value={'see'}>望</Radio>
                         <Radio value={'smell'}>闻</Radio>
                         <Radio value={'ask'}>问</Radio>
                         <Radio value={'touch'}>切</Radio>
                         <Radio value={'other'}>其他</Radio>
                       </Radio.Group>
                     </div>
                     <Button onClick={() => {this.handleMore()}}>更多</Button>
                     {
                       data == false ? null :  <Tag >{data.Name}</Tag>
                     }
                   </div>
                 )}
              </Form.Item>
              <Form.Item>
                {this.state.visible ?
                  <Tabs onChange={this.changeTab} type="card">
                    <TabPane tab="望" key={'see'}>
                      {this.renderRow()}
                    </TabPane>
                    <TabPane tab="闻" key={'smile'}>Content of Tab Pane 2</TabPane>
                    <TabPane tab="问" key={'ask'}>Content of Tab Pane 3</TabPane>
                    <TabPane tab="切" key={'touch'}>Content of Tab Pane 3</TabPane>
                    <TabPane tab="其他" key={'other'}>Content of Tab Pane 3</TabPane>
                  </Tabs> : null}
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
