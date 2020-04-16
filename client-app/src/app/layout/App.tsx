import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar  from "../../features/nav/NavBar";
import { LoadingComponent } from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import ActivityStore from '../stores/activityStore';
import ActivityDashboard from "../../features/activties/dashboard/ActivityDashboard";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities' ></LoadingComponent>

  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default observer(App);
