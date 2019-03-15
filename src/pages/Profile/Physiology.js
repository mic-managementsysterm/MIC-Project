import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List, Icon , Radio, Skeleton,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from  './Physiology.less';
const RadioGroup = Radio.Group;

class Physiology extends PureComponent {
  state = {
    initLoading: true,
    list1: [
      {name: '血红蛋白(Hbg)'},
      {name: '白细胞(WBC)'},
      {name: '中性粒细胞率(GRAN-R)'},
      {name: '淋巴细胞率(LYM-R)'}
    ],list2: [
      {name: '空腹葡萄糖'}
    ],list3: [
      {name: '血红蛋白(Hbg)'},
      {name: '白细胞(WBC)'},
      {name: '中性粒细胞率(GRAN-R)'},
      {name: '淋巴细胞率(LYM-R)'}
    ],
    value: 1,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }


  render() {
    const { initLoading, loading, list1,list2,list3 } = this.state;
    return(
      <PageHeaderWrapper title="生理数据采集">
       <div className={styles.content}>
         <List
           className={styles.demoLoadmoreList}
           itemLayout="horizontal"
           header={<div>血常规（RBC）</div>}
           dataSource={list1}
           renderItem={item => (
             <List.Item >
                 <List.Item.Meta
                   title={item.name}
                 />
                   <RadioGroup onChange={this.onChange} value={this.state.value}>
                     <Radio value={1}>正常</Radio>
                     <Radio value={2}>异常<Icon type="arrow-up" /></Radio>
                     <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
                   </RadioGroup>
             </List.Item>
           )}
         />
         <List
           className={styles.demoLoadmoreList}
           itemLayout="horizontal"
           header={<div>血糖</div>}
           dataSource={list2}
           renderItem={item => (
             <List.Item >
               <List.Item.Meta
                 title={item.name}
               />
               <RadioGroup onChange={this.onChange} value={this.state.value}>
                 <Radio value={1}>正常</Radio>
                 <Radio value={2}>异常<Icon type="arrow-up" /></Radio>
                 <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
               </RadioGroup>
             </List.Item>
           )}
         />
         <List
           className={styles.demoLoadmoreList}
           itemLayout="horizontal"
           header={<div>肝、肾功能</div>}
           dataSource={list3}
           renderItem={item => (
             <List.Item >
               <List.Item.Meta
                 title={item.name}
               />
               <RadioGroup onChange={this.onChange} value={this.state.value}>
                 <Radio value={1}>正常</Radio>
                 <Radio value={2}>异常<Icon type="arrow-up" /></Radio>
                 <Radio value={3}>异常<Icon type="arrow-down" /></Radio>
               </RadioGroup>
             </List.Item>
           )}
         />
       </div>
      </PageHeaderWrapper>
    )
  }
}


export default Physiology;
