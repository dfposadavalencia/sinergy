import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Season from './season';
import SeasonDetail from './season-detail';
import SeasonUpdate from './season-update';
import SeasonDeleteDialog from './season-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SeasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SeasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SeasonDetail} />
      <ErrorBoundaryRoute path={match.url} component={Season} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SeasonDeleteDialog} />
  </>
);

export default Routes;
