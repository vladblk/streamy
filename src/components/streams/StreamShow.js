import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    console.log(this.props);

    if(!this.props.stream) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h3>{this.props.stream.title}</h3>
          <p>{this.props.stream.description}</p>
        </div>
      );
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  {
    fetchStream: fetchStream
  }
)(StreamShow);