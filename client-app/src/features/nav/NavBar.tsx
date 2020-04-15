import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from '../../app/stores/activityStore';
import { observer } from "mobx-react-lite";

interface IProps {
}

const NavBar:React.FC<IProps> = () => {
  const activityStore = useContext(ActivityStore);
  const {openCreateForm} = activityStore;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png"></img>
            Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item name="friends">
            <Button onClick={openCreateForm} positive content='Create Activity'/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);