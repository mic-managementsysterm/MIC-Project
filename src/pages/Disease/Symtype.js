import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Modal,
  message,
  Table,
  Radio, Cascader,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Disease.less';
import Syndrome from "./Syndrome";
import Symptom from './Symptom';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Search} = Input;
FormItem.className = styles["ant-form-item"];
let arr=[];
let newArr=[]
let arr1=[]
const ClearDisease = {
  Id	:"",
  TypeName:	"",
  ParentId:	"",
  ChildrenTypes:	[]
};
const setInfo = {};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ disease,loading }) => ({
  disease,
  loading: loading.models.disease,
}))
@Form.create()
class ManaForm extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      defaultValue:[]
    }
  }

  onChange = (value,selectedOptions) => {
    let {disease:{Type},dispatch} =this.props;
    Type.ParentId = value[value.length-1];
    console.log('@value',value,selectedOptions)
    // Type.SymptomTypeName = value[1];
  }

  getFather=()=>{
    const {disease:{typeData}}=this.props
   return this.getParent(typeData,Type.ParentId)
  }



 getParent=(data2, id)=> {
    for (let i=0;i<data2.length;i++){
      if (data2[i].Id==id){
        arr.push(data2[i].Id)
         newArr=arr.filter((x, index,self)=>self.indexOf(x)===index)
        break
      }else {
        if (data2[i].ChildrenTypes.length!==0){
          arr.push(data2[i].Id)
            this.getParent(data2[i].ChildrenTypes,id);
        } else {
          arr=[]
        }
      }
    }
   return newArr;

  }

  render(){

    const { disease:{Type,typeData,modalVisible,pageSize,current,searchKey}, form,dispatch} = this.props;
    setInfo.setBaseInfo = () => {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        console.log('@11',Type)
        obj[key] = Type[key] || null;
        form.setFieldsValue(obj)
        dispatch({
          type:'disease/setState',
          payload:{
            Type:Type
          }
        })
      });
    };

    const okHandle = () => {
      arr=[]
      newArr=[]
      arr1=[]
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        Type.TypeName = fieldsValue.TypeName;
        console.log('@id',Type)
        if(Type.Id === ""){
          dispatch({
            type: 'disease/addSymType',
            payload: {
              Type
            },
            callback:()=>{
              dispatch({
                type: 'disease/querySymType',
                payload: {
                  pagesize:pageSize,
                  pageindex:1,
                  key:''
                },
              });
            }
          });
        }else {
          console.log('@add',Type)
          dispatch({
            type: 'disease/addSymType',
            payload: {
              ...Type
            },
            callback:()=>{
              dispatch({
                type: 'disease/querySymType',
                payload: {
                  pagesize:pageSize,
                  pageindex:current,
                  key:searchKey
                },
              });
            }
          });
        }
        dispatch({
          type: 'disease/setStates',
          payload: {
            modalVisible:false,
            Type:ClearDisease,
          },
        });
        form.resetFields();
      });
    };

    const handleCancel = () => {
      arr=[]
      newArr=[]
      arr1=[]
      dispatch({
        type: 'disease/setStates',
        payload: {
          modalVisible:false,
          Type:ClearDisease,
        },
      });
    };


    const fieldNames={ label: 'TypeName', value: 'Id', children: 'ChildrenTypes' }
    const defaultValue=this.getParent(typeData,Type.ParentId)
    const data=typeData
    return (
      <Modal
        centered
        destroyOnClose
        width={640}
        title="类型管理"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleCancel()}
      >

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型名">
          {form.getFieldDecorator('TypeName', {
            rules: [{ required: true, message: '请输入类型名！', min: 1 }],
          })(<Input placeholder="请输入疾病名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="病症类型">
          <Cascader
            options={typeData}
            fieldNames={fieldNames}
            onChange={this.onChange}
            changeOnSelect
            defaultValue={Type.ParentId?arr1=defaultValue : null}
          />
        </FormItem>
      </Modal>
    );
  }
}



@connect(({ disAndSyn,disease, loading }) => ({
  disAndSyn,
  loading: loading.models.disAndSyn,
  relateModalVisible: disease.relateModalVisible,
}))
@Form.create()
class RelateForm extends PureComponent {
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

  columns2=[
    {
      title: '证型名称',
      dataIndex: 'Name',
      align: 'center',
    }, {
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
          <Button onClick={()=>this.addSyn(record)} disabled={record.disabled}>添加</Button>
          :null
      ),
    }];

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addSyn = ( record ) => {
    let { disAndSyn:{relateSyn, restSyn},dispatch } = this.props;
    let relate = relateSyn.slice();
    let rest = restSyn.slice();
    let repeat =false;
    relate.map(data =>{
      if (data.Id ===record.Id){
        repeat =true
      }
    });
    if (!repeat){
      relate.push(record)
    } else {
      message.warning("Already Relate");
      return
    }
    rest.map(item=>{
      item.Id ===record.Id && (item.disabled = true)
    });
    dispatch({
      type: 'disAndSyn/setStates',
      payload: {
        restSyn:rest,
        relateSyn:relate,
      },
    });
  };

  deleteSyn = ( record ) => {
    let {disAndSyn:{relateSyn, restSyn},dispatch} = this.props;
    let relate = relateSyn.slice();
    let rest = restSyn.slice();

    rest.map( item=>{
      item.Id === record.Id && (item.disabled =false)
    } );
    relate = relate.filter(item => item.Id !== record.Id);
    dispatch({
      type: 'disAndSyn/setStates',
      payload: {
        restSyn:rest,
        relateSyn:relate,
      },
    });
  };

  searchSyndrome = (value) => {
    const { dispatch }  = this.props;
    dispatch({
      type: 'disAndSyn/querySyn',
      payload: {
        key:value,
        pagesize:8,
        pageindex:1
      },
    });
  };

  handleRelate = () => {
    const {  disAndSyn:{diseaseId,relateSyn,defaultValue},dispatch } = this.props;
    let synIds = [];
    relateSyn.map(item => {
      synIds.push(item.Id)
    });
    dispatch({
      type: 'disAndSyn/updateRelate',
      payload: {
        DiseaseId:diseaseId,
        SyndromeIds:synIds,
      },
    });
    this.handleCancel()
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'disAndSyn/setStates',
      payload: {
        diseaseId:"",
        relateSyn:[],
        restSyn:[]
      },
    });
    dispatch({
      type: 'disease/setStates',
      payload: {
        relateModalVisible:false,
      },
    });
  };

  onRestChange = (pagination, filtersArg, sorter) => {
    const { dispatch,disAndSyn:{restKey} } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'disAndSyn/querySyn',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:restKey
      },
    });
  };

  render() {
    const { relateModalVisible, disAndSyn:{relateSyn,restSyn,restPagination} } = this.props;
    return (
      <Modal
        centered
        width={1200}
        title='关联证型'
        okText='完成'
        cancelText='取消'
        visible={relateModalVisible}
        destroyOnClose
        onOk={() => this.handleRelate()}
        onCancel={()=> this.handleCancel()}
        className={styles.formModal}
        maskStyle={{backgroundColor:'rgba(0,0,0,.3)'}}
      >
        <Row className="breadcrumb">
          <Col span={12} className="breadcrumb-title">
            <div className={styles["syndrome-title"]}>已关联证型</div>
            <Table
              pagination={{pageSize:8}}
              dataSource={relateSyn}
              columns={this.columns1}
              rowKey={item => item.Id}

            />
          </Col>
          <Col span={12} className={styles.breadcrumbTitle}>
            <div className={styles["syndrome-title"]}>
              <span>未关联证型</span>
              <Search
                placeholder="根据类型名称搜索类型"
                onSearch={value => this.searchSyndrome(value)}
                style={{ width: 300, marginLeft: 180 }}
              />
            </div>
            <Table
              pagination={restPagination}
              dataSource={restSyn}
              columns={this.columns2}
              rowKey={item => item.Id}
              onChange={(p,f,s)=>this.onRestChange(p,f,s)}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}



/* eslint react/no-multi-comp:0 */
@connect(({ disease,disAndSyn, loading }) => ({
  disease,
  disAndSyn,
  loading: loading.models.disease,
}))
@Form.create()
class Symtype extends PureComponent {
  columns = [
    {
      title: '类型名称',
      dataIndex: 'TypeName',
      width: '40%',
    },
    {
      title: '操作',
      width: '30%',
      render: (text, record) => {
        const {disease:{typeData}} = this.props;
        return typeData && typeData.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleRelateVisible(true,record)} className={styles.btn}>疾病关联</Button>
              <Button onClick={() => this.handleModalVisible(true,record)} className={styles.btn}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount(){
    const { dispatch,disease:{typeData,current,pageSize,searchKey} } = this.props;
    dispatch({
      type: 'disease/querySymType',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        key:searchKey
      },
    });
    console.log('@typeData',typeData)
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
        selectedRows:rows
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
        type: 'disease/querySymType',
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
    const { dispatch } = this.props;
    await dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:!!flag,
        Type:record ? newRecord:ClearDisease,
      },
    });
    if(flag && record){
      console.log('@key',record)
      dispatch({
        type:'disease/setState',
        payload:{
          Type:record
        }
      })
      setInfo.setBaseInfo();
    }
  };

  handleDelete = () => {
    const { dispatch,disease:{selectedRows,pageSize,current,searchKey} } = this.props;
    let Ids = [];
    selectedRows.map(item => {
      Ids.push(item.Id)
    });
    dispatch({
      type: 'disease/removeDisease',
      payload: {
        Ids:Ids,
      },
      callback:()=>{
        dispatch({
          type: 'disease/setStates',
          payload: {
            selectedRows:[],
          },
        });
        dispatch({
          type: 'disease/queryDisease',
          payload: {
            pagesize:pageSize,
            pageindex:current,
            key:searchKey
          },
        });
      }
    });
    message.success('删除成功');
  };


  // relate
  handleRelateVisible = (flag, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'disease/setStates',
      payload: {
        relateModalVisible:true
      },
    });

    dispatch({
      type: 'disAndSyn/changeIdEff',
      payload: record.Id,
      callback:()=>{
        dispatch({
          type: 'disAndSyn/queryRelate',
          payload:{
            DiseaseId:record.Id,
            pagesize:8,
            pageindex:1
          }
        });
        dispatch({
          type: 'disAndSyn/querySyn',
          payload:{
            key:'',
            pagesize:8,
            pageindex:1,
          }
        });
      }
    });
  };

  renderSimpleForm() {
    const {form: { getFieldDecorator },disease:{selectedRows}} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" justify="space-between">
          <Col md={8} lg={8} xl={8}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            {selectedRows && selectedRows.length > 0 && (
              <span>
                <Button onClick={() => this.handleDelete()}>批量删除</Button>
              </span>
            )}
          </Col>
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

  render() {
    const { disease: {selectedRows,typeData,pageSize,current,total }, loading, } = this.props;
    const data ={
      list: typeData,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
    };
    return (
      <PageHeaderWrapper title="类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <StandardTable
              rowKey='Id'
              selectedRows={selectedRows || []}
              loading={loading}
              data={data}
              childrenColumnName={'ChildrenTypes'}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
          <ManaForm  />
          {/*<RelateForm {...this.props} />*/}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Symtype;
