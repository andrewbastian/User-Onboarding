import React from 'react';
import axios from 'axios'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import {Input, Button } from 'semantic-ui-react'


function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

const SignUpForm = ({ errors, touched, isValidating }) => {
  return (
    <Form>
    <Input>
      {touched.name && errors.name && <p className="error">{errors.name}</p>}
      <Field className = "text" type="text" validate = {validateUsername} name="name" placeholder="name"></Field>
</Input>
<Input>
      {touched.email && errors.email && <p className="error">{errors.email}</p>}
      <Field className = "text" type="text" name="email" validate={validateEmail} placeholder="email" />
</Input>
<Input>
      {touched.password && errors.password && <p className="error">{errors.password}</p>}
      <Field className = "text" type="text" name="password" placeholder="password" />
</Input>
      {touched.termsOfService && errors.termsOfService && <p className="error">{errors.termsOfService}</p>}
      <label>
        <Field className = "box" type="checkbox" name="termsOfService" />
        <span>Terms of service</span>
      </label>


      <Button.Group color = 'green'>
  <Button>Sign up</Button>
  <Button.Or />
  <Button positive>Log in</Button>
</Button.Group>
      </Form>

  )
}

export default withFormik({
  // Values come from formik automatically --- magic!
  mapPropsToValues: (values) => {
    // this makes these inputs "controlled", sets the values automatically for us
    return {
      // these keys line up with the "name" attribute on our Fields
      name: values.name || '',
      email: values.email || '',
      password: values.password || '',
      termsOfService: values.termsOfService || false,
    }
  },
  validationSchema: yup.object().shape({
    name: yup.string()
    .required('a name is required!')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
    email: yup.string()
    .required('an email is required!')
    .email('Invalid email'),
    password: yup.string()
    .required('a password is required!'),
    termsOfService: yup.boolean()
    .oneOf([true], 'please agree to our terms of service')
  }),
  handleSubmit: (values) => {
    console.log(values)
  }
})(SignUpForm)
