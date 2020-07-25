import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import { Navbar } from '../components';

const { Header, Content, Footer } = Layout;

function PageLayout(props) {
  const { children } = props;
  const [year] = useState(new Date().getFullYear());
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="page-layout-header">
        <Navbar />
      </Header>
      <Content className="page-layout-content">{children};</Content>
      <Footer>
        <a href="https://legex.in">
          <b>Legex</b>
        </a>{' '}
        ODR &copy; {year}. A &nbsp;
      </Footer>
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;
