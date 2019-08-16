import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Agenda from './agenda';
import AgendaDetail from './agenda-detail';
import AgendaUpdate from './agenda-update';
import AgendaDeleteDialog from './agenda-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AgendaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AgendaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AgendaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Agenda} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AgendaDeleteDialog} />
  </>
);

export default Routes;
