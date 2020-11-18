import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  };

  renderCreateBtn() {
    if(this.props.isSignedIn) {
      return (
        <div>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      )
    }
  }

  renderAdminBtn(stream) {
    if(this.props.currentUserId === stream.userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    };
  };

  renderedStreamsList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdminBtn(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            <div className="header">
              <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            </div>

            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
        
      );
    });
  };

  render() {
    console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderedStreamsList()}
        </div>
        {this.renderCreateBtn()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    fetchStreams: fetchStreams
  }
)(StreamList);