import { Dispatch } from 'redux';
import { updateUsersById } from '#store/users/actionCreators';

const successPutMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload !== 'object') return;
    if (typeof action.payload.data !== 'object') return;

    const meId = getState().me.id;
    if (!meId) return;

    const me = getState().users.byId[meId];
    if (!me) return;

    const { hasNewNotifications } = action.payload.data;

    if (typeof hasNewNotifications === 'boolean') {
        dispatch(
            updateUsersById({
                ...me,
                hasNewNotifications,
            })
        );
    }
};

export default successPutMethod;
