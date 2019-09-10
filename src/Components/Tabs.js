import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from 'Components/Tab';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;
`;

const TabList = styled.ol`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`;

const TabContent = styled.div`
  margin-top: 10px;
`;

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.children.length > 0 ? props.children[0].props.tabId : '',
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <Container>
        <TabList>
          {children.map(child => {
            const { label, tabId } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                tabId={tabId}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </TabList>
        <TabContent>
          {children.map(child => {
            if (child.props.tabId !== activeTab) return undefined;
            return child.props.children;
          })}
        </TabContent>
      </Container>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Tabs;
