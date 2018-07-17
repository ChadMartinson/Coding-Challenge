import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
Grid,
Button,
Modal
} from 'react-bootstrap';
import {
NewFactory,
FactoryList
} from './components';
import { createFactory } from './actions';


const mapStateToProps = (state = {}, ownProps) => {
  const { factories } = state;
  return { factories };
};

const mapDispatchToProps = {
  createFactory
};

class App extends Component {
  
  constructor (props) {
    super(props);
    
    this.state = {
      show: false
    };
  }
  
  showModal = () => {
    this.setState({
      show: true
    });
  };
  
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  
  render() {
    const { factories, createFactory } = this.props;
    return (
      <Grid>
        <h2>My first Apollo app</h2>
        <Button onClick={this.showModal}>Add Factory</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Factory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewFactory onHide={this.handleClose} onSubmit={createFactory}/>
          </Modal.Body>
        </Modal>
        <FactoryList factories={factories}/>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
