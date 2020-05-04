import React, { useContext } from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ActivityStore from "../../../app/stores/activityStore";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

interface IProps {
  activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host.image || "/assets/user.png"}
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
              <Item.Description>Hosted by {host.displayName}</Item.Description>
              {activity.isHost && 
              <Item.Description>
                <Label
                  basic
                  color="orange"
                  content="You are hosting this activity"
                ></Label>
              </Item.Description>}
              {activity.isGoing && !activity.isHost && 
              <Item.Description>
                <Label
                  basic
                  color="orange"
                  content="You are going this activity"
                ></Label>
                
              </Item.Description>}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock"></Icon> {format(activity.date, "h:mm a")}
        <Icon name="marker"></Icon> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees
          attendees={activity.attendees}
        ></ActivityListItemAttendees>
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          content="View"
          color="blue"
          as={Link}
          to={`/activities/${activity.id}`}
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
