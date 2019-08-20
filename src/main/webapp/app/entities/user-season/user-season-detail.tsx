import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-season.reducer';
import { IUserSeason } from 'app/shared/model/user-season.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSeasonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserSeasonDetail extends React.Component<IUserSeasonDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userSeasonEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="synergyApp.userSeason.detail.title">UserSeason</Translate> [<b>{userSeasonEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ranking">
                <Translate contentKey="synergyApp.userSeason.ranking">Ranking</Translate>
              </span>
            </dt>
            <dd>{userSeasonEntity.ranking}</dd>
            <dt>
              <span id="score">
                <Translate contentKey="synergyApp.userSeason.score">Score</Translate>
              </span>
            </dt>
            <dd>{userSeasonEntity.score}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-season" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-season/${userSeasonEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userSeason }: IRootState) => ({
  userSeasonEntity: userSeason.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSeasonDetail);
