import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);

    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      return push('/');
    }

    const { isMovie } = this.state;

    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      }
    } catch {
      this.setState({
        error: "Can't find detail",
      });
    } finally {
      this.setState({
        loading: false,
        result,
      });
    }
  }

  render() {
    const { result, error, loading } = this.state;

    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
