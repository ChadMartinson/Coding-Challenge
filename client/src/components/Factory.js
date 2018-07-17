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

import { updateFactory } from '../actions'

const mapDispatchToProps = {
  updateFactory
};

class Factory extends Component {
  
  propTypes = {
    id: T.string.isRequired,
    name: T.string.isRequired,
    lower: T.number.isRequired,
    upper: T.number.isRequired,
    children: T.arrayOf(T.number)
  };
  
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
  
  render () {
    
    const { id, name, lower, upper, children } = this.props;
    
    return (
      <div key={id}>
        <Panel>
          <Panel.Heading>
            <span onClick={this.toggleShow}>{name}</span>
            <span style={{float: 'right'}}>
            <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleGenerate} style={{marginRight: '1em'}}>Generate Children</Button>
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
            <NewFactory onHide={this.toggleShow} edit={{ name, upper, lower }} onSubmit={updateFactory} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default connect(undefined, mapDispatchToProps)(Factory);


