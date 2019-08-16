import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './agenda.reducer';
import { IAgenda } from 'app/shared/model/agenda.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAgendaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAgendaUpdateState {
  isNew: boolean;
  userProfileId: string;
}

export class AgendaUpdate extends React.Component<IAgendaUpdateProps, IAgendaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userProfileId: '0',
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

    this.props.getUserProfiles();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { agendaEntity } = this.props;
      const entity = {
        ...agendaEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/agenda');
  };

  render() {
    const { agendaEntity, userProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sinergyApp.agenda.home.createOrEditLabel">
              <Translate contentKey="sinergyApp.agenda.home.createOrEditLabel">Create or edit a Agenda</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : agendaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="agenda-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="agenda-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="attendanceLabel" check>
                    <AvInput id="agenda-attendance" type="checkbox" className="form-control" name="attendance" />
                    <Translate contentKey="sinergyApp.agenda.attendance">Attendance</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="activityScoringLabel" for="agenda-activityScoring">
                    <Translate contentKey="sinergyApp.agenda.activityScoring">Activity Scoring</Translate>
                  </Label>
                  <AvField id="agenda-activityScoring" type="string" className="form-control" name="activityScoring" />
                </AvGroup>
                <AvGroup>
                  <Label id="moderatorScoringLabel" for="agenda-moderatorScoring">
                    <Translate contentKey="sinergyApp.agenda.moderatorScoring">Moderator Scoring</Translate>
                  </Label>
                  <AvField id="agenda-moderatorScoring" type="string" className="form-control" name="moderatorScoring" />
                </AvGroup>
                <AvGroup>
                  <Label for="agenda-userProfile">
                    <Translate contentKey="sinergyApp.agenda.userProfile">User Profile</Translate>
                  </Label>
                  <AvInput id="agenda-userProfile" type="select" className="form-control" name="userProfile.id">
                    <option value="" key="0" />
                    {userProfiles
                      ? userProfiles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/agenda" replace color="info">
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
  userProfiles: storeState.userProfile.entities,
  agendaEntity: storeState.agenda.entity,
  loading: storeState.agenda.loading,
  updating: storeState.agenda.updating,
  updateSuccess: storeState.agenda.updateSuccess
});

const mapDispatchToProps = {
  getUserProfiles,
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
)(AgendaUpdate);
