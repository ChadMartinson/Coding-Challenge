import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

export default class NewFactory extends Component {
  
  constructor (props) {
    super(props);
    
    this.state = {
      id: props.edit && props.edit.id || '',
      name: props.edit &&props.edit.name || '',
      upper: props.edit &&props.edit.upper || '',
      lower: props.edit &&props.edit.lower || '',
      children: props.edit && props.edit.children || []
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

NewFactory.propTypes = {
  onHide: T.func.isRequired,
  onSubmit: T.func.isRequired,
  edit: T.object
};

