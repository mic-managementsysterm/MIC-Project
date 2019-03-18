import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, List, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddQuestionnaire.less';

const {Option} = Select;

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
    const { dispatch } = this.props;
    dispatch({
      type: 'addQues/fetchAllGauge'
    })
  };

  renderSelect = (itemin,total) => {
    const { dispatch } = this.props;
    let handleChange = (value) => {
      dispatch({
        type:'addQues/setInfos',
        payload:{
          index:itemin.Order - 1,
          type:"Score",
          value:value
        }
      })
    };
    const renderOption = () => {
      let option = [];
      if(itemin.Type){
        for(let i = 0;i <= total; i++){
          option.push(<Option value={i}>+{i}分</Option>)
        }
      } else {
        option.push(<Option value={0}>+{0}分</Option>);
        total>0 && option.push(<Option value={total}>+{total}分</Option>)
      }
      return option
    };
    return(
      <Select className="select-score" defaultValue={0} style={{ width: 120 }} onChange={handleChange}>
        {renderOption()}
      </Select>
    )
  };

  renderTopic = (item) => {
    return(
      <List.Item key={item.key}>
        <div className={styles.topic}>
          <Row>
            <Col span={16}>
              <span>
                {item.GroupName}
              </span>
            </Col>
            <Col span={8}>
              {this.renderSelect(item,item.TotalScore)}
            </Col>
          </Row>
          <Row>
            <span>{`Q${item.Order}${"  "}${item.Title}`}</span>
          </Row>
          {item.Image?
            (<img
              alt="ex"
              className="image"
              // src={`http://210.41.215.16:3306${item.Image}`}
              src={require("../../../assets/img/cognition.jpg")}
            />)
          :null}
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
              renderItem={item =>this.renderTopic(item)}
            />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AddRecord;
