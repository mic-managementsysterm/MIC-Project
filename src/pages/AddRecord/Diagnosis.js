import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Spin, Button, AutoComplete, Modal, Tabs, Cascader, Table, message, Col, Row,Tag
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './Diagnosis.less';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

@connect(({ addMedical,routerParams, getDisease,getSyndrome,disease,disAndSyn, loading }) => ({
  addMedical,
  getDisease,
  getSyndrome,
  disease,
  disAndSyn,
  loading: loading.models.addMedical && loading.models.getDisease&&loading.models.getSyndrome&&loading.models.disease&&loading.models.disAndSyn,
  routerParams,

}))
class DiagnosisForm extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      loading:false,
      modalVisible:false,
      selectedRows:[]
    }
  }
  columns = [
    {
      title: '疾病名称',
      dataIndex: 'Name',
      width: '40%',
    },
    {
      title: '拼音',
      dataIndex: 'PinYin',
      width: '30%',
    },
    {
      title: '操作',
      width: '30%',
      render: (text, record) => {
        const {disease:{dataSource}} = this.props;
        return dataSource && dataSource.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleModalVisible(true,record)} className={styles.btn}>关联证型</Button>
            </div>
          ) : null
      },
    },
  ];
  columns1= [
    {
      title: '证型名称',
      dataIndex: 'Name',
      align: 'center',
    },{
      title: '证型拼音',
      dataIndex: 'PinYin',
      align: 'center',
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      render: (text,record)=>(
        record ?
          <Button onClick={()=>this.deleteSyn(record)}>删除</Button>
          :null
      ),
    }];
  componentDidMount() {
    const { dispatch ,disease:{current,pageSize,searchKey}} = this.props;
    dispatch({
      type: 'getDisease/getDisease',
      payload: "",
    });
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
    const { dispatch } = this.props;
    dispatch({
      type: 'getDisease/getDisease',
      payload: "",
    });
    dispatch({
      type: 'getSyndrome/getSyndrome',
      payload: ''
    })
  }
  handleCancel=()=>{
    this.setState({
      modalVisible:false
    })
    let rows=[]
    this.handleSelectRows(rows)
}

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,disease:{formValues,searchKey} } = this.props;
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
      type: 'disease/queryDisease',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:searchKey
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch,disease:{pageSize} } = this.props;
    form.resetFields();
    dispatch({
      type: 'disease/setStates',
      payload: {
        formValues:{},
        current:1,
        pageSize:pageSize,
        searchKey:''
      },
    });
    dispatch({
      type: 'disease/queryDisease',
      payload: {
        pagesize:pageSize,
        pageindex:1,
        key:''
      },
    });
  };

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

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form,disease:{pageSize} } = this.props;
    form.validateFields((err, fieldsValue) => {
      const { key } = fieldsValue;
      dispatch({
        type: 'disease/setStates',
        payload: {
          searchKey:key,
        },
      });
      dispatch({
        type: 'disease/queryDisease',
        payload: {
          key,
          pagesize:pageSize,
          pageindex:1,
        },
      });
    });
  };

  handleModalVisible = async(flag, record) => {
    let newRecord = Object.assign({},record);
    console.log('@record',record)
    const { dispatch } = this.props;
    await dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:!!flag,
        // Disease:record ? newRecord:ClearDisease,
      },callback:()=>{
        dispatch({
          type:'disAndSyn/queryRelate',
          payload:{
            DiseaseId:record.Id,
            pagesize:8,
            pageindex:1
          }
        })
      },
    });
    // if(flag && record){
    //   setInfo.setBaseInfo();
    // }
  };

 handleCancelRelate = () => {
   const {dispatch}=this.props
    dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:false,
        // Disease:ClearDisease,
      },
    });
   let rows=[]
   this.handleSelectRelateRows(rows)
  };
  renderSimpleForm() {
    const {form: { getFieldDecorator },disease:{selectedRows}} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" justify="space-between">
          <span className={styles.submitButtons} style={{alignItems:"flex-end",justifyContent:'flex-end'}}>
            {getFieldDecorator('key')(
              <Input placeholder="请输入疾病名或拼音" style={{ width: 400,marginRight:20 }} />
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
  };

  handleRelateOk=()=>{
    const { dispatch ,disease:{selectRelateRows}} = this.props;
    dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:false,
        // Disease:ClearDisease,
      },
    });
}
  handleDieaseOk=()=>{
    const {disease:{selectRelateRows,selectDiseaseRows}}=this.props
  this.setState({
    modalVisible:false,
    selectedRows:selectDiseaseRows.concat(selectRelateRows)
  })
    console.log('@select',this.state.selectedRows)
}
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      // getDisease: {diseaseData},
      disAndSyn:{relateSyn,restSyn,restPagination},
      // getSyndrome: {syndromeData},
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
    const data ={
      list: dataSource,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
    }
    const Tags=() =>{
      console.log('@log')
      const {disease:{
        selectDiseaseRows,selectRelateRows
      }}=this.props
      selectDiseaseRows.map((disease,index)=>{
          <Tag>{disease.Name}</Tag>
      })
    }


    return (
      <PageHeaderWrapper title="四诊数据采集" >
        <Spin spinning={this.state.loading} tip={'正在提交'}>
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
                <AutoComplete
                  dataSource={diseaseData}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="请输入主诉"
                >
                  <Input />

                </AutoComplete>
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
                <AutoComplete
                  dataSource={diseaseData}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="请输入现病史"
                >
                  <Input />
                </AutoComplete>
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
                <AutoComplete
                  dataSource={diseaseData}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="请输入既往史"
                >
                  <Input />
                </AutoComplete>
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
                <AutoComplete
                  dataSource={diseaseData}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="请输入过敏史"
                >
                  <Input />
                </AutoComplete>
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
                <AutoComplete
                  dataSource={diseaseData}
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  placeholder="请输入体格检查"
                >
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
            <Form.Item
              label="中医诊断"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {/*{getFieldDecorator('Diagnose', {*/}
                {/*rules: [{ required: true, message: '请输入中医诊断!' }],*/}
              {/*})(*/}
                {/*<div>*/}
                <Button onClick={()=>{this.handleDiagnosisAdd()}}>添加诊断</Button>
              {
                selectDiseaseRows.map((disease,index)=>{
                return <Tag key={disease.Id} closable  onClose={() => this.handleClose(disease,1)}>{disease.Name}</Tag>
              })
              }
              {
                selectRelateRows.map((relate,index)=>{
                return <Tag key={relate.Id} closable  onClose={() => this.handleClose(relate,2)}>{relate.Name}</Tag>
              })
              }
                {/*</div>*/}
              {/*)}*/}
            </Form.Item>
             <Form.Item>
             <Modal
             centered
               destroyOnClose
              width={640}
              title="诊断列表"
              visible={this.state.modalVisible}
              onOk={()=>{this.handleDieaseOk()}}
              onCancel={() => this.handleCancel()}
            >
               <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
               <StandardTable
                 rowKey='Id'
                 selectedRows={selectDiseaseRows }
                 loading={loading}
                 data={data}
                 columns={this.columns}
                 onSelectRow={this.handleSelectRows}
                 onChange={this.handleStandardTableChange}
               />
            </Modal>
               <Modal
                 centered
                 destroyOnClose
                 width={640}
                 title="关联证型"
                 visible={modalVisible}
                 onOk={()=>{this.handleRelateOk()}}
                 onCancel={() => this.handleCancelRelate()}
               >
                 <StandardTable
                   selectedRows={selectRelateRows }
                   pagination={{pageSize:8}}
                   dataSource={relateSyn}
                   onSelectRow={this.handleSelectRelateRows}
                   onChange={this.handleStandardTableChange}
                   columns={this.columns1}
                   rowKey={item => item.Id}
                 />
               </Modal>
            </Form.Item>
            <Form.Item
              label="四诊信息"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              className={styles.form}
            >
              {/*{getFieldDecorator('DiagnoseInfo', {*/}
                {/*rules: [{ required: true, message: '请输入四诊信息!' }],*/}
              {/*})(*/}
                {/*<Input type={'button'} placeholder='新增四诊信息' />*/}
              {/*)}*/}
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
