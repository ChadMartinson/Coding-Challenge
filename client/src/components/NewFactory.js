import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

export default class NewFactory extends Component {
  
  propTypes = {
    onHide: T.func.isRequired,
    onSubmit: T.func.isRequired,
    edit: T.bolean
  };
  
  constructor (props) {
    super(props);
    
    this.state = {
      id: props.edit.id || null,
      name: props.edit.name || null,
      upper: props.edit.upper || null,
      lower: props.edit.lower || null,
      children: props.edit.lower || []
    }
  }
  
  onChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };
  
  render () {
    const { id, name, upper, lower, children } = this.state;
    const { onHide, onSubmit } = this.props;
    return (
      <div>
        <Form horizontal
          onSubmit={e => {
            e.preventDefault();
            onSubmit({id, name, upper, lower, children});
            onHide();
          }}
        >
          <FormGroup controlId="formValidationNull" validationState={null}>
            <FormControl
              placeholder="Name"
              value={name}
              name="name"
              title="A name is required"
              type="text"
              onChange={this.onChange}
            />
            <br/>
            <FormControl
              placeholder="Lower Range"
              name="lower"
              value={lower}
              title="A number for the lower range is required"
              type="text"
              onChange={this.onChange}
            />
            <br/>
            <FormControl
              placeholder="Upper Range"
              name="upper"
              value={upper}
              title="A number for the upper range is required"
              type="text"
              required
              onChange={this.onChange}
            />
            <br/>
            <Button bsStyle="primary" type="submit">Add Factory</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

