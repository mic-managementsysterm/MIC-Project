import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Spin, Button, AutoComplete, Modal, Tabs, List, message, Col, Row,Tag,Icon,Radio,Upload
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

import styles from './Diagnosis.less';

const { TabPane } = Tabs;
const { Option } = AutoComplete;

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
  ];

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
      base64: [],
      current:1,
      total:0,
    }
  }



  componentDidMount() {
    this.handleSelectRows([]);
    this.handleSelectRelateRows([])
  }

  format = () => {
    const {data,base64} =this.state;
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
    base64.map((value)=>{
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
    const {disease:{DSNoData}}=this.props
    let data=[];
    DSNoData.map((item)=>{
      const row={DiagnoseName:item.Name||item.DiagnoseName,DiagnoseId:item.Id||item.DiagnoseId,ParentId:item.ParentId||''}
      data= data.concat(row)
    });
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

  handleMore = () =>{
    const {dispatch} =this.props;
    this.setState({
      visible: true
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

  renderTag = (data) =>{
    return data.map(disease=>{
      return (<Tag key={disease.Id} closable>{disease.Name}</Tag>
      )
    })
  };

  // 获取base64
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error({
        title: '只能上传JPG格式的图片~',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M
  };

  handleChange = (info) => {
    const { base64 } = this.state;
    let base = base64;
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (info.fileList.length > 3) {
        info.fileList.splice(0, 1);
      }
      this.getBase64(info.file.originFileObj, imageUrl =>{
        base.push(imageUrl);
        this.setState({
          base64: base,
          uploading:false,
          imageUrl:null
        })
      });
    }
  };

  // auto
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

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,disease:{formValues,searchKey} } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
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
    const { dispatch,disease:{selectDiseaseRows,DSNoData} } = this.props;
    if (int===0) {
      const row=rows.map(i=>{return{...i}});
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
    const { dispatch } = this.props;
    dispatch({
      type: 'disease/setStates',
      payload: {
        selectRelateRows:rows.slice()
      },
    });
  };

  handleModalVisible = (record) => {
  const { dispatch } = this.props;
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
    selectDiseaseRows.slice().map((item)=>{
      selectRelateRows.slice().map((d)=>{
        if (item.Id===selectedId) {
          item.Name=item.Name+'('+d.Name+')';
          const row=[{ParentId:selectedId,DiagnoseId:d.Id,DiagnoseName:d.Name}];
          const rows=row.slice();
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
    });
    dispatch({
      type: 'disease/setStates',
      payload: {
        modalVisible:false,
        // Disease:ClearDisease,
      },
    });
    this.handleSelectRelateRows([])
  };

  handleClose=(removedTag,int)=>{
    const { disease:{selectDiseaseRows,selectRelateRows}} = this.props;
    if (int===1) {
      const tags = selectDiseaseRows.filter(function(disease) {
        return disease.Id!==removedTag.Id;
      });
      this.handleSelectRows(tags,1)
    }
     else {
      const rows = selectRelateRows.filter(function(relate) {
        return relate.Id!==removedTag.Id;
      });

      this.handleSelectRelateRows(rows,1)
    }
  };

  select=(value,option)=>{
    const { disease:{DSNoData}, dispatch} = this.props;
    if (DSNoData.length===0){
      this.handleSelectRows([{Name:value,Id:option.props.text}],0)
      dispatch({
        type: 'disease/setStates',
        payload: {
          value:''
        },
      });
    } else {
      let flag = false;
      DSNoData.map((d)=>{
        if (d.Id === option.props.text) {
          message.error('请勿重复选择');
          flag = true;
        }
      });
      if(!flag){
        this.handleSelectRows([{Name:value,Id:option.props.text}],0);
        dispatch({
          type: 'disease/setStates',
          payload: {
            value:''
          },
        });
      }
    }
  };

  handleSearch=(value)=>{
      const { dispatch } = this.props;
       const key=value;
         dispatch({
          type: 'disease/setStates',
          payload: {
            searchKey:key,
            value:value,
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
  };

  renderOptionItem=(item)=>{
    return (
      <Option key={item.Name} text={item.Id}>
        {item.Name}
      </Option>
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      disAndSyn:{relateSyn},
      disease:{value,DSdata, selectDiseaseRows,selectRelateRows,modalVisible },
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
    const { diagnoseData, data,imageUrl } =this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.uploading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
                <AutoComplete
                  dataSource={DSdata.map(this.renderOptionItem)}
                  value={value}
                  placeholder="请输入中医诊断"
                  onSelect={this.select}
                  onSearch={(key)=>this.handleSearch(key)}
                  optionLabelProp="text"
                >
                  <Input />
                </AutoComplete>
                {
                  selectDiseaseRows.map((disease)=>{
                    return (
                      <Tag
                        key={disease.Id}
                        closable
                        onClose={() => this.handleClose(disease,1)}
                      >
                        <span onClick={()=>{this.handleModalVisible(disease.Id)}}>
                          {disease.Name}
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
                          placeholder="请输入疾病中文名、者证型中文名、疾病首字母或证型首字母"
                          optionLabelProp="text"
                        >
                          <Input />
                        </AutoComplete>
                        <Radio.Group
                          onChange={event => { this.onTyChange(event.target.value)}}
                          defaultValue="see"
                        >
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
                  rules: [{ required: true, message: '请选择四诊照片!' }],
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    accept=".jpg,.jpeg,.png"
                    className="avatar-uploader"
                    showUploadList
                    action=""
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                  </Upload>
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
