import React from 'react';
import {Spin , Button, Input, Icon,InputNumber,Upload ,Row,message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import router from 'umi/router';
import { connect } from 'dva';
const list=[];
const fileList=[];

@connect(({question,loading})=>({
  question,
  loading:loading.models.loading
}))
class QuestionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleAddRadio = this.handleAddRadio.bind(this);
    this.handleAddCheckbox = this.handleAddCheckbox.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleShiftQuestion = this.handleShiftQuestion.bind(this);
    this.handleCopyQuestion = this.handleCopyQuestion.bind(this);
    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
    // this.handleDatePick = this.handleDatePick.bind(this);
    this.handleSaveQuestionnaire = this.handleSaveQuestionnaire.bind(this);
    // this.handleReleaseQuestionnaire = this.handleReleaseQuestionnaire.bind(this);
    this.handleIndex=this.handleIndex.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.beforeUpload=this.beforeUpload.bind(this);
    this.checkImageWH=this.checkImageWH.bind(this)
    this.state = {
      titleEditable:false,
      addAreaVisible:false,
      questions:{
        Id:         null,
        Name:       null,
        TotalScore: null,
        PassScore:  null,
        Topics:     [
          {
            Id:              null,
            QuestionnaireId: null,
            Title:           null,
            Image :          null,
            Order:           null,
            GroupName:       null,
            TotalScore:      null,
            Type:            null,
            // CreatedAt:       null /* 2018-07-23 10:04:30 */
          }
        ],
        // CreatedAt:  null,
      }
      ,
      defaultGroupName:null,
      fileList:[],
      indexCurrent:null,
      loading1:false,
      loading2:false,
      showLoading:false,
    };
  }

  handleTitleClick() {
    this.setState({
      titleEditable: true
    })
  }
  componentWillMount(){
    const Id=this.props.location.query.Id
    this.getQuestion(Id)

  }
  getQuestion=(Id)=>{
    const {dispatch}=this.props
    dispatch({
      type:'question/getQuestion',
      payload:{
        Id
      },callback:()=>{
        const {question:{question}}=this.props
        this.setState({
          questions:question
        })
      }
    })
  }

  handleTitleChange(e) {
    this.state.questions.Name=e.target.value
    this.setState({
      questions:this.state.questions
    })
  }

  handleTitleBlur() {
    this.setState({
      titleEditable: false
    })
  }

  handleAddQuestion() {
    this.setState({
      addAreaVisible: !this.state.addAreaVisible
    })
  }

  handleAddRadio() {
    const newQuestion = {
      Type: 0,
      Id:'',
      QuestionnaireId:'',
      Image:null,
      Order:null,
      GroupName:'',
      TotalScore:null,
      Title: '类型一',
    };
    if (this.state.defaultGroupName){
      newQuestion.GroupName=this.state.defaultGroupName
    }else {

    }
    this.state.questions.Topics.push(newQuestion)
    this.setState( {
      questions: this.state.questions,
      addAreaVisible: false
    });
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  beforeUpload(file) {
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
      message.error({
        title: '超过2M限制 不允许上传~',
      });
      return;
    }
    return (isJPG || isJPEG || isGIF || isPNG) && isLt2M && this.checkImageWH(file);
  }
  //返回一个 promise：检测通过则返回resolve；失败则返回reject，并阻止图片上传
  checkImageWH(file) {
    let self = this;
    return new Promise(function(resolve, reject) {
      let filereader = new FileReader();
      filereader.onload = e => {
        let src = e.target.result;
        const image = new Image();
        image.onload = function() {
          // 获取图片的宽高，并存放到file对象中
          file.width = this.width;
          file.height = this.height;
          resolve();
        };
        image.onerror = reject;
        image.src = src;
      };
      filereader.readAsDataURL(file);
    });
  }
  handleChange = (info) => {
    const {indexCurrent}=this.state
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if (info.fileList.length>1){
        info.fileList.splice(0,1);
      }
      this.getBase64(info.file.originFileObj, imageUrl =>{
        const base64Img=imageUrl
          // this.state.questions.Topics[this.state.indexCurrent].Image=null,
          // this.setState({
          //   questions:this.state.questions,
          //   // loading:false,
          //   // imageUrl:null
          // })
          this.state.questions.Topics[indexCurrent].Image=imageUrl,
          this.setState({
            questions:this.state.questions,
            loading:false,
            imageUrl:null
          })
      });
    }
  }
  handleAddCheckbox() {
    const newQuestion = {
      Id:'',
      QuestionnaireId:'',
      Image:null,
      Order:null,
      GroupName:'',
      Type: 1,
      TotalScore:null,
      Title: '类型二',
    };
    if (this.state.defaultGroupName){
      newQuestion.GroupName=this.state.defaultGroupName
    }else {

    }
    this.state.questions.Topics.push(newQuestion)
    this.setState({
      questions: this.state.questions,
      addAreaVisible: false
    });
  }


  handleQuestionChange(e, questionIndex,int) {
    let { questions } = this.state;
    if (int===1) {
      questions.Topics[questionIndex].Title = e.target.value;
      this.setState({
        questions: questions
      });
    }else {

      questions.Topics[questionIndex].GroupName = e.target.value;
      this.setState({
        defaultGroupName:e.target.value,
        questions: questions
      });
    }
  }

  handleShiftQuestion(questionIndex, num) {
    let { questions } = this.state;
    let shiftQuestion = questions.Topics.splice(questionIndex, 1)[0];
    questions.Topics.splice(questionIndex + num, 0, shiftQuestion);
    this.setState({
      questions: questions
    })
  }

  handleCopyQuestion(questionIndex) {
    let { questions } = this.state;
    let copy = Object.assign({}, questions.Topics[questionIndex]);
    // if (questions.Topics[questionIndex].Type !== 1) {
    //   // copy.options = copy.options.slice(0);
    // }
    questions.Topics.splice(questionIndex + 1, 0, copy);
    this.setState({
      questions: questions
    });
  }

  handleRemoveQuestion(questionIndex) {
    let { questions } = this.state;
    questions.Topics.splice(questionIndex, 1);
    this.setState({
      questions: questions
    });
  }


  // handleDatePick(date, dateString) {
  //   const {questions}=this.state
  //   questions.CreatedAt=dateString
  //   this.setState({
  //     questions:questions
  //   })
  // }

  handleSaveQuestionnaire(body) {
    this.setState({
      showLoading:true
    })
    const {question:{question},dispatch}=this.props
    // question=body
    dispatch({
        type: 'question/changeQuestion',
        payload: { body }, callback: () => {
          const { question: { res } } = this.props
          if (res.Success) {
            this.setState({
              showLoading: false
            })
            router.push('/gauge/question-list')
            message.success('保存成功')
          } else {
            this.setState({
              showLoading: false
            })
            message.error(res.Message)
          }
        }
      }
    )
  }

  // handleReleaseQuestionnaire() {
  //   let me = this;
  //
  //   if (this.state.questions.length === 0) {
  //     message.warning({
  //       title: '请添加至少一个问题'
  //     });
  //   } else if (this.state.date === '') {
  //     message.warning({
  //       title: '请选择截止日期'
  //     });
  //   } else {
  //     message.confirm({
  //       title: '确定发布问卷吗？',
  //       content: '截止日期为 ' + this.state.date,
  //       onOk() {
  //         const index = me.state.index;
  //         list[index] = Object.assign({}, {...me.state, stage: '发布中'});
  //         localStorage.list = JSON.stringify(list);
  //         window.location.reload();
  //         me.props.history.push('/');
  //       }
  //     });
  //   }
  // }

  onChangeInt=(value,quesIndex)=>{
    let { questions } = this.state;
    questions.Topics[quesIndex].TotalScore = value;
    this.setState({
      questions: questions
    });
  }

  getTitle() {
    return (
      this.state.titleEditable ? (
        <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 3, textAlign: 'center' }} onClick={this.handleTitleClick}>
          <Input style={{ fontSize: 18, fontWeight: 'bold', padding: 30, textAlign: 'center' }} value={this.state.questions.Name} onChange={this.handleTitleChange} onBlur={this.handleTitleBlur} />
        </div>
      ) : (
        <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 20, textAlign: 'center' }} onClick={this.handleTitleClick}>
          <h2><strong>{this.state.questions.Name}</strong></h2>
        </div>
      )
    );
  }

  getAddArea() {
    return (
      this.state.addAreaVisible ? (
        <div style={{ padding: 30, textAlign: 'center', border: '1px solid #eee' }}>
          <Button icon="check-circle-o" size="large" onClick={this.handleAddRadio}>类型一</Button>
          <Button icon="check-square-o" size="large" style={{ marginLeft: 16 }} onClick={this.handleAddCheckbox}>类型二</Button>
        </div>
      ) : ''
    );
  }
  handleIndex=(index)=>{
    this.setState({
      indexCurrent:index,
      loading:true
    })
  }

  getQuestions() {
    let questions = this.state.questions;
    const { TextArea } = Input;
    return questions.Topics.map((question, questionIndex, array) => {
      const uploadButton = (
        <div onClick={()=>this.handleIndex(questionIndex)}>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const handleChange = (info) => {
        const {indexCurrent}=this.state
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          if (info.fileList.length>1){
            info.fileList.splice(0,1);
          }
          this.getBase64(info.file.originFileObj, imageUrl =>{
            const base64Img=imageUrl
              this.state.questions.Topics[questionIndex].Image=imageUrl,
              this.setState({
                questions:this.state.questions,
                loading:false,
                imageUrl:null
              })
          });
        }
      }
      if (question.Type === 0||1) {
        return (
          <div className="questionsWrap" style={{ padding: 30 }} key={questionIndex}>
            <div>
            <span>题目类型</span>
            <Input value={question.GroupName} style={{ borderStyle: 'none', width: '90%', marginLeft: 3,marginBottom:10 }} onChange={(e) => this.handleQuestionChange(e, questionIndex,2)}></Input>
            </div>
            <span>Q{questionIndex + 1}</span>
            <Input value={question.Title} style={{ borderStyle: 'none', width: '97%', marginLeft: 3 }} onChange={(e) => this.handleQuestionChange(e, questionIndex,1)} />
            <Row style={{float:'right'}}>
              <span >总分：</span>
              <InputNumber style={{marginTop:5}} min={1} max={10} value={question.TotalScore} onChange={(value)=>this.onChangeInt(value,questionIndex)}/>
            </Row>
            <div style={{marginTop:5}}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                data={file => ({ // data里存放的是接口的请求参数
                  // param1: myParam1,
                  // param2: myParam2,
                  photoCotent: file, // file 是当前正在上传的图片
                  photoWidth: file.height, // 通过  handleBeforeUpload 获取 图片的宽高
                  photoHeight: file.width,
                })}
                // action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={this.beforeUpload}
                onChange={handleChange}>
                {
                  question.Image? <div >
                    <img style={{width:250,height:250}}  src={question.Image} alt=""/>
                  </div>:uploadButton
                }
              </Upload>
            </div>
            {this.getQuestionOperator(questionIndex,questions.Topics)}
          </div>
        );
      }
      else {
        return null;
      }
    })
  }


  getQuestionOperator(questionIndex, array) {
    return (
      <div>
        <p style={{ float: 'right' }}>
          {questionIndex === 0 ? (
            null
          ) : (
            <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleShiftQuestion(questionIndex, -1)}>上移</span>
          )}
          {questionIndex === array.length - 1 ? (
            null
          ) : (
            <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleShiftQuestion(questionIndex, 1)}>下移</span>
          )}
          <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleCopyQuestion(questionIndex)}>复用</span>
          <span className="questionOperate" style={{ marginLeft: 8 }} onClick={() => this.handleRemoveQuestion(questionIndex)}>删除</span>
        </p>
      </div>
    );
  }

  getFooter() {
    const disabledDate = (current) => current && current.valueOf() < Date.now();

    return (
      <div style={{ padding: 20 }}>
        {/*<div style={{ float: 'left' }}>*/}
        {/*<span>问卷截止日期：</span>*/}
        {/*<DatePicker onChange={this.handleDatePick} disabledDate={disabledDate} />*/}
        {/*<span style={{ marginLeft: 16 }}>你选择的日期为: {this.state.questions.CreatedAt }</span>*/}
        {/*</div>*/}
        <div style={{ float: 'right' }}>
          <Button onClick={()=>this.handleSaveQuestionnaire(this.state.questions)}>保存问卷</Button>
          {/*<Button type="primary" style={{ marginLeft: 16 }} onClick={this.handleReleaseQuestionnaire}>发布问卷</Button>*/}
        </div>
      </div>
    );
  }
  onChangeTotalInt=(value)=>{
    const {questions}=this.state
    questions.TotalScore=value;
    this.setState({
      questions:questions
    })
  }
  onChangePassInt=(value)=>{
    const {questions}=this.state
    questions.PassScore=value;
    this.setState({
      questions:questions
    })
  }
  render() {
    const {question:{showLoading}}=this.props
    return (
      <Spin spinning={this.state.showLoading} tip={'正在保存'}>
        <div>
          {this.getTitle()}
          <div>
            <span >总分：</span>
            <InputNumber style={{marginTop:5}} min={1} max={50} value={this.state.questions.TotalScore}  onChange={(value)=>this.onChangeTotalInt(value)}/>
            <span >及格分数：</span>
            <InputNumber style={{marginTop:5}} min={1} max={50} value={this.state.questions.PassScore}  onChange={(value)=>this.onChangePassInt(value)}/>
          </div>
          <div>

          </div>
          <div style={{ padding: 20, borderTop: '2px solid #ccc', borderBottom: '2px solid #ccc' }}>
            <div style={{ marginBottom: 20 }}>
              {this.getQuestions()}
            </div>
            {this.getAddArea()}
            <div className="addQuestion" style={{ wdith: '100%', height: '100%', padding: 30, background: '#eee', textAlign: 'center'}} onClick={this.handleAddQuestion}>
              添加问题
            </div>
          </div>
          {this.getFooter()}
        </div>
      </Spin>
    );
  }
}

export default QuestionEdit;
