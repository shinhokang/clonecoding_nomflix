import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 25px;
`;

const Videos = ({ children }) => (
  <Container>
    <Grid>{children}</Grid>
  </Container>
);

Videos.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Videos;
