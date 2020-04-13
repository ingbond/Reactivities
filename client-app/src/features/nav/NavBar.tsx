import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

export const NavBar:React.FC<IProps> = ({openCreateForm}) => {
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