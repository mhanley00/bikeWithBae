import { TOGGLE_VISIBLE_LAYER } from 'constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBLE_LAYER:
      if (state.indexOf(action.id) === -1) {
        return [
          ...state,
          action.id,
        ];
      }
      return [
        ...state.slice(0, state.indexOf(action.id)),
        ...state.slice(state.indexOf(action.id) + 1),
      ];
    default:
      return state;
  }
};
