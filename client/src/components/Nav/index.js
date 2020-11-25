import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Segment } from 'semantic-ui-react';
import img from '../../assets/whitelistedOnly.png';
const Nav = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleItemClick = (evt, name) => {
    console.log(name.name);
    setActiveItem(name.name);
  };
  return (
    <Segment className="navbar" inverted>
      <Menu className="navbar_container" inverted pointing secondary>
        <Menu.Item
          name="Home"
          active={activeItem === 'Home'}
          onClick={handleItemClick}
        >
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Admin"
          active={activeItem === 'Admin'}
          onClick={handleItemClick}
        >
          <Link to="/admin">
            Admin
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Proposal registration"
          active={activeItem === 'Proposal registration'}
          onClick={handleItemClick}
        >
          <Link to="/proposal-registration">
            Proposal registration
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Voting "
          active={activeItem === 'Voting'}
          onClick={handleItemClick}
        >
          <Link to="/voting">
            Voting
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Winning proposal"
          active={activeItem === 'Winning proposal'}
          onClick={handleItemClick}
        >
          <Link to="/winning-proposal">
            Winning proposal
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Whitelist"
          active={activeItem === 'Whitelist'}
          onClick={handleItemClick}
        >
          <Link to="/whitelist">
            Whitelist
          </Link>
        </Menu.Item>
      </Menu>
    </Segment>
  );
};

export default Nav;
