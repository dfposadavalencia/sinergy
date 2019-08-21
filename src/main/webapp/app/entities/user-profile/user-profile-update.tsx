import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISeason } from 'app/shared/model/season.model';
import { getEntities as getSeasons } from 'app/entities/season/season.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserProfileUpdateState {
  isNew: boolean;
  idsseason: any[];
  idstag: any[];
}

export class UserProfileUpdate extends React.Component<IUserProfileUpdateProps, IUserProfileUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsseason: [],
      idstag: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getSeasons();
    this.props.getTags();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userProfileEntity } = this.props;
      const entity = {
        ...userProfileEntity,
        ...values,
        seasons: mapIdList(values.seasons),
        tags: mapIdList(values.tags)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/user-profile');
  };

  render() {
    const { userProfileEntity, seasons, tags, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="synergyApp.userProfile.home.createOrEditLabel">
              <Translate contentKey="synergyApp.userProfile.home.createOrEditLabel">Create or edit a UserProfile</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userProfileEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-profile-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-profile-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="gradeLabel" for="user-profile-grade">
                    <Translate contentKey="synergyApp.userProfile.grade">Grade</Translate>
                  </Label>
                  <AvField id="user-profile-grade" type="text" name="grade" />
                </AvGroup>
                <AvGroup>
                  <Label id="voiceLabel" for="user-profile-voice">
                    <Translate contentKey="synergyApp.userProfile.voice">Voice</Translate>
                  </Label>
                  <AvField id="user-profile-voice" type="text" name="voice" />
                </AvGroup>
                <AvGroup>
                  <Label id="disciplineLabel" for="user-profile-discipline">
                    <Translate contentKey="synergyApp.userProfile.discipline">Discipline</Translate>
                  </Label>
                  <AvField id="user-profile-discipline" type="text" name="discipline" />
                </AvGroup>
                <AvGroup>
                  <Label for="user-profile-season">
                    <Translate contentKey="synergyApp.userProfile.season">Season</Translate>
                  </Label>
                  <AvInput
                    id="user-profile-season"
                    type="select"
                    multiple
                    className="form-control"
                    name="seasons"
                    value={userProfileEntity.seasons && userProfileEntity.seasons.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {seasons
                      ? seasons.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user-profile-tag">
                    <Translate contentKey="synergyApp.userProfile.tag">Tag</Translate>
                  </Label>
                  <AvInput
                    id="user-profile-tag"
                    type="select"
                    multiple
                    className="form-control"
                    name="tags"
                    value={userProfileEntity.tags && userProfileEntity.tags.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {tags
                      ? tags.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-profile" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  seasons: storeState.season.entities,
  tags: storeState.tag.entities,
  userProfileEntity: storeState.userProfile.entity,
  loading: storeState.userProfile.loading,
  updating: storeState.userProfile.updating,
  updateSuccess: storeState.userProfile.updateSuccess
});

const mapDispatchToProps = {
  getSeasons,
  getTags,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileUpdate);
