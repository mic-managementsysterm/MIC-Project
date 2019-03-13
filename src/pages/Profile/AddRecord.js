import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Col, Row, Button, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({record,loading}) =>({
  record,
  loading:loading.models.record,
}))
 class AddRecord extends Component{

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('@props',this.props)
    dispatch({
      type: 'record/fetchRecord',
    })
  }

  render() {
    const { record:{ list } , loading } = this.props;
    console.log('@list',list)
    return(
      <PageHeaderWrapper title="新增记录" loading={loading}>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="四诊数据采集" bordered={false}>
                <Button>填写</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="生理数据采集" bordered={false}>
                <Button>填写</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="量表填写" bordered={false}>
                <Button>填写</Button>
              </Card>
            </Col>
          </Row>
          <Divider style={{ marginBottom: 32 }} />
          <Row gutter={16}>
            <Col span={8}>
              <Card title="四诊数据采集" bordered={false}>
                <Button>填写</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="生理数据采集" bordered={false}>
                <Button>填写</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="量表填写" bordered={false}>
                <Button>填写</Button>
              </Card>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
}
}

export default AddRecord;
