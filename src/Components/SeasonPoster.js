import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
`;

const Item = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const SeasonPoster = ({ imageUrl, seasonNumber, episodeCount, year }) => (
  <Container>
    <ImageContainer>
      <Image
        bgUrl={
          imageUrl
            ? `https://image.tmdb.org/t/p/w300${imageUrl}`
            : require('../assets/noPosterSmall.png')
        }
      />
    </ImageContainer>
    <Item>Season {seasonNumber}</Item>
    <Item>{episodeCount} episodes</Item>
    <Year>{year}</Year>
  </Container>
);

SeasonPoster.propTypes = {
  imageUrl: PropTypes.string,
  seasonNumber: PropTypes.number,
  episodeCount: PropTypes.number,
  year: PropTypes.string,
};

export default SeasonPoster;
