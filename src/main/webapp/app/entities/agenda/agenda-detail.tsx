import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './agenda.reducer';
import { IAgenda } from 'app/shared/model/agenda.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAgendaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AgendaDetail extends React.Component<IAgendaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { agendaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="synergyApp.agenda.detail.title">Agenda</Translate> [<b>{agendaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="attendance">
                <Translate contentKey="synergyApp.agenda.attendance">Attendance</Translate>
              </span>
            </dt>
            <dd>{agendaEntity.attendance ? 'true' : 'false'}</dd>
            <dt>
              <span id="activityScoring">
                <Translate contentKey="synergyApp.agenda.activityScoring">Activity Scoring</Translate>
              </span>
            </dt>
            <dd>{agendaEntity.activityScoring}</dd>
            <dt>
              <span id="moderatorScoring">
                <Translate contentKey="synergyApp.agenda.moderatorScoring">Moderator Scoring</Translate>
              </span>
            </dt>
            <dd>{agendaEntity.moderatorScoring}</dd>
            <dt>
              <Translate contentKey="synergyApp.agenda.userProfile">User Profile</Translate>
            </dt>
            <dd>{agendaEntity.userProfile ? agendaEntity.userProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/agenda" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/agenda/${agendaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ agenda }: IRootState) => ({
  agendaEntity: agenda.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDetail);
