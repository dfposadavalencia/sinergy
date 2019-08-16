import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAgenda, defaultValue } from 'app/shared/model/agenda.model';

export const ACTION_TYPES = {
  FETCH_AGENDA_LIST: 'agenda/FETCH_AGENDA_LIST',
  FETCH_AGENDA: 'agenda/FETCH_AGENDA',
  CREATE_AGENDA: 'agenda/CREATE_AGENDA',
  UPDATE_AGENDA: 'agenda/UPDATE_AGENDA',
  DELETE_AGENDA: 'agenda/DELETE_AGENDA',
  RESET: 'agenda/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAgenda>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AgendaState = Readonly<typeof initialState>;

// Reducer

export default (state: AgendaState = initialState, action): AgendaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AGENDA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AGENDA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AGENDA):
    case REQUEST(ACTION_TYPES.UPDATE_AGENDA):
    case REQUEST(ACTION_TYPES.DELETE_AGENDA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AGENDA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AGENDA):
    case FAILURE(ACTION_TYPES.CREATE_AGENDA):
    case FAILURE(ACTION_TYPES.UPDATE_AGENDA):
    case FAILURE(ACTION_TYPES.DELETE_AGENDA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AGENDA_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_AGENDA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AGENDA):
    case SUCCESS(ACTION_TYPES.UPDATE_AGENDA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AGENDA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/agenda';

// Actions

export const getEntities: ICrudGetAllAction<IAgenda> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AGENDA_LIST,
    payload: axios.get<IAgenda>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAgenda> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AGENDA,
    payload: axios.get<IAgenda>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAgenda> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AGENDA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IAgenda> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AGENDA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAgenda> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AGENDA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
