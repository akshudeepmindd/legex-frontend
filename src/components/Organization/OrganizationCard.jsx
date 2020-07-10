import React, { Component } from 'react';
import { Card } from 'antd';

class OrganizationCard extends Component {
  render() {
    return (
      <Card title={this.props.organizationName} bordered={false}>
      </Card>
    )
  }
}

export default OrganizationCard;
