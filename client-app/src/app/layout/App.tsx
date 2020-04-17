import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar  from "../../features/nav/NavBar";
import { LoadingComponent } from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import ActivityStore from '../stores/activityStore';
import ActivityDashboard from "../../features/activties/dashboard/ActivityDashboard";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import  ActivityForm  from "../../features/activties/form/ActivityForm";
import ActivityDetails from "../../features/activties/details/ActivityDetails";

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
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
        <Route path={['/createActivity', '/manage/:id']} component={ActivityForm}></Route>
      </Container>
    </Fragment>
  );
};

export default observer(App);
