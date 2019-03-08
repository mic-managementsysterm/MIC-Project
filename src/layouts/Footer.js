import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'MIC社区管理系统',
          title: 'MIC社区管理系统',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 成都中医药大学数字医药研究所
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
