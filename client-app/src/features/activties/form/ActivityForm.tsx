import React from "react";
import {
  Segment,
  FormInput,
  Form,
  FormTextArea,
  Button,
} from "semantic-ui-react";

interface IProps {
  setEditMode: (editMode: boolean) => void;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode }) => {
  return (
    <Segment clearing>
      <Form>
        <FormInput placeholder="Title"></FormInput>
        <FormTextArea rows={2} placeholder="Descriptions"></FormTextArea>
        <FormInput placeholder="Category"></FormInput>
        <FormInput type="date" placeholder="Date"></FormInput>
        <FormInput placeholder="City"></FormInput>
        <FormInput placeholder="Venue"></FormInput>
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};
