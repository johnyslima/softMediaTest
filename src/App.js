import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Form, FormGroup, Label, Input, FormText, Col, CustomInput } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import './index.scss';

const App = props => {

  const renderSwitch = (field) => (
    <div className="input-row qwe">
      <Label for="switch-qwe" className="asd">Switches</Label>
      <CustomInput
              type="switch"
              id="switch-qwe"
              name="qwe"
              label="Без НДФЛ" 
              {...field.input} />
      {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
    </div>
  )

  // const renderRadio = (field) => (
  //   <div className="input-row">
  //     {/* <Label for="switch-qwe" className="asd">Switches</Label> */}
  //     <Input type="radio" name="radio2" {...field.input} />
  //     {field.meta.touched && field.meta.error &&
  //       <span className="error">{field.meta.error}</span>}
  //   </div>
  // )

  const [state, setstate] = useState()
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <FormGroup row>
        <legend className="col-form-label">Сумма</legend>
        <Col sm={4}>
          <FormGroup check>
            <Label check>
              <Field component="input" type="radio" name="sumType" value="forMonth" />{' '}
              Оплата за месяц
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field component="input" type="radio" name="sumType" value="mrot" />{' '}
              МРОТ
            </Label>
            {/* <Button color="link">link</Button> */}
            <Button aria-label="Cancel">
            <FontAwesomeIcon icon={faInfoCircle} />
            </Button>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field component="input" type="radio" name="sumType" value="forDay" />{' '}
              Оплата за день
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field component="input" type="radio" name="sumType" value="forHour" />{' '}
              Оплата за час
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>
      {/* <FormGroup>
        <Label for="exampleCheckbox">Switches</Label>
        <div>
        <Field
            name="employed"
            id="employed"
            component={() => <CustomInput
              type="switch"
              id="exampleCustomSwitch"
              name="customSwitch"
              label="Без НДФЛ" />
            } 
            type="checkbox"
          />
          
        </div>
      </FormGroup> */}
      <FormGroup>
          <Field name="myField" component={renderSwitch}/>
      </FormGroup>
      <FormGroup row>
        <Col>
        <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </Col>
      </FormGroup>
        <div>
          <Button color='primary' type='submit' disabled={submitting}>Sign Up</Button>
        </div>
      </Form>
      </Container>
  );
};

export default reduxForm({
  form: 'simple',
})(App);
