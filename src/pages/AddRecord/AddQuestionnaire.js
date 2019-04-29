import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Button, List, Radio, Upload, Spin, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import { service, queImgCount } from "@/services/config";
import styles from './AddQuestionnaire.less';

const { Group } = Radio;

@connect(({ addQues, routerParams, loading }) => ({
  addQues,
  routerParams,
  loading: loading.models.addQues,
}))
class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imgUrl: [],
      fileList: []
    };
  }

  componentDidMount() {
    const {
      dispatch,
      routerParams,
      addQues: { newQues },
    } = this.props;
    dispatch({
      type: 'addQues/getQues',
      payload: {
        Id: routerParams.RecordAddId,
      },
    });
    dispatch({
      type: 'addQues/setStates',
      payload: {
        newQues: {
          ...newQues,
          RespondentId: routerParams.Respondent.Id,
        },
      },
    });
  }

  uploadQues = () => {
    const {
      dispatch,
      addQues: { newQues },
    } = this.props;
    this.setState({
      loading: true,
    });
    let Score = 0;
    newQues.Infos.map(item => {
      Score += item.Score;
    });
    newQues.Score = Score;
    dispatch({
      type: 'addQues/uploadQues',
      payload: {
        ...newQues,
      },
      callback: () => {
        this.setState({
          loading: false,
        });
        router.go(-2);
      },
    });
  };

  insertImg = (index, img) => {
    const {
      addQues: { newQues, Topics },
    } = this.props;
    newQues.Infos[index].Images.push({ Img: img });
    Topics[index].insertImg = img;
  };

  renderSelect = (itemin,index, total) => {
    const { dispatch } = this.props;
    let handleChange = event => {
      dispatch({
        type: 'addQues/setInfos',
        payload: {
          index: index,
          type: 'Score',
          value: event.target.value,
        },
      });
    };
    const renderOption = () => {
      let option = [];
      if (itemin.Type) {
        for (let i = 0; i <= total; i++) {
          option.push(<Radio value={i}>{i}分</Radio>);
        }
      } else {
        option.push(<Radio value={0}>{0}分</Radio>);
        total > 0 && option.push(<Radio value={total}>{total}分</Radio>);
      }
      return option;
    };
    return (
      <Group
        className={styles['select-score']}
        defaultValue={0}
        style={{ width: 120 }}
        onChange={handleChange}
      >
        {renderOption()}
      </Group>
    );
  };

  renderTopic = (item, index) => {
    const {
      addQues: { Topics },
      dispatch,
    } = this.props;
    const beforeUpload = file => {
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
      return isImage && isLt2M;
    };
    const onChange = info => {
      const { imgUrl } = this.state;
      if (info.file.status === 'done') {
        Topics[index].insertImg = [...imgUrl,info.file.response.Data];
        dispatch({
                type: 'addQues/setInfos',
                payload: {
                  index: index,
                  type: 'Images',
                  value: {Url:info.file.response.Data},
                },
              });
      }
      // if (info.file.status === 'done') {
      //   // if (info.fileList.length > 1) {
      //   //   info.fileList.splice(0, 1);
      //   // }
      //   let reader = new FileReader();
      //   reader.readAsDataURL(info.file.originFileObj);
      //   reader.onload = event => {
      //     Topics[index].insertImg = event.target.result;
      //     dispatch({
      //       type: 'addQues/setInfos',
      //       payload: {
      //         index: index,
      //         type: 'Images',
      //         value: { Url: event.target.result },
      //       },
      //     });
      //   };
      // }
    };
    const onRemove = () => {
      Topics[index].insertImg = '';
      dispatch({
        type: 'addQues/setInfos',
        payload: {
          index: index,
          type: 'Images',
          value: '',
        },
      });
    };

    let renderGroupName = () => {};
    let itemClassName = styles['ant-list-item'];
    if (index > 0 && Topics[index].GroupName !== Topics[index - 1].GroupName) {
      itemClassName = styles['ant-list-item-padding'];
      renderGroupName = () => {
        return <span className={styles.title}>{item.GroupName}</span>;
      };
    }
    if (index === 0) {
      renderGroupName = () => {
        return <span className={styles.title}>{item.GroupName}</span>;
      };
    }

    return (
      <List.Item className={itemClassName} key={item.Id}>
        <div className={styles.topic}>
          <Row>{renderGroupName()}</Row>
          <Row className={styles.title}>
            <span>{`Q${index + 1}${'  '}${item.Title}`}</span>
          </Row>
          <Row>
            {item.Image ? (
              <img
                className={styles.image}
                src={`${service}${item.Image}`}
              />
            ) : null}
            {/*{item.Images && item.Image ? item.Image.map(img => <img*/}
              {/*src={`${service}${img.Url}`} className={styles.image}/>) : null*/}
            {/*}*/}
            {item.insertImg ? (
              <img
                className={styles.image}
                src={`${service}${item.insertImg}`}
              />
            ) : null}
            {/*{item.insertImg && item.insertImg ? item.insertImg.map(img => <img*/}
              {/*src={`${service}${img.Url}`}/>) : null*/}
            {/*}*/}
          </Row>
          <Row>
            {this.renderSelect(item, index, item.TotalScore)}
            <Upload
              // name="topicImg"
              multiple={false}
              accept="image/*"
              className="topic-insertImg"
              action={`${service}/file/upload/image`}
              beforeUpload={file => beforeUpload(file)}
              onChange={info => onChange(info)}
              onRemove={() => onRemove()}
            >
              <Button>
                <span>选择图片</span>
              </Button>
            </Upload>
          </Row>
        </div>
      </List.Item>
    );
  };

  render() {
    const {
      addQues: { Topics },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="新增问卷" loading={loading}>
        <Spin spinning={this.state.loading} tip="正在提交">
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <div className={styles.quesList}>
              <List
                rowKey="Id"
                loading={loading}
                dataSource={Topics}
                renderItem={(item, index) => this.renderTopic(item, index)}
              />
            </div>
            <div className={styles['submit-button']}>
              <Button onClick={() => this.uploadQues()}>
                <span>提交</span>
              </Button>
            </div>
          </div>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default AddRecord;
