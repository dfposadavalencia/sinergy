import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserSeason, defaultValue } from 'app/shared/model/user-season.model';

export const ACTION_TYPES = {
  FETCH_USERSEASON_LIST: 'userSeason/FETCH_USERSEASON_LIST',
  FETCH_USERSEASON: 'userSeason/FETCH_USERSEASON',
  CREATE_USERSEASON: 'userSeason/CREATE_USERSEASON',
  UPDATE_USERSEASON: 'userSeason/UPDATE_USERSEASON',
  DELETE_USERSEASON: 'userSeason/DELETE_USERSEASON',
  RESET: 'userSeason/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserSeason>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserSeasonState = Readonly<typeof initialState>;

// Reducer

export default (state: UserSeasonState = initialState, action): UserSeasonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERSEASON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERSEASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERSEASON):
    case REQUEST(ACTION_TYPES.UPDATE_USERSEASON):
    case REQUEST(ACTION_TYPES.DELETE_USERSEASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERSEASON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERSEASON):
    case FAILURE(ACTION_TYPES.CREATE_USERSEASON):
    case FAILURE(ACTION_TYPES.UPDATE_USERSEASON):
    case FAILURE(ACTION_TYPES.DELETE_USERSEASON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSEASON_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSEASON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERSEASON):
    case SUCCESS(ACTION_TYPES.UPDATE_USERSEASON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERSEASON):
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

const apiUrl = 'api/user-seasons';

// Actions

export const getEntities: ICrudGetAllAction<IUserSeason> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERSEASON_LIST,
  payload: axios.get<IUserSeason>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserSeason> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERSEASON,
    payload: axios.get<IUserSeason>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserSeason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERSEASON,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserSeason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERSEASON,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserSeason> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERSEASON,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
