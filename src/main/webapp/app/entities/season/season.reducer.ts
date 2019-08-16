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

import { ISeason, defaultValue } from 'app/shared/model/season.model';

export const ACTION_TYPES = {
  FETCH_SEASON_LIST: 'season/FETCH_SEASON_LIST',
  FETCH_SEASON: 'season/FETCH_SEASON',
  CREATE_SEASON: 'season/CREATE_SEASON',
  UPDATE_SEASON: 'season/UPDATE_SEASON',
  DELETE_SEASON: 'season/DELETE_SEASON',
  RESET: 'season/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISeason>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SeasonState = Readonly<typeof initialState>;

// Reducer

export default (state: SeasonState = initialState, action): SeasonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SEASON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SEASON):
    case REQUEST(ACTION_TYPES.UPDATE_SEASON):
    case REQUEST(ACTION_TYPES.DELETE_SEASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SEASON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEASON):
    case FAILURE(ACTION_TYPES.CREATE_SEASON):
    case FAILURE(ACTION_TYPES.UPDATE_SEASON):
    case FAILURE(ACTION_TYPES.DELETE_SEASON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEASON_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEASON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SEASON):
    case SUCCESS(ACTION_TYPES.UPDATE_SEASON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SEASON):
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

const apiUrl = 'api/seasons';

// Actions

export const getEntities: ICrudGetAllAction<ISeason> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SEASON_LIST,
    payload: axios.get<ISeason>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISeason> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SEASON,
    payload: axios.get<ISeason>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISeason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SEASON,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISeason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SEASON,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISeason> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SEASON,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
