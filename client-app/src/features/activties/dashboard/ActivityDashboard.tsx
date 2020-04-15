import React, { SyntheticEvent, useContext } from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityForm } from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from '../../../app/stores/activityStore';
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";

interface IProps {
  activities: IActivity[];
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity,
  editActivity,
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const {editMode, selectedActivity} = activityStore;

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        ></ActivityList>
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          ></ActivityDetails>
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity && selectedActivity.id || 0}
            setEditMode={setEditMode}
            activity={selectedActivity!}
            editActivity={editActivity}
            submitting={submitting}
          ></ActivityForm>
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);
