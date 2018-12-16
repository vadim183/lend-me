import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { BorrowDetails } from './details/BorrowDetails';
import { BorrowList } from './list/BorrowList';

export const Borrow = () => (
  <Switch>
    <Route
      exact={true}
      path="/borrow"
      render={() => <Redirect to="/borrow/list" />}
    />
    <Route path="/borrow/list" component={BorrowList} />
    <Route path="/borrow/details/:itemId" component={BorrowDetails} />
  </Switch>
);
