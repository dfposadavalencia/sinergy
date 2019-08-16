import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserSeason from './user-season';
import UserSeasonDetail from './user-season-detail';
import UserSeasonUpdate from './user-season-update';
import UserSeasonDeleteDialog from './user-season-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserSeasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserSeasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserSeasonDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserSeason} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserSeasonDeleteDialog} />
  </>
);

export default Routes;
