import React from 'react';
import {Spin , DatePicker, Button, Input, Checkbox, Icon, Modal,InputNumber,Upload ,Row,message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
// import './Edit.css';

// const list = localStorage.list ? JSON.parse(localStorage.list) : [];
const list=[]
// const editing = localStorage.editing ? JSON.parse(localStorage.editing) : [];
const fileList=[]


class Edit extends React.Component {
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
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextRequire = this.handleTextRequire.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.handleSaveQuestionnaire = this.handleSaveQuestionnaire.bind(this);
        this.handleReleaseQuestionnaire = this.handleReleaseQuestionnaire.bind(this);
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
                    // {
                    //     // Id:              null,
                    //     // QuestionnaireId: null,
                    //     // Title:           null,
                    //     // Image :          null,
                    //     // Order:           null,
                    //     // GroupName:       null,
                    //     // TotalScore:      null,
                    //     // Type:            null,
                    //     // CreatedAt:       null /* 2018-07-23 10:04:30 */
                    // }
                ],
                CreatedAt:  null,
            }
            ,
            date:null,
            title:'这里是标题',
            fileList:[],
            props : {
                action: '//jsonplaceholder.typicode.com/posts/',
                listType: 'picture',
                defaultFileList: [...fileList],
            },
          indexCurrent:null,
          loading1:false,
          loading2:false,
    };
    }

    handleTitleClick() {
        this.setState({
            titleEditable: true
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
            CreatedAt:'',
        };
        this.state.questions.Topics.push(newQuestion)
        this.setState( {
            questions: this.state.questions,
            addAreaVisible: false
        });
      console.log('@image',this.state.questions.Topics[0].Image)
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
          console.log('file width :' + this.width);
          console.log('file height :' + this.height);
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
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>{
                const base64Img=imageUrl
                // console.log('@image',base64Img),
                //   this.setState({
                //     imageUrl,
                //     loading: false,
                //   })
              this.state.questions.Topics[this.state.indexCurrent].Image=imageUrl,
                this.setState({
                  questions:this.state.questions,
                  loading:false,
                  imageUrl:null
                })
            });
          console.log('@image1',info.file)
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
            CreatedAt:'',
        };
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
                questions: questions
            });
        }
    }

    handleShiftQuestion(questionIndex, num) {
        let { questions } = this.state;
        let shiftQuestion = questions.splice(questionIndex, 1)[0];
        questions.splice(questionIndex + num, 0, shiftQuestion);
        this.setState({
            questions: questions
        })
    }

    handleCopyQuestion(questionIndex) {
        let { questions } = this.state;
        let copy = Object.assign({}, questions[questionIndex]);
        if (questions[questionIndex].Type !== 1) {
            copy.options = copy.options.slice(0);
        }
        questions.splice(questionIndex + 1, 0, copy);
        this.setState({
            questions: questions
        });
    }

    handleRemoveQuestion(questionIndex) {
        let { questions } = this.state;
        questions.splice(questionIndex, 1);
        this.setState({
            questions: questions
        });
    }

    handleOptionChange(value, questionIndex, optionIndex) {
        let { questions } = this.state;
        questions[questionIndex].options[optionIndex].value =value;
        this.setState({
            questoins: questions
        });
    }

    handleAddOption(questionIndex) {
        let { questions } = this.state;
        const newOption = { text: '新选项' };
        questions[questionIndex].options.push(newOption);
        this.setState({
            questions: questions
        });
    }

    handleRemoveOption(questionIndex, optionIndex) {
        let { questions } = this.state;
        questions[questionIndex].options.splice(optionIndex, 1);
        this.setState({
            questions: questions
        });
    }

    handleTextChange(e, questionIndex) {
        let { questions } = this.state;
        questions[questionIndex].text = e.target.value;
        this.setState({
            questions: questions
        });
    }

    handleTextRequire(e, questionIndex) {
        let { questions } = this.state;
        questions[questionIndex].required = e.target.checked;
        this.setState({
            questions: questions
        });
    }

    handleDatePick(date, dateString) {
        this.setState({
            date: dateString
        })
    }

    handleSaveQuestionnaire() {
        const index = this.state.index;
        list[index] = Object.assign({}, this.state);
        localStorage.list = JSON.stringify(list);
      message.success({
            title: '保存成功'
        });
    }

    handleReleaseQuestionnaire() {
        let me = this;

        if (this.state.questions.length === 0) {
            message.warning({
                title: '请添加至少一个问题'
            });
        } else if (this.state.date === '') {
          message.warning({
                title: '请选择截止日期'
            });
        } else {
          message.confirm({
                title: '确定发布问卷吗？',
                content: '截止日期为 ' + this.state.date,
                onOk() {
                    const index = me.state.index;
                    list[index] = Object.assign({}, {...me.state, stage: '发布中'});
                    localStorage.list = JSON.stringify(list);
                    window.location.reload();
                    me.props.history.push('/');
                }
            });
        }
    }

    onChangeInt=(value,quesIndex)=>{
        let { questions } = this.state;
        questions.Topics[quesIndex].TotalScore = value;
      this.setState({
        questions: questions
      });
     // if (questions.Topics[quesIndex].type===0) {
     //     questions[quesIndex].options.map((d,index)=>{
     //         if (d.text==='加分'){
     //             d.value=value;
     //             // d.text='加'+value+'分'
     //         }else {
     //             d.value=0;
     //             // d.text='加'+0+'分'
     //         }
     //         this.setState({
     //             questions: questions
     //         })
     //     })
     // }else {
     //   for (let i=1;i<questions.Topics[quesIndex].TotalScore+1;i++) {
     //     return
     //   }
     // }
    }

    getTitle() {
        return (
            this.state.titleEditable ? (
                <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 3, textAlign: 'center' }} onClick={this.handleTitleClick}>
                    <Input style={{ fontSize: 18, fontWeight: 'bold', padding: 30, textAlign: 'center' }} value={this.state.title} onChange={this.handleTitleChange} onBlur={this.handleTitleBlur} />
                </div>
            ) : (
                <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 20, textAlign: 'center' }} onClick={this.handleTitleClick}>
                    <h2><strong>{this.state.title}</strong></h2>
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
                if (question.Type === 0) {
                    return (
                        <div className="questionsWrap" style={{ padding: 30 }} key={questionIndex}>

                            <span>Q{questionIndex + 1}</span>
                            <Input value={question.Title} style={{ borderStyle: 'none', width: '97%', marginLeft: 3 }} onChange={(e) => this.handleQuestionChange(e, questionIndex,1)} />
                            <span>题目类型</span>
                            <Input value={question.GroupName} style={{ borderStyle: 'none', width: '50%', marginLeft: 3,marginTop:10 }} onChange={(e) => this.handleQuestionChange(e, questionIndex,2)}></Input>
                            <Row style={{float:'right'}}>
                                <span >总分：</span>
                                <InputNumber style={{marginTop:5}} min={1} max={10} defaultValue={0} onChange={(value)=>this.onChangeInt(value,questionIndex)}/>
                            </Row>
                          {/*{*/}
                            {/*question.Image?*/}
                            {/*<div style={{marginTop:10}}>*/}
                              {/*<img style={{width:200,height:200}} src={question.Image} alt=""/>*/}
                            {/*</div>:<div style={{marginTop:10}}>*/}
                                {/*<img style={{width:200,height:200}} src={this.state.imageUrl} alt=""/>*/}
                              {/*</div>*/}
                          {/*}*/}
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
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}>
                                  {
                                    question.Image? <div style={{marginTop:10}}>
                                      <img  src={question.Image} alt=""/>
                                    </div>:uploadButton
                                  }
                                </Upload>
                            </div>
                        </div>
                    );
                } else if (question.Type === 1) {
                    return (
                        <div className="questionsWrap" style={{ padding: 30 }} key={questionIndex}>
                            <span>Q{questionIndex + 1}</span>
                            <Input value={question.Title} style={{ borderStyle: 'none', width: '97%', marginLeft: 3 }} onChange={(e) => this.handleQuestionChange(e, questionIndex)} />
                            <span>题目类型</span>
                            <Input value={question.GroupName} style={{ borderStyle: 'none', width: '50%', marginLeft: 3,marginTop:10 }} onChange={(e) => this.handleQuestionChange(e, questionIndex,2)}></Input>
                            <Row style={{float:'right'}}>
                                <span >总分：</span>
                                <InputNumber style={{marginTop:5}} min={1} max={10} defaultValue={0} onChange={(value)=>this.onChangeInt(value,questionIndex)}/>
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
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}>
                                {
                                  question.Image? <div style={{marginTop:10}}>
                                    <img  src={question.Image} alt=""/>
                                  </div>:uploadButton
                                }
                              </Upload>
                            </div>
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
                <div style={{ float: 'left' }}>
                    <span>问卷截止日期：</span>
                    <DatePicker onChange={this.handleDatePick} disabledDate={disabledDate} />
                    <span style={{ marginLeft: 16 }}>你选择的日期为: {this.state.date }</span>
                </div>
                <div style={{ float: 'right' }}>
                    <Button onClick={this.handleSaveQuestionnaire}>保存问卷</Button>
                    <Button type="primary" style={{ marginLeft: 16 }} onClick={this.handleReleaseQuestionnaire}>发布问卷</Button>
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
    render() {
        return (
            <div>
                {this.getTitle()}
                <div>
                  <span >总分：</span>
                  <InputNumber style={{marginTop:5}} min={1} max={50} defaultValue={0} onChange={(value)=>this.onChangeTotalInt(value)}/>
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
        );
    }
}

export default Edit;
