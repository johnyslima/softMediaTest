import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  CustomInput,
  UncontrolledTooltip,
  Tooltip,
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { useSelector } from "react-redux";
import {
  InfoIcon,
  XCircleIcon,
} from "@primer/octicons-react";
import "./index.scss";

const TYPES_PAYMENT = {
  MONTH: 0,
  MROT: 1,
  DAY: 2,
  HOUR: 3
}

const App = (props) => {
  const renderSwitch = (field) => (
    <div className="input-row qwe">
      <Label for="switch-qwe" className="asd">
        Указать с НДФЛ
      </Label>
      <CustomInput
        type="switch"
        id="switch-qwe"
        name="qwe"
        label="Без НДФЛ"
        {...field.input}
      />
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </div>
  );

  const renderInput = (field) => (
    <div className="input-row qwe">
      <Input
        type="text"
        name="sum"
        id="sum"
        className="input-sum"
        placeholder="Введите сумму"
        {...field.input}
      />
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </div>
  );

  // const renderRadio = (field) => (
  //   <div className="input-row">
  //     {/* <Label for="switch-qwe" className="asd">Switches</Label> */}
  //     <Input type="radio" name="radio2" {...field.input} />
  //     {field.meta.touched && field.meta.error &&
  //       <span className="error">{field.meta.error}</span>}
  //   </div>
  // )

  const [mrotModeOn, setMrotModeOn] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const values = useSelector((state) => state.form.simple?.values)
  console.log(values)
  // const [sumType, setSumType] = useState("MROT")

  const toggle = (v) => {
    setTooltipOpen(!tooltipOpen);
  };
  const { handleSubmit, submitting } = props;
  return (
    <>
      <Container>
        <div>
          <Form onSubmit={handleSubmit} initialValues={{sumType: "month"}}>
            <FormGroup row>
              <legend
                className={`col-form-label ${mrotModeOn ? "hidden" : ""}`}
              >
                Сумма
              </legend>
              <Col sm={4}>
                <FormGroup check className={mrotModeOn && "hidden"}>
                  <Label check>
                    <Field
                      component="input"
                      type="radio"
                      name="sumType"
                      value="month"
                    />{" "}
                    Оплата за месяц
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Field
                      component="input"
                      className={mrotModeOn && "hidden"}
                      type="radio"
                      name="sumType"
                      value="mrot"
                    />{" "}
                    МРОТ
                  </Label>
                  <Button
                    aria-label="Cancel"
                    id="mrotMode"
                    onClick={() => setMrotModeOn(!mrotModeOn)}
                  >
                    <UncontrolledTooltip
                      placement="bottom"
                      isOpen={mrotModeOn ? mrotModeOn : tooltipOpen}
                      target="mrotMode"
                      toggle={toggle}
                    >
                      МРОТ - минимальный размер оплаты труда. Разный для разных
                      регионов
                    </UncontrolledTooltip>
                    {mrotModeOn ? (
                      <XCircleIcon size={22} />
                    ) : (
                      <InfoIcon size={22} />
                    )}
                  </Button>
                </FormGroup>

                <FormGroup check className={mrotModeOn && "hidden"}>
                  <Label check>
                    <Field
                      component="input"
                      type="radio"
                      name="sumType"
                      value="day"
                    />{" "}
                    Оплата за день
                  </Label>
                </FormGroup>

                <FormGroup check className={mrotModeOn && "hidden"}>
                  <Label check>
                    <Field
                      component="input"
                      type="radio"
                      name="sumType"
                      value="hour"
                    />{" "}
                    Оплата за час
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup className={mrotModeOn && "hidden"}>
              <Field name="myField" component={renderSwitch} />
            </FormGroup>

            <FormGroup row className={mrotModeOn && "hidden"}>
              <Col sm={4}>
                <Field
                  name="sum"
                  component={renderInput}
                  className="input-sum"
                  type="text"
                />
              </Col>
            </FormGroup>
          </Form>
          <Col sm={5} className={mrotModeOn && "hidden"}>
            <div className="result-block">
              <p>40 000Р сотрудник будет получать на руки</p>
              <p>5977Р НФДЛ, 13% от оклада</p>
              <p>45 000Р за сотрудника в месяц</p>
            </div>
          </Col>
        </div>
      </Container>
    </>
  );
};

export default reduxForm({
  form: "simple",
  enableReinitialize : true 
})(App);
