import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from 'next/link';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ name }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setIsOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <List>
          <ListSubheader>
            Felix Herrera
          </ListSubheader>
          <ListItem>
            <Link href="/organizations">
              <a href="/organizations">Organizations</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/members">
              <a href="/members">Members</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/members/managers">
              <a href="/members/managers">Managers</a>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string,
};

Header.defaultProps = {
  name: 'Clear',
};

export default Header;
