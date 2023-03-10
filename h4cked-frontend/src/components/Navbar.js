import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
// import { useAuthenticated } from '../hooks/useAuthenticated';
import { AUTH } from '../lib/auth';

import { Link } from 'react-router-dom';

export default function Navbar() {
  // const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.logout();
    // setIsLoggedIn(false);
  };

  const [state, setState] = useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          <Link to='/'>Home</Link>,
          <Link to='/login'>Login</Link>,

          <Link to='/register'>Register</Link>,
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          <Link to='/employers'>Employers</Link>,
          <Link to='/vacancies'>Vacancies</Link>,
          <Link to='/salaries'>Salary Benchmarking</Link>,
          <Link to='/tips'>Employability Tips</Link>,
          <Link to='/' onClick={logout}>
            Log Out
          </Link>,
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['  ????'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
