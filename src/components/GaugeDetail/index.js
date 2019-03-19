import React, { Component } from 'react';
import styles from './index.less';

class GaugeDetail extends Component{
  render() {
    const { data } = this.props;
    return(
      <div>
        <h1>{data.QuestionnaireName} {data.Score}</h1>
        <div>{data&&data.Infos ? data.Infos.map((item,index) =>{
          return (
            <div key={index}>
              <div className={styles.contentName}>
                <div className={styles.contentGroupname}>
                  {(index>0 && data.Infos[index-1].TopicInfo.GroupName == item.TopicInfo.GroupName)?
                    null:item.TopicInfo.GroupName}
                </div>
                <div className={styles.contentDetail}>
                  <ul className={styles.contentDetailTitle}>
                    <li>{item.TopicInfo.Order}.{item.TopicInfo.Title}</li>
                  </ul>
                  <ul className={styles.contentDetailScore}>
                    <li>{item.Score}</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }) :null }</div>
      </div>
    )
  }
}

export default GaugeDetail;
