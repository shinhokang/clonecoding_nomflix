import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Tabs from 'Components/Tabs';
import Videos from 'Components/Videos';
import Section from 'Components/Section';
import SeasonPoster from 'Components/SeasonPoster';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-right: 10px;
`;

const ImdbLink = styled.a``;

const ImdbImg = styled.img``;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Production = styled.div`
  border: 0.5px dotted #ccc;
  padding: 5px;
`;

const DetailPresenter = ({ result, loading, error, isMovie }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix </title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {isMovie ? result.original_title : result.original_name} | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Data>
          <TitleContainer>
            <Title>
              {isMovie ? result.original_title : result.original_name}
            </Title>
            {result.imdb_id ? (
              <ImdbLink
                href={`https://imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >
                <ImdbImg
                  src={require('../../assets/IMDB_Logo_2016.svg')}
                  width="40"
                  height="20"
                />
              </ImdbLink>
            ) : (
              ''
            )}
          </TitleContainer>
          <ItemContainer>
            <Item>
              {isMovie
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {isMovie ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `,
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Tabs>
            <div tabId="videos" label="Videos">
              <Videos>
                {result.videos &&
                  result.videos.results &&
                  result.videos.results.length > 0 &&
                  result.videos.results.map((video, index) => (
                    <iframe
                      title={video.name + index}
                      key={video.id}
                      id="ytplayer"
                      type="text/html"
                      width="320"
                      height="180"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameBorder="0"
                    />
                  ))}
              </Videos>
            </div>
            <div tabId="production" label="Production">
              {result.production_companies &&
              result.production_companies.length > 0 ? (
                <Section title="Production Companies">
                  {result.production_companies.map(company => (
                    <Production key={company.id}>{company.name}</Production>
                  ))}
                </Section>
              ) : (
                ''
              )}
              {isMovie &&
              result.production_countries &&
              result.production_countries.length > 0 ? (
                <Section title="Production Countries">
                  {result.production_countries.map(country => (
                    <Production key={country.id}>{country.name}</Production>
                  ))}
                </Section>
              ) : (
                ''
              )}
              {!isMovie && result.created_by && result.created_by.length > 0 ? (
                <Section title="Creators">
                  {result.created_by.map(creator => (
                    <Production key={creator.id}>{creator.name}</Production>
                  ))}
                </Section>
              ) : (
                ''
              )}
            </div>
            {!isMovie ? (
              <div tabId="seasons" label="Seasons">
                {result.seasons && result.seasons.length > 0 ? (
                  <Section title="">
                    {result.seasons.map(season => (
                      <SeasonPoster
                        key={season.id}
                        imageUrl={season.poster_path}
                        seasonNumber={season.season_number}
                        episodeCount={season.episode_count}
                        year={
                          season.air_date ? season.air_date.substring(0, 4) : ''
                        }
                      />
                    ))}
                  </Section>
                ) : (
                  ''
                )}
              </div>
            ) : null}
          </Tabs>
        </Data>
      </Content>
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default DetailPresenter;
