import React, { useState, useContext, useEffect } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivityFormValues, ActivityFormValues } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

interface DetailParams {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then(
        (activity) => setActivity(new ActivityFormValues(activity))
      ).finally(() => setLoading(false));
    }
  }, [
    loadActivity, 
    match.params.id,
  ]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const {date, time, ...activity} = values;
    activity.date = dateAndTime;
    
    if (!activity.id) {
          let newActivity = {
            ...activity,
            id: uuid(),
          };
          createActivity(newActivity).then(() =>
            history.push(`/activities/${newActivity.id}`)
          );
        } else {
          editActivity(activity).then(() =>
            history.push(`/activities/${activity.id}`)
          );
        }
      
  };

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing >
          <FinalForm
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                ></Field>
                <Field
                  name="description"
                  placeholder="Descriptions"
                  value={activity.description}
                  rows={3}
                  component={TextAreaInput}
                ></Field>
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                ></Field>

                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={activity.date}
                  ></Field>
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={activity.date}
                  ></Field>
                </Form.Group>

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={activity.city}
                ></Field>
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                ></Field>
                <Button
                  disabled={loading}
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                ></Button>
                <Button
                  onClick={() => history.push("/activities")}
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                ></Button>
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);
