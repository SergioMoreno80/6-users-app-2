// MyMenu.js
// MyMenu.js
import React from 'react';
import { Menu, MenuList, MenuItem, Button } from '@material-tailwind/react';

const MyMenu = () => {
  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' },
  ];

  return (
    <Menu>
      <Button>
        Open Menu
      </Button>
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <a href={item.link}>{item.label}</a>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default MyMenu;


