import { learningConstants } from '../actions';

const LEARNING_INITIAL = {
	baseImageIndex: 0,
}

export const learningReducer = (state = LEARNING_INITIAL, action) => {
	switch (action.type) {
		case learningConstants.CHANGE_TOP_IMAGE:
			return {
				...state,
				topImageIndex: action.imageIndex
			}
		case learningConstants.CHANGE_BASE_IMAGE:
			return {
				...state,
				baseImageIndex: action.imageIndex
			}
		default:
			return state;
	}
}