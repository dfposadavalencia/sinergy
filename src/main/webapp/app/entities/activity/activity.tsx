import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IActivityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IActivityState = IPaginationBaseState;

export class Activity extends React.Component<IActivityProps, IActivityState> {
  state: IActivityState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { activityList, match } = this.props;
    return (
      <div>
        <h2 id="activity-heading">
          <Translate contentKey="synergyApp.activity.home.title">Activities</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="synergyApp.activity.home.createLabel">Create a new Activity</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {activityList && activityList.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('name')}>
                      <Translate contentKey="synergyApp.activity.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('place')}>
                      <Translate contentKey="synergyApp.activity.place">Place</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('startDate')}>
                      <Translate contentKey="synergyApp.activity.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('endDate')}>
                      <Translate contentKey="synergyApp.activity.endDate">End Date</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('points')}>
                      <Translate contentKey="synergyApp.activity.points">Points</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('status')}>
                      <Translate contentKey="synergyApp.activity.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="synergyApp.activity.challenge">Challenge</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="synergyApp.activity.agenda">Agenda</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {activityList.map((activity, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${activity.id}`} color="link" size="sm">
                          {activity.id}
                        </Button>
                      </td>
                      <td>{activity.name}</td>
                      <td>{activity.place}</td>
                      <td>
                        <TextFormat type="date" value={activity.startDate} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={activity.endDate} format={APP_DATE_FORMAT} />
                      </td>
                      <td>{activity.points}</td>
                      <td>{activity.status}</td>
                      <td>{activity.challenge ? <Link to={`challenge/${activity.challenge.id}`}>{activity.challenge.id}</Link> : ''}</td>
                      <td>{activity.agenda ? <Link to={`agenda/${activity.agenda.id}`}>{activity.agenda.id}</Link> : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${activity.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${activity.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${activity.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="synergyApp.activity.home.notFound">No Activities found</Translate>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ activity }: IRootState) => ({
  activityList: activity.entities,
  totalItems: activity.totalItems,
  links: activity.links,
  entity: activity.entity,
  updateSuccess: activity.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
