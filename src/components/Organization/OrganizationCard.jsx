import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

function OrganizationCard(props) {
  const { name } = props;
  return <Card title={name} bordered={false} />;
}

OrganizationCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default OrganizationCard;
