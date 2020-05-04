import React, { useContext, useEffect } from "react";
import {
  Grid,
  GridColumn,
} from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, history]);

  if (loadingInitial)
    return <LoadingComponent content="loading ..."></LoadingComponent>;

  if(!activity) 
    return <h2>Activity not found</h2>

    return (
      <Grid>
        <GridColumn width={10}>
          <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
          <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
          <ActivityDetailedChat></ActivityDetailedChat>
        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailedSidebar attendees={activity.attendees}></ActivityDetailedSidebar>
        </GridColumn>
      </Grid>
    );
};

export default observer(ActivityDetails);
