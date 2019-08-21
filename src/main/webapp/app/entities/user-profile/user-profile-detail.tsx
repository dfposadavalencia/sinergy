import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserProfileDetail extends React.Component<IUserProfileDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userProfileEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="synergyApp.userProfile.detail.title">UserProfile</Translate> [<b>{userProfileEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="grade">
                <Translate contentKey="synergyApp.userProfile.grade">Grade</Translate>
              </span>
            </dt>
            <dd>{userProfileEntity.grade}</dd>
            <dt>
              <span id="voice">
                <Translate contentKey="synergyApp.userProfile.voice">Voice</Translate>
              </span>
            </dt>
            <dd>{userProfileEntity.voice}</dd>
            <dt>
              <span id="discipline">
                <Translate contentKey="synergyApp.userProfile.discipline">Discipline</Translate>
              </span>
            </dt>
            <dd>{userProfileEntity.discipline}</dd>
            <dt>
              <Translate contentKey="synergyApp.userProfile.season">Season</Translate>
            </dt>
            <dd>
              {userProfileEntity.seasons
                ? userProfileEntity.seasons.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userProfileEntity.seasons.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="synergyApp.userProfile.tag">Tag</Translate>
            </dt>
            <dd>
              {userProfileEntity.tags
                ? userProfileEntity.tags.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userProfileEntity.tags.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/user-profile" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userProfile }: IRootState) => ({
  userProfileEntity: userProfile.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDetail);
