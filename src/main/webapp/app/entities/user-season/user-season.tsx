import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-season.reducer';
import { IUserSeason } from 'app/shared/model/user-season.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSeasonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserSeason extends React.Component<IUserSeasonProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userSeasonList, match } = this.props;
    return (
      <div>
        <h2 id="user-season-heading">
          <Translate contentKey="synergyApp.userSeason.home.title">User Seasons</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="synergyApp.userSeason.home.createLabel">Create a new User Season</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {userSeasonList && userSeasonList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="synergyApp.userSeason.ranking">Ranking</Translate>
                  </th>
                  <th>
                    <Translate contentKey="synergyApp.userSeason.score">Score</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userSeasonList.map((userSeason, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${userSeason.id}`} color="link" size="sm">
                        {userSeason.id}
                      </Button>
                    </td>
                    <td>{userSeason.ranking}</td>
                    <td>{userSeason.score}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${userSeason.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userSeason.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userSeason.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="synergyApp.userSeason.home.notFound">No User Seasons found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userSeason }: IRootState) => ({
  userSeasonList: userSeason.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSeason);
