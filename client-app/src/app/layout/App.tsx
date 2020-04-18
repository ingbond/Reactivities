import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activties/dashboard/ActivityDashboard";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activties/form/ActivityForm";
import ActivityDetails from "../../features/activties/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              <Route
                exact
                path="/activities"
                component={ActivityDashboard}
              ></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                path={["/createActivity", "/manage/:id"]}
                key={location.key}
                component={ActivityForm}
              ></Route>
            </Container>
          </Fragment>
        )}
      ></Route>
    </Fragment>
  );
};

export default withRouter(observer(App));
