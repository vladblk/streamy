import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);

    this.buildPlayer();
  };

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    if(this.player || !this.props.stream) {
      return;
    }

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    console.log(this.props);

    if(!this.props.stream) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
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