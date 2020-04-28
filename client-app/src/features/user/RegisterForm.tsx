import React, { useContext, Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  username: isRequired("username"),
  displayName: isRequired("displayName"),
  password: isRequired("password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up"
            color="teal"
            textAlign="center"
          ></Header>
          <Field
            name="username"
            component={TextInput}
            placeholder="Username"
          ></Field>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          ></Field>
          <Field name="email" component={TextInput} placeholder="Email"></Field>
          <Field
            name="password"
            component={TextInput}
            placeholder="password"
            type="password"
          ></Field>
          {submitError && (
              
            <ErrorMessage error={submitError} ></ErrorMessage>
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          ></Button>
        </Form>
      )}
    ></FinalForm>
  );
};

export default RegisterForm;
