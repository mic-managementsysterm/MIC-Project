import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Spin, Button, AutoComplete, Modal, Tabs, List, message, Col, Row, Tag, Icon, Radio, Upload,Table
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import { service, diagnosisImgCount } from "@/services/config";

import styles from './Diagnosis.less';

const { TabPane} = Tabs;
const { Option } = AutoComplete;
const {Search} = Input;
const clearState ={
  diagSearchValue:'',
  diagData:[],
  diaAndSynData:[],
  selectDiagnose:null,
  selectRelateRows:[],
  modalVisible:false,
  synData:[],
  synSearchKey:'',
  synCurrent:1,
  synPageSize:8,
  synTotal:0,
};

@connect(({ addMedical,routerParams, loading }) => ({
  addMedical,
  routerParams,
  loading: loading.models.addMedical,
}))
class DiagnosisForm extends PureComponent {
  columns=[
    {
      title: '证型名称',
      dataIndex: 'Name',
      width: 150,
      align: 'center',
    }, {
      title: '证型拼音',
      dataIndex: 'PinYin',
      width: 100,
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

  constructor(props){
    super(props)
    this.state={
      loading:false,
      uploading: false,
      visible:false,
      diagnoseData:[],
      diagnoseType:'see',
      searchText:'',
      fourDiagnoseData: [],
      fourDiagnoseType:'see',
      data: [],
      imgUrl: [],
      fileList: [],
      previewVisible: false,
      previewImage: '',
      current:1,
      total:0,
    }
  }

  componentWillUnmount(){
    const {dispatch} =this.props;
    dispatch({
      type: 'addMedical/set',
      payload: {
        ...clearState
      },
    });
  }

  format = () => {
    const {data,imgUrl} =this.state;
    let medicalSymtoms = [];
    let medicalImages = [];
    data.map((value,index)=>{
      medicalSymtoms.push({
        Order:index,
        SymptomId:value.Id,
        SymptomName:value.Name,
        SymptomLevel:1,
      })
    });
    imgUrl.map((value)=>{
      medicalImages.push({
        Img:value
      })
    });
    return {medicalSymtoms,medicalImages}
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading:true
    });
    let upload = {};
    const {addMedical:{diagData}}=this.props
    console.log('@diagData',diagData)
    let data=[]
    diagData.map((item)=>{
      data.push({
        DiagnoseName:item.diagnose.Name,
        DiagnoseId:item.diagnose.Id,
        ParentId:null
      })
      if(item.children.length > 0){
        item.children.map(children => {
          data.push({
            DiagnoseName:children.Name,
            DiagnoseId:children.Id,
            ParentId:item.diagnose.Id
          })
        })
      }
    })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let formatParams = this.format();
        upload.RespondentId = this.props.routerParams.Respondent.Id;
        upload.ZS = values.ZS;
        upload.XBS = values.XBS;
        upload.JWS = values.JWS;
        upload.GMS = values.GMS;
        upload.TGJC = values.TGJC;
        upload.Diagnoses = data;
        upload.Symptoms = formatParams.medicalSymtoms;
        upload.MedicalImgs = formatParams.medicalImages;
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

  // tab部分
  handleMore = () =>{
    const {dispatch} =this.props;
    this.setState({
      visible: !this.state.visible
    });
    dispatch({
      type: 'addMedical/getSym',
      payload: {
        type:'see',
        key:'',
        pagesize:10,
        pageindex:1,
      },
      callback:(res)=>{
        this.setState({
          fourDiagnoseData:res.rows,
          total:res.total
        })
      }
    });
  };

  changeTab = (type) =>{
    const {dispatch} =this.props;
    dispatch({
      type: 'addMedical/getSym',
      payload: {
        type:type,
        pagesize:10,
        pageindex:1,
      },
      callback:(res)=>{
        this.setState({
          fourDiagnoseData:res.rows,
          fourDiagnoseType:type,
          total:res.total,
          current:1,
        })
      }
    });
  };

  // 绘制tab
  renderRow = () =>{
    const { fourDiagnoseData,data,current,total,fourDiagnoseType } = this.state;
    const pageChange = (page) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'addMedical/getSym',
        payload: {
          type:fourDiagnoseType,
          key:'',
          pagesize:10,
          pageindex:page,
        },
        callback:(res)=>{
          this.setState({
            fourDiagnoseData:res.rows,
            current:res.pageindex
          })
        }
      });
    };
    const addTag = (item) =>{
      let da =data.slice();
      da.push(item);
      this.setState({data:da})
    };
    return(
      <List
        itemLayout="horizontal"
        size="small"
        style={{ width: 600 }}
        pagination={{
          onChange: (page) => pageChange(page),
          pageSize: 10,
          current:current,
          total:total
        }}
        dataSource={fourDiagnoseData}
        renderItem={item =>(
          <List.Item actions={[<Button onClick={()=>addTag(item)}>添加</Button>]}>
            <div style={{ width: 560}}>{item.Name}</div>
          </List.Item>
        )}
      />
    )
  };

  // 图片
  beforeUpload = file => {
    const isImage = file.type.indexOf('image') !==-1;
    if (!isImage) {
      message.error({
        title: '只能上传图片',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不超过2MB!');
    }
    /* eslint consistent-return:0 */
    return isImage && isLt2M;
  };

  handleChange = (info) => {
    const { imgUrl } = this.state;
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
    }
    if (info.file.status === 'done') {
      let imgNew = [...imgUrl,info.file.response.Data]
      this.setState({
        imgUrl:imgNew,
        uploading:false,
        fileList:info.fileList
      })
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  onRemove = (file) =>{
    this.setState((preState)=>({
      imgUrl:preState.imgUrl.filter( item=> item !== file.response.Data)
    }))
  }

  // 四诊信息
  renderOption = (item) => {
    return (
      <Option key={item.Id} text={item.Name} data={item}>
        <span>{`${item.Name}\t${item.PinYin}`}</span>
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
          diagnoseData:res.rows,
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
          diagnoseData:res.rows,
          diagnoseType:type
        })
      }
    });
  };

  onSelect = (key,option) => {
    const { data } = this.state;
    let da =data.slice();
    da.push(option.props.data);
    this.setState({data:da})
  };

  renderTag = (data) =>{
    return data.map(disease=>{
      return (<Tag key={disease.Id} closable>{disease.Name}</Tag>
      )
    })
  };

  // table
  searchSyndrome = (value) => {
    const { dispatch }  = this.props;
    dispatch({
      type: 'addMedical/querySyn',
      payload: {
        key:value,
        pagesize:8,
        pageindex:1
      },
    });
  };

  handleStandardTableChange = (pagination, ) => {
    const { dispatch,addMedical:{synSearchKey} } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'addMedical/querySyn',
      payload: {
        pagesize:params.pageSize,
        pageindex:params.currentPage,
        key:synSearchKey
      },
    });
  };

  handleSelectRelateRows = rows =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'addMedical/set',
      payload: {
        selectRelateRows:rows.slice()
      },
    });
  };

  handleModalVisible = (diag) => {
    const { dispatch } = this.props;
    if (diag.diagnose.Type === 1) {
      dispatch({
        type: 'addMedical/setStates',
        payload: {
          modalVisible:true,
          selectDiagnose:diag,
          selectRelateRows:diag.children
        },
        callback:()=>{
          dispatch({
            type: 'addMedical/querySyn',
            payload:{
              key:'',
              pagesize:8,
              pageindex:1,
            },
          });
        }
      });
    }
  };

  handleCancelRelate = () => {
    const {dispatch}=this.props
    dispatch({
      type: 'addMedical/set',
      payload: {
        modalVisible:false,
        selectRelateRows:[]
      },
    });
  };

  handleRelateOk=()=>{
    const { dispatch ,addMedical:{diagData,selectDiagnose,selectRelateRows}} = this.props;
    let diagDataTmp = diagData.slice();
    let rowsTmp = selectRelateRows.slice();

    diagData.slice().map((diag,index)=>{
      if (diag.diagnose.Id === selectDiagnose.diagnose.Id) {
        diagDataTmp[index].children= rowsTmp
      }
    })
    dispatch({
      type: 'addMedical/set',
      payload: {
        modalVisible:false,
        diagData:diagDataTmp,
        selectRelateRows:[]
      },
    });
  }

  // table


  // 中医诊断
  select=(value,option)=>{
    const { addMedical:{diagData}, dispatch} = this.props;
    let flag = false;
    diagData.map((d)=>{
      if (d.Id === option.props.data.Id) {
        flag = true;
      }
    });
    if(!flag){
      this.handleSelectRows(option.props.data);
    }else {
      message.error('请勿重复选择');
    }
    dispatch({
      type: 'disease/setStates',
      payload: {
        value:''
      },
    });
  };

  handleSearch=(value)=>{
    const { dispatch } = this.props;
    const key=value;
    dispatch({
      type: 'addMedical/queryDisAndSyn',
      payload: {
        key,
        pagesize:10,
        pageindex:1,
      }
    });
  };

  addSyn = ( record ) => {
    const {addMedical:{selectRelateRows,synData},dispatch } = this.props;
    let select = selectRelateRows.slice();
    let newSyn = synData.slice();
    select.push(record)
    synData.map((syn,index) => {
      if( syn.Id === record.Id ){
        newSyn[index].disabled = true;
      }
    })
    dispatch({
      type: 'addMedical/set',
      payload: {
        selectRelateRows:select,
        synData:newSyn,
      },
    });
  };

  removeSyn = (tag,tagIdx) =>{
    const {addMedical:{selectRelateRows,synData},dispatch } = this.props;
    let select = selectRelateRows.slice();
    let newSyn = synData.slice();
    select.splice(tagIdx,1);
    synData.map((syn,index) => {
      if(syn.Id === tag.Id){
        newSyn[index].disabled = false;
      }
    })
    dispatch({
      type: 'addMedical/set',
      payload: {
        selectRelateRows:select,
        synData:newSyn,
      },
    });
  };

  renderOptionItem=(item)=>{
    return (
      <Option key={item.Name} text={item.Name} data={item}>
        {item.Name}
      </Option>
    );
  };

  // tagClose
  handleClose=(removedTag)=>{
    const { dispatch,addMedical:{selectSyn,diagData}} = this.props;
    const newDiagData = diagData.filter( item =>
      item.diagnose.Id !== removedTag.Id
    );
    dispatch({
      type: 'addMedical/set',
      payload: {
        diagData:newDiagData,
        selectSyn: []  //添加
      },
    });
  }

  handleSelectRows = (rowItem) => {
    const { dispatch,addMedical:{diagData} } = this.props;
    let newDiag = diagData.slice();

    newDiag.push({
      diagnose:rowItem,
      children:[]
    });

    dispatch({
      type: 'addMedical/set',
      payload: {
        diagData:newDiag,
      },
    });
  };

  renderRelate = (arr) => {
    if(arr.length === 0){
      return ''
    }
    let arrTmp = arr.map(item => item.Name);
    return `(${arrTmp.join('、')})`
  };
  // 中医诊断



  render() {
    const { getFieldDecorator } = this.props.form;
    const {addMedical:{diagData,modalVisible,diaAndSynData,
      selectRelateRows,synData,synCurrent,synPageSize,synTotal},loading} = this.props;
    const { diagnoseData, data, previewVisible, previewImage,fileList } =this.state;
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
    const uploadButton = (
      <div>
        <Icon type={this.state.uploading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderWrapper title="四诊数据采集" loading={loading}>
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
                  rules: [{ message: '请输入现病史！'}],
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
                  rules: [{ message: '请输入既往史!' }],
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
                  rules: [{ message: '请输入过敏史!', whitespace: true }],
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
                  rules: [{ message: '请输入体格检查!' }],
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
                <AutoComplete
                  dataSource={diaAndSynData.map(this.renderOptionItem)}
                  // value={diagSearchValue}
                  placeholder="请输入中医诊断"
                  onSelect={this.select}
                  onSearch={(searchVlaue)=>this.handleSearch(searchVlaue)}
                  optionLabelProp="text"
                >
                  <Input />
                </AutoComplete>
                {
                  diagData.length !== 0 && diagData.slice().map((item)=>{
                    return (
                      <Tag key={item.diagnose.Id} closable onClose={() => this.handleClose(item.diagnose,1)}>
                        <span onClick={()=>{this.handleModalVisible(item)}}>
                          {item.diagnose.Name}
                          {this.renderRelate(item.children)}
                        </span>
                      </Tag>
                      )
                  })
                }
              </Form.Item>
              <Form.Item>
                <Modal
                  centered
                  destroyOnClose
                  width={1000}
                  title="关联证型"
                  visible={modalVisible}
                  onOk={()=>{this.handleRelateOk()}}
                  onCancel={() => this.handleCancelRelate()}
                >
                  <Row className={styles.breadcrumb}>
                    <div className={styles.search}>
                      <Search
                        placeholder="根据疾病名称或疾病首字母搜索证型"
                        onSearch={searchValue => this.searchSyndrome(searchValue)}
                      />
                    </div>
                    {
                      selectRelateRows.map((item,index) =>{
                        return(
                          <Tag
                            key={item.Id}
                            closable
                            onClose={() => this.removeSyn(item,index)}
                          >
                            {item.Name}
                          </Tag>
                        )
                      })
                    }
                    <Table
                      // selectedRows={selectRelateRows}
                      pagination={{
                        total:synTotal,
                        pageSize:synPageSize,
                        current:synCurrent,
                      }}
                      dataSource={synData}
                      onSelectRow={(rows)=>this.handleSelectRelateRows(rows)}
                      onChange={this.handleStandardTableChange}
                      columns={this.columns}
                      rowKey={item => item.Id}
                    />
                  </Row>
                </Modal>
              </Form.Item>
              <Form.Item
                label="四诊信息"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                className={styles.form}
              >
                {getFieldDecorator('DiagnoseInfo', {
                  rules: [{message: '请输入四诊信息!' }],
                })(
                  <div>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <AutoComplete
                          className="global-search"
                          size="large"
                          style={{ width: '100%' }}
                          dataSource={diagnoseData.map(this.renderOption)}
                          onSelect={this.onSelect}
                          onSearch={this.onSearch}
                          placeholder="请输入疾病中文名、证型中文名、疾病首字母或证型首字母"
                          optionLabelProp="text"
                        >
                          <Input />
                        </AutoComplete>
                        <Radio.Group
                          onChange={event => { this.onTyChange(event.target.value)}}
                          defaultValue=""
                        >
                          <Radio value="">全部</Radio>
                          <Radio value="see">望</Radio>
                          <Radio value="smell">闻</Radio>
                          <Radio value="ask">问</Radio>
                          <Radio value="touch">切</Radio>
                          <Radio value="other">其他</Radio>
                        </Radio.Group>
                      </div>
                      <Button onClick={() => {this.handleMore()}} style={{ marginLeft: 5, marginTop: 4 }}>更多</Button>
                    </div>
                    {this.renderTag(data)}
                  </div>
                )}
              </Form.Item>
              <Form.Item
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
              >
                {this.state.visible ?
                  <Row>
                    <Col span={12} offset={8}>
                      <Tabs onChange={this.changeTab} type="card" defaultActiveKey="see" style={{ width: 600, alignItems: 'center' }}>
                        <TabPane tab="望" key="see">
                          {this.renderRow()}
                        </TabPane>
                        <TabPane tab="闻" key="smell">
                          {this.renderRow()}
                        </TabPane>
                        <TabPane tab="问" key="ask">
                          {this.renderRow()}
                        </TabPane>
                        <TabPane tab="切" key="touch">
                          {this.renderRow()}
                        </TabPane>
                        <TabPane tab="其他" key="other">
                          {this.renderRow()}
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row> : null}
              </Form.Item>
              <Form.Item
                label="四诊照片"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                className={styles.form}
              >
                {getFieldDecorator('SZZP', {
                  rules: [{ message: '请选择四诊照片!' }],
                })(
                  <div>
                    <Upload
                      name="file"
                      action={`${service}/file/upload/image`}
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList
                      accept="image/*"
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChange}
                      onPreview={this.handlePreview}
                      onRemove={this.onRemove}
                    >
                      {fileList.length >= diagnosisImgCount ? null: uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
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
