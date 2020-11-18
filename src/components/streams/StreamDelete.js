import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  };

  renderActions() {
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => this.onSubmit()}>Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  };

  onSubmit = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderContent() {
    if(!this.props.stream) {
      return 'Are you sure you want to delete the stream?';
    }

    return <div>Are you sure you want to delete the stream with title: <b>{this.props.stream.title}</b></div>
  }

  render() {
    return (
      <Modal 
        title="Delete stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  {
    fetchStream: fetchStream,
    deleteStream: deleteStream
  }
)(StreamDelete);