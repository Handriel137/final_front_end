import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const TopNav = (props) => {
    return (
        <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/characters/1/items">
                            <a href="/"> My Inventory</a>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/characters">
                            <NavItem eventKey={2}>
                                New Character
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
        </div>
    );
}

export default TopNav;