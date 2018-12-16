import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { NavBarStyles } from './NavBar.styles';

interface NavBarProps {
  title: string;
  classes: any;
}

const UnstyledNavBar = (props: NavBarProps) => {
  let classes = props.classes;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap={true}
          >
            {props.title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const NavBar = withStyles(NavBarStyles)(UnstyledNavBar);
