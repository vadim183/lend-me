import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { createStyles, withStyles } from '@material-ui/core';

import { NavBar } from '@shared/index';
import { flexColumn, flex } from '@styles/flex';
import { StyleClassesProps } from '@styles/index';

import { Borrow } from './borrow/Borrow';

const NavBarStyles = () =>
  createStyles({
    flexColumn,
    flex
  });

export const UnstyledApp = ({ classes }: StyleClassesProps) => (
  <div className={`${classes.flex} ${classes.flexColumn}`}>
    <NavBar title="LendMe" />
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/borrow" />} />
      <Route path="/borrow" component={Borrow} />
    </Switch>
  </div>
);

export const App = withStyles(NavBarStyles)(UnstyledApp);
