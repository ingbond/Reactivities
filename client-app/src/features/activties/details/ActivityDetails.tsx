import React from "react";
import { Card, Image, Button, ButtonGroup } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;

  setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditMode,
  setSelectedActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
          ></Button>
          <Button onClick={() => setSelectedActivity(null)} basic color="grey" content="Cancel"></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
