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
  Pagination
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

  onChange = (value) => {
    let {disease:{Type},dispatch} =this.props;
    Type.ParentId = value[value.length-1];
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
        if(Type.Id === ""){
          dispatch({
            type: 'disease/addSymType',
            payload: {
              Id:Type.Id,
              TypeName:Type.TypeName,
              ParentId:Type.ParentId
            },
            callback:()=>{
              // this.handleCancel();
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
          dispatch({
            type: 'disease/addSymType',
            payload: {
              ...Type
            },
            callback:()=>{
              // this.handleCancel();
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
        title={Type.Id === "" ? "新增四诊类型" : "编辑四诊类型"}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleCancel()}
      >

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="四诊类型名">
          {form.getFieldDecorator('TypeName', {
            rules: [{ required: true, message: '请输入类型名！', min: 1 }],
          })(<Input placeholder="请输入四诊类型名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="四诊类型">
          <Cascader
            placeholder='请选择四诊类型'
            options={typeData}
            fieldNames={fieldNames}
            onChange={this.onChange}
            changeOnSelect
            defaultValue={Type.ParentId?arr1=defaultValue : undefined}
          />
        </FormItem>
      </Modal>
    );
  }
}

@connect(({ symptomRelate,disease, loading }) => ({
  symptomRelate,
  loading: loading.models.symptomRelate,
  relateModalVisible: disease.relateModalVisible,
}))
@Form.create()
class RelateForm extends PureComponent {
  columns1= [
    {
      title: '症状名称',
      dataIndex: 'Name',
      width: 150,
      align: 'center',
    },{
      title: '症状拼音',
      dataIndex: 'PinYin',
      width: 100,
      align: 'center',
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 150,
      align: 'center',
      render: (text,record)=>(
        record ?
          <Button onClick={()=>this.deleteSyn(record)}>删除</Button>
          :null
      ),
    }];

  columns2=[
    {
      title: '症状名称',
      dataIndex: 'Name',
      width: 150,
      align: 'center',
    }, {
      title: '症状拼音',
      dataIndex: 'PinYin',
      width: 100,
      align: 'center',
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 150,
      align: 'center',
      render: (text,record)=>(
        record ?
          <Button onClick={()=>this.addSyn(record)} disabled={record.disabled}>添加</Button>
          :null
      ),
    }];

  addSyn = ( record ) => {
    let { symptomRelate:{relateSyn, restSyn},dispatch } = this.props;
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
      message.warning("已存在该症状！");
      return
    }
    rest.map(item=>{
      item.Id ===record.Id && (item.disabled = true)
    });
    dispatch({
      type: 'symptomRelate/setStates',
      payload: {
        restSyn:rest,
        relateSyn:relate,
      },
    });
  };

  deleteSyn = ( record ) => {
    let {symptomRelate:{relateSyn, restSyn},dispatch} = this.props;
    let relate = relateSyn.slice();
    let rest = restSyn.slice();
    rest.map( item=>{
      item.Id === record.Id && (item.disabled =false)
    } );
    relate = relate.filter(item => item.Id !== record.Id);
    dispatch({
      type: 'symptomRelate/setStates',
      payload: {
        restSyn:rest,
        relateSyn:relate,
      },
    });
  };

  searchSyndrome = (value) => {
    const { dispatch }  = this.props;
    dispatch({
      type: 'symptomRelate/querySyn',
      payload: {
        key:value,
        pagesize:8,
        pageindex:1
      },
    });
  };

  handleRelate = () => {
    const {  symptomRelate:{SymptomId,relateSyn,defaultValue},dispatch } = this.props;
    let synIds = [];
    relateSyn.map(item => {
      synIds.push(item.Id)
    });
    dispatch({
      type: 'symptomRelate/updateRelate',
      payload: {
        SymptomId:SymptomId,
        TypeIds:synIds,
      },
    });
    this.handleCancel()
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'symptomRelate/setStates',
      payload: {
        SymptomId:"",
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
    const { dispatch,symptomRelate:{restKey} } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'symptomRelate/querySyn',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:restKey
      },
    });
  };

  render() {
    const { relateModalVisible, symptomRelate:{relateSyn,restSyn,restPagination} } = this.props;
    return (
      <Modal
        centered
        width={1200}
        title='关联症状'
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
            <div className={styles["syndrome-title"]}>已关联症状</div>
            <Table
              pagination={{pageSize:8}}
              dataSource={relateSyn}
              columns={this.columns1}
              rowKey={item => item.Id}
              scroll={{ y: 320 }}
            />
          </Col>
          <Col span={12} className={styles.breadcrumbTitle}>
            <div className={styles["syndrome-title"]}>
              <span>未关联症状</span>
              <Search
                placeholder="根据症状名称或症状首字母搜索症状"
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
              scroll={{ y: 320 }}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ disease,symptomRelate, loading }) => ({
  disease,
  symptomRelate,
  loading: loading.models.disease,
}))
@Form.create()
class Symtype extends PureComponent {
  columns = [
    {
      title: '四诊类型名称',
      dataIndex: 'TypeName',
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => {
        const {disease:{typeData}} = this.props;
        return typeData && typeData.length >= 1
          ? (
            <div key={record.Id}>
              <Button onClick={() => this.handleRelateVisible(true,record)} className={styles.btn}>症状关联</Button>
              <Button onClick={() => this.handleModalVisible(true,record)} className={styles.btn}>编辑</Button>
            </div>
          ) : null
      },
    },
  ];

  componentDidMount(){
    const { dispatch,disease:{typeData,current,pageSize,searchKey,pagination,total,formValues} } = this.props;
    pagination.total=total
    pagination.pageSize=pageSize
    pagination.current=current
    pagination.change=(pageSize,current)=>{
      if (searchKey){
        pagination.current= 1,
          pagination.pageSize=pagination.pageSize,
          // pagination=pagination
        dispatch({
          type: 'disease/querySearchSymType',
          payload: {
            pagesize:pageSize,
            pageindex:current,
            key:searchKey,
            pagination:pagination
          },
        });
      }
        pagination.current= pagination.current,
          pagination.pageSize= pagination.pageSize,
      dispatch({
        type: 'disease/querySymType',
        payload: {
          pagesize:pageSize,
          pageindex:current,
          key:searchKey,
          pagination:pagination
        },
      });
    }

    dispatch({
      type: 'disease/querySymType',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        key:searchKey,
        pagination:pagination
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,disease:{formValues,searchKey} } = this.props;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    if (searchKey!==''){
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
        type: 'disease/querySearchSymType',
        payload: {
          pagesize:params.pageSize,
          pageindex:params.currentPage,
          key:searchKey,
          pagination:pagination
        },
      });
    }
    else {
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
        type: 'disease/querySymType',
        payload: {
          pagesize:params.pageSize,
          pageindex:params.currentPage,
          key:searchKey,
          pagination:pagination
        },
      });
    }
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
      type: 'disease/querySymType',
      payload: {
        pagesize:pageSize,
        pageindex:1,
        key:''
      },
    });
  };

  handleSelectRows = (rows) => {
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
      if(key){
        dispatch({
          type: 'disease/setStates',
          payload: {
            searchKey:key,
          },
        });
        dispatch({
          type: 'disease/querySearchSymType',
          payload: {
            key,
            pagesize:10,
            pageindex:1,
          },
        });
      }else {
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
            pagesize:10,
            pageindex:1,
          },
        });
      }
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
      type: 'disease/removeSymType',
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
          type: 'disease/querySymType',
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
      type: 'symptomRelate/changeIdEff',
      payload: record.Id,
      callback:()=>{
        dispatch({
          type: 'symptomRelate/queryRelate',
          payload:{
            SymptomTypeId:record.Id,
            pagesize:8,
            pageindex:1
          }
        });
        dispatch({
          type: 'symptomRelate/querySyn',
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
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} style={{  marginRight: 5 }}>
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
              <Input placeholder="请输四诊类型名称" style={{ width: 400,marginRight:20 }} />
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
    const { disease: {selectedRows,typeData,pageSize,current,total,pageIndex,searchKey,formValues }, loading, } = this.props;
    const data ={
      list: typeData,
      pagination: {
        total: total|| 0,
        pageSize:pageSize,
        current:current
      },
    };
    return (
      <PageHeaderWrapper title="四诊类型管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <StandardTable
              rowKey='Id'
              selectedRows={selectedRows || []}
              // pagination={pagination}
              loading={loading}
              data={data}
              childrenColumnName={'ChildrenTypes'}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            >
            </StandardTable>
          </div>
          <ManaForm  />
          <RelateForm {...this.props} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Symtype;
