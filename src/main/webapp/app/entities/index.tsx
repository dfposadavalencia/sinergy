import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserProfile from './user-profile';
import UserSeason from './user-season';
import Season from './season';
import Challenge from './challenge';
import Activity from './activity';
import Tag from './tag';
import Field from './field';
import Agenda from './agenda';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/user-profile`} component={UserProfile} />
      <ErrorBoundaryRoute path={`${match.url}/user-season`} component={UserSeason} />
      <ErrorBoundaryRoute path={`${match.url}/season`} component={Season} />
      <ErrorBoundaryRoute path={`${match.url}/challenge`} component={Challenge} />
      <ErrorBoundaryRoute path={`${match.url}/activity`} component={Activity} />
      <ErrorBoundaryRoute path={`${match.url}/tag`} component={Tag} />
      <ErrorBoundaryRoute path={`${match.url}/field`} component={Field} />
      <ErrorBoundaryRoute path={`${match.url}/agenda`} component={Agenda} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
