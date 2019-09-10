import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;

  color: ${props => (props.isActiveTab ? 'white' : 'rgba(255, 255, 255, 0.5)')};

  border: ${props => (props.isActiveTab ? 'solid #ccc' : '')};
  border-width: ${props => (props.isActiveTab ? '1px 1px 0 1px' : '')};
`;

const Tab = ({ activeTab, tabId, label, onClick }) => {
  const handleClick = () => {
    onClick(tabId);
  };

  const isActiveTab = activeTab === tabId;

  return (
    <Item isActiveTab={isActiveTab} onClick={handleClick}>
      {label}
    </Item>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
