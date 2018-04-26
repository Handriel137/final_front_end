import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const TopNav = (props) => {
  return (<div>
    <Navbar inverse="inverse" collapseOnSelect="collapseOnSelect">
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/">
            <a href="/">
              Trading Post</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/characters">
            <NavItem eventKey={2}>
              Character List
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/about">
            <NavItem eventKey={3}>
              About
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>);
}

export default TopNav;
