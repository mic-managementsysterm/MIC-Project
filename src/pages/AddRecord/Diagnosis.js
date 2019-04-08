import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Spin, Button, AutoComplete, Tabs, Radio, List, Tag, Row, Col,Upload, Icon, message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './Diagnosis.less';

const {Option} = AutoComplete

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
    super(props);
    this.state={
      loading:false,
      uploading: false,
      // modalVisible:false,
      selectedRows:[],
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
    const { dispatch ,disease:{current,pageSize,searchKey}} = this.props;
    dispatch({
      type: 'disease/queryDisease',
      payload: {
        pagesize:pageSize,
        pageindex:current,
        key:searchKey
      },
    });
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
        upload.Diagnoses = this.state.data;
        upload.MedicalImgs = this.state.base10Value;
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
    // @ts-ignore
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

  //获取base64
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  };

  handleChange = (info) => {
    const { base64 } = this.state;
    let base = base64;
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (info.fileList.length > 1) {
        info.fileList.splice(0, 1);
      }
      this.getBase64(info.file.originFileObj, imageUrl =>{
        base.push(imageUrl),
          this.setState({
            base64: base,
            uploading:false,
            imageUrl:null
          })
      });
    }
  }

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

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      // disAndSyn:{relateSyn,restSyn,restPagination},
      disease:{selectDiseaseRows,selectRelateRows,
        // diseaseData,dataSource,pageSize,current,total,modalVisible
      },
      // loading,
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
                {/* {getFieldDecorator('Diagnose', { */}
                {/* rules: [{ required: true, message: '请输入中医诊断!' }], */}
                {/* })( */}
                {/* <div> */}
                <Button onClick={()=>{this.handleDiagnosisAdd()}}>添加诊断</Button>
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
                          placeholder="input here"
                          optionLabelProp="text"
                        >
                          <Input />
                        </AutoComplete>
                        <Radio.Group
                          onChange={value => { this.onTyChange(value.target.value)}}
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
                  rules: [{ required: true, message: '请输入体格检查!' }],
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    accept=".jpg,.jpeg,.png"
                    className="avatar-uploader"
                    showUploadList={true}
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
