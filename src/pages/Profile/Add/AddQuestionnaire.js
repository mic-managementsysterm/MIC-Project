import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Button, List, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddQuestionnaire.less';

const {Group} = Radio;

@connect(({addQues,loading}) =>({
  addQues,
  loading:loading.models.addQues,
}))
class AddRecord extends Component{

  componentWillMount() {
    // const { dispatch, location } = this.props;
    // dispatch({
    //   type: 'addQues/setStates',
    //   payload:{
    //     RespondentId:location.query.Id
    //   }
    // })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'addQues/getQues',
      payload:{
        Id:"87f5a6b4-ee86-4b2f-a984-1dc6edc77e9c"
      }
    })
  }

  getQues = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'record/fetchAllQuestionnaire',
    })
  };

  uploadQues = () =>{
    const { dispatch, addQues:{newQues} } = this.props;
    let Score = 0;
    newQues.Infos.map(item => {
      Score += item.Score
    });
    newQues.Score = Score;
    // dispatch({
    //   type: 'addQues/fetchAllGauge'
    // })
    console.log("upload",newQues)
  };

  renderSelect = (itemin,total) => {
    const { dispatch } = this.props;
    let handleChange = (event) => {
      dispatch({
        type:'addQues/setInfos',
        payload:{
          index:itemin.Order - 1,
          type:"Score",
          value:event.target.value
        }
      })
    };
    const renderOption = () => {
      let option = [];
      if(itemin.Type){
        for(let i = 0;i <= total; i++){
          option.push(<Radio value={i}>{i}分</Radio>)
        }
      } else {
        option.push(<Radio value={0}>{0}分</Radio>);
        total>0 && option.push(<Radio value={total}>{total}分</Radio>)
      }
      return option
    };
    return(
      <Group className={styles["select-score"]} defaultValue={0} style={{ width: 120 }} onChange={handleChange}>
        {renderOption()}
      </Group>
    )
  };

  renderTopic = (item, index) => {
    const {addQues:{Topics}} = this.props;
    let renderGroupName = () =>{};
    let itemClassName = styles["ant-list-item"];
    if( index > 0 && Topics[index].GroupName !== Topics[index -1].GroupName){
      itemClassName = styles["ant-list-item-padding"];
      renderGroupName = () => {
        return (
          <span className={styles.title}>{item.GroupName}</span>
        )
      };
    }
    if(index === 0){
      renderGroupName = () => {
        return (
          <span className={styles.title}>{item.GroupName}</span>
        )
      };
    }
    return(
      <List.Item className={itemClassName} key={item.Id}>
        <div className={styles.topic}>
          <Row>
            {renderGroupName()}
          </Row>
          <Row className={styles.title}>
            <span>{`Q${item.Order}${"  "}${item.Title}`}</span>
          </Row>
          {item.Image?
            (<img
              alt="ex"
              className={styles.image}
              // src={`http://210.41.215.16:3306${item.Image}`}
              src={require("../../../assets/img/cognition.jpg")}
            />)
          :null}
          <Row>
            {this.renderSelect(item,item.TotalScore)}
          </Row>
        </div>
      </List.Item>
    )
  };


  render() {
    const { addQues:{Topics} , loading } = this.props;
    return(
      <PageHeaderWrapper title="新增问卷" loading={loading}>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <div className={styles.quesList}>
            <List
              rowKey="Id"
              loading={loading}
              dataSource={Topics}
              renderItem={(item,index) =>this.renderTopic(item,index)}
            />
          </div>
          <div>
            <Button onClick={()=>this.uploadQues()}>
              <span>提交</span>
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AddRecord;
