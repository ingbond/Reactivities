import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityStore from '../../../app/stores/activityStore';
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities"></LoadingComponent>;
    
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
        ></ActivityList>
      </GridColumn>
      <GridColumn width={6}>
        <h2>Activity filters</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);
