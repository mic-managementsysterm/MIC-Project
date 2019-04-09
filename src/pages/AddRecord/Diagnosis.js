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
const Option = AutoComplete.Option;

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
      selectedRows:[],
      value:'',
    }
  }

  columns1= [
    {
      title: '证型名称',
      dataIndex: 'Name',
      align: 'center',
    },{
      title: '证型拼音',
      dataIndex: 'PinYin',
      align: 'center',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operate',
    //   key: 'operate',
    //   align: 'center',
      // render: (text,record)=>(
      //   record ?
      //     <Button onClick={()=>this.deleteSyn(record)}>删除</Button>
      //     :null
      // ),
    // }
    ];
  componentDidMount() {
    const { dispatch ,disease:{current,pageSize,searchKey}} = this.props;
    this.handleSelectRows([])
    this.handleSelectRelateRows([])
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading:true
    });
    let upload = {};
    const {disease:{DSNoData}}=this.props
    let data=[]
    let d=[]
    DSNoData.map((item,index)=>{
      const row={DiagnoseName:item.Name||item.DiagnoseName,DiagnoseId:item.Id||item.DiagnoseId,ParentId:item.ParentId||''}
      data= data.concat(row)
      console.log('@tijiao',data)
    })
    console.log('@tijiao',DSNoData,data)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        upload.RespondentId = this.props.routerParams.Respondent.Id;
        upload.ZS = values.ZS;
        upload.XBS = values.XBS;
        upload.JWS = values.JWS;
        upload.GMS = values.GMS;
        upload.TGJC = values.TGJC;
        upload.Diagnose = data;
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
      type: 'disease/queryDisAndSyn',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:searchKey
      },
    });
  };


  handleSelectRows = (rows,int) => {
    const { dispatch,disease:{DSdata,selectDiseaseRows,DSNoData} } = this.props;
    if (int===0) {
      const row=rows.map(i=>{return{...i}})
      const row2=rows.map(i=>{return{...i}});
      dispatch({
        type: 'disease/setStates',
        payload:{
          selectDiseaseRows:selectDiseaseRows.length===0?row:selectDiseaseRows.concat(row),
          DSNoData:DSNoData.length===0?row2:DSNoData.concat(row2)
        },
      });
    }else {
      dispatch({
        type: 'disease/setStates',
        payload: {
          selectDiseaseRows:rows.slice(),
          DSNoData:rows.slice(),
        },
      });
    }
  };

  handleSelectRelateRows=rows=>{
    const { dispatch ,disease:{selectRelateRows}} = this.props;
    dispatch({
      type: 'disease/setStates',
      payload: {
        selectRelateRows:rows.slice()
      },
    });
  };


  handleModalVisible = (record) => {
  const { dispatch,disease:{selectedId} } = this.props;
   dispatch({
    type: 'disease/setStates',
    payload: {
      modalVisible:true,
      selectedId:record
      // Disease:record ? newRecord:ClearDisease,
    },callback:()=>{
      dispatch({
        type:'disAndSyn/queryRelate',
        payload:{
          DiseaseId:record,
          pagesize:8,
          pageindex:1
        }
      })
    },
  });

  };

 handleCancelRelate = () => {
   const {dispatch}=this.props
    dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:false,
        relateSyn:[]
        // Disease:ClearDisease,
      },
    });
   let rows=[]
   this.handleSelectRelateRows(rows)
  };


  handleRelateOk=()=>{
    const { dispatch ,disease:{selectRelateRows,selectDiseaseRows,selectedId,DSNoData}} = this.props;
    selectDiseaseRows.slice().map((item,index)=>{
      selectRelateRows.slice().map((d,index)=>{
        if (item.Id===selectedId) {
          item.Name=item.Name+'('+d.Name+')'
          console.log('@d',d)
          const row=[{ParentId:selectedId,DiagnoseId:d.Id,DiagnoseName:d.Name}]
          const rows=row.slice()
          dispatch({
            type: 'disease/setStates',
            payload: {
              modalVisible:false,
              selectDiseaseRows:selectDiseaseRows,
              DSNoData:DSNoData.concat(rows)
            },
          });
        }
      })
    })
    dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:false,
        // Disease:ClearDisease,
      },
    });
    this.handleSelectRelateRows([])
}
  handleClose=(removedTag,int)=>{
    const { dispatch ,disease:{selectDiseaseRows,selectRelateRows}} = this.props;
    if (int===1) {
      const tags = selectDiseaseRows.filter(function(disease, index) {
        return disease.Id!==removedTag.Id;
      });
      this.handleSelectRows(tags,1)
    }
     else {
      const rows = selectRelateRows.filter(function(relate, index) {
        return relate.Id!==removedTag.Id;
      });

      this.handleSelectRelateRows(rows,1)
    }
  }

  select=(value,option)=>{
    const { dispatch, form,disease:{pageSize,DSdata,searchKey,DSNoData} } = this.props;
    const key=value
    if (DSNoData.length===0){
      this.handleSelectRows([{Name:value,Id:option.props.text}],0)
    } else {
      DSNoData.map((d,index)=>{
        if (d.Id==option.props.text) {
          message.error('请勿重复选择')
        }else {
          this.handleSelectRows([{Name:value,Id:option.props.text}],0)
        }
      })
    }
  }
  handleSearch=(value)=>{
      const { dispatch, form,disease:{pageSize} } = this.props;
       const key=value
         dispatch({
          type: 'disease/setStates',
          payload: {
            searchKey:key,
          },callback:()=>{
             dispatch({
               type: 'disease/queryDisAndSyn',
               payload: {
                 key,
                 pagesize:10,
                 pageindex:1,
               },
             });
           },
        });
}
  renderOption=(item)=>{
    return (
      <Option key={item.Name} text={item.Id} >
        {item.Name}
      </Option>
    );
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      disAndSyn:{relateSyn,restSyn,restPagination},
      disease:{diseaseData,value,DSdata,DSNoData, selectDiseaseRows,selectRelateRows,pageSize,current,total,modalVisible },
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
      list: DSdata,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
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
              <AutoComplete
                dataSource={DSdata.map(this.renderOption)}
                value={value}
                placeholder="请输入中医诊断"
                onSelect={this.select}
                onSearch={(value)=>this.handleSearch(value)}
                optionLabelProp="text"
              >
                <Input />
              </AutoComplete>
              {
                selectDiseaseRows.map((disease,index)=>{
                  return <Tag key={disease.Id}
                              closable
                              onClose={() => this.handleClose(disease,1)}>
                  <span onClick = {()=>{this.handleModalVisible(disease.Id)}}>{disease.Name}</span>
                    </Tag>
                })
              }
            </Form.Item>
             <Form.Item>
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
                   selectedRows={selectRelateRows}
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
