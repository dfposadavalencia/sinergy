import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChallenge } from 'app/shared/model/challenge.model';
import { getEntities as getChallenges } from 'app/entities/challenge/challenge.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { IAgenda } from 'app/shared/model/agenda.model';
import { getEntities as getAgenda } from 'app/entities/agenda/agenda.reducer';
import { getEntity, updateEntity, createEntity, reset } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IActivityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IActivityUpdateState {
  isNew: boolean;
  idstag: any[];
  challengeId: string;
  agendaId: string;
}

export class ActivityUpdate extends React.Component<IActivityUpdateProps, IActivityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstag: [],
      challengeId: '0',
      agendaId: '0',
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

    this.props.getChallenges();
    this.props.getTags();
    this.props.getAgenda();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { activityEntity } = this.props;
      const entity = {
        ...activityEntity,
        ...values,
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
    this.props.history.push('/entity/activity');
  };

  render() {
    const { activityEntity, challenges, tags, agenda, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="synergyApp.activity.home.createOrEditLabel">
              <Translate contentKey="synergyApp.activity.home.createOrEditLabel">Create or edit a Activity</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : activityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="activity-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="activity-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="activity-name">
                    <Translate contentKey="synergyApp.activity.name">Name</Translate>
                  </Label>
                  <AvField id="activity-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="placeLabel" for="activity-place">
                    <Translate contentKey="synergyApp.activity.place">Place</Translate>
                  </Label>
                  <AvField id="activity-place" type="text" name="place" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="activity-startDate">
                    <Translate contentKey="synergyApp.activity.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="activity-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.activityEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="activity-endDate">
                    <Translate contentKey="synergyApp.activity.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="activity-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.activityEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pointsLabel" for="activity-points">
                    <Translate contentKey="synergyApp.activity.points">Points</Translate>
                  </Label>
                  <AvField id="activity-points" type="string" className="form-control" name="points" />
                </AvGroup>
                <AvGroup>
                  <Label for="activity-challenge">
                    <Translate contentKey="synergyApp.activity.challenge">Challenge</Translate>
                  </Label>
                  <AvInput id="activity-challenge" type="select" className="form-control" name="challenge.id">
                    <option value="" key="0" />
                    {challenges
                      ? challenges.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="activity-tag">
                    <Translate contentKey="synergyApp.activity.tag">Tag</Translate>
                  </Label>
                  <AvInput
                    id="activity-tag"
                    type="select"
                    multiple
                    className="form-control"
                    name="tags"
                    value={activityEntity.tags && activityEntity.tags.map(e => e.id)}
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
                <AvGroup>
                  <Label for="activity-agenda">
                    <Translate contentKey="synergyApp.activity.agenda">Agenda</Translate>
                  </Label>
                  <AvInput id="activity-agenda" type="select" className="form-control" name="agenda.id">
                    <option value="" key="0" />
                    {agenda
                      ? agenda.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/activity" replace color="info">
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
  challenges: storeState.challenge.entities,
  tags: storeState.tag.entities,
  agenda: storeState.agenda.entities,
  activityEntity: storeState.activity.entity,
  loading: storeState.activity.loading,
  updating: storeState.activity.updating,
  updateSuccess: storeState.activity.updateSuccess
});

const mapDispatchToProps = {
  getChallenges,
  getTags,
  getAgenda,
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
)(ActivityUpdate);
