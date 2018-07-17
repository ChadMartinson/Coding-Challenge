import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import { connect } from 'react-redux';
import {
  Panel,
  ListGroup,
  ListGroupItem,
  Label,
  Button,
  Modal
} from 'react-bootstrap';
import { NewFactory } from '../components'

import { updateFactory, deleteFactory } from '../actions'

const mapDispatchToProps = {
  updateFactory: updateFactory,
  deleteFactory: deleteFactory
};

class Factory extends Component {
  
  constructor (props) {
    super(props);
    
    this.state = {
      show: null
    }
  }
  
  toggleShow = () => {
    const { show: showState } = this.state;
    this.setState({
      show: !showState
    })
  };
  
  onHandleDelete = () => {
    const { id, deleteFactory } = this.props;
    deleteFactory(id);
  };
  
  onHandleGenerate = () => {
    const { updateFactory, id, name, lower, upper } = this.props;
    function randomInRange(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
    }
    const generatedChildren = [];
    const numberOfChildren = randomInRange(1, 15);
    for (let i = 0; i < numberOfChildren; i++) {
      generatedChildren.push(randomInRange(lower, upper));
    }
    const updatedFactory = {
      id,
      name,
      lower,
      upper,
      children: generatedChildren
    };
    console.log(generatedChildren)
    updateFactory(updatedFactory);
  };
  
  render () {
    
    const { id, name, lower, upper, children, updateFactory } = this.props;
    
    return (
      <div key={id}>
        <Panel>
          <Panel.Heading>
            <span onClick={this.toggleShow}>{name}</span>
            <span style={{float: 'right'}}>
              <Button bsStyle="danger" bsSize="xsmall" onClick={this.onHandleDelete} style={{marginRight: '1em'}}>Delete</Button>
              <Button bsStyle="primary" bsSize="xsmall" onClick={this.onHandleGenerate} style={{marginRight: '1em'}}>Generate Children</Button>
              <Label>{lower} - {upper}</Label>
            </span>
        
          </Panel.Heading>
          <Panel.Body>
            <ListGroup>
              {children.map((child, index) => {
                return <ListGroupItem key={index}>{child}</ListGroupItem>
              })}
            </ListGroup>
          </Panel.Body>
        </Panel>
        <Modal show={this.state.show} onHide={this.toggleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Factory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewFactory onHide={this.toggleShow} edit={{ name, upper, lower, id }} onSubmit={updateFactory} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

Factory.propTypes = {
  id: T.string.isRequired,
  name: T.string.isRequired,
  lower: T.number.isRequired,
  upper: T.number.isRequired,
  children: T.arrayOf(T.number)
};

export default connect(undefined, mapDispatchToProps)(Factory);


