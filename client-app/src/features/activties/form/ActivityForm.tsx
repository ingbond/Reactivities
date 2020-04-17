import React, { useState, FormEvent, useContext, useEffect } from "react";
import {
  Segment,
  FormInput,
  Form,
  FormTextArea,
  Button,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from "uuid";
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity, editActivity, submitting, cancelFormOpen, activity: initialFormState, loadActivity} = activityStore;

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState));
    }
  })


  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const handleSubmit = () => {
    if(activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        ></FormInput>
        <FormTextArea
          onChange={handleInputChange}
          rows={2}
          name="description"
          placeholder="Descriptions"
          value={activity.description}
        ></FormTextArea>
        <FormInput
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        ></FormInput>
        <Button
        loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={() => cancelFormOpen()}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm)