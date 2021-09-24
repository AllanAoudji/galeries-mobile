import { Dispatch } from 'redux';
import { NOTIFICATION, RESET, UPDATE } from '#store/genericActionTypes';
import { ERROR_MESSAGE } from '#helpers/constants';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const NOTIFICATION_RESET = `${NOTIFICATION} ${RESET}`;
const NOTIFICATION_UPDATE = `${NOTIFICATION} ${UPDATE}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const resetNotification: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATION_RESET,
});
const updateNotification: (payload: {
    status: 'error' | 'success';
    text: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: NOTIFICATION_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const dispatchErrorNotification: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action | string
) => void = (dispatch, action) => {
    if (action === 'string')
        dispatch(
            updateNotification({
                status: 'error',
                text: action,
            })
        );
    else if (
        typeof action === 'object' &&
        typeof action.payload === 'string' &&
        action.payload.trim() !== ''
    )
        dispatch(
            updateNotification({
                status: 'error',
                text: action.payload.trim(),
            })
        );
    else
        dispatch(
            updateNotification({
                status: 'error',
                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
            })
        );
};
export const dispatchSuccessNotification: (
    dispatch: Dispatch<Store.Action>,
    text: string
) => void = (dispatch, text) => {
    dispatch(
        updateNotification({
            status: 'success',
            text,
        })
    );
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const notificationInitialState: {
    status: 'error' | 'success';
    text: string;
} | null = null;
export const notificationReducer = (
    state = notificationInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATION_RESET:
            return notificationInitialState;
        case NOTIFICATION_UPDATE:
            return action.payload;
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const selectNotification = (state: Store.Reducer) => state.notification;
