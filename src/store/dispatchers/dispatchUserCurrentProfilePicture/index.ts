import { Dispatch } from 'redux';

import { updateUsersById } from '#store/users/actionCreators';

const dispatchUserCurrentProfilePicture = (
    dispatch: Dispatch<Store.Action>,
    user: Store.Models.User,
    currentProfilePicture: {
        id?: string | null;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateUsersById({
            ...user,
            currentProfilePicture: {
                id:
                    currentProfilePicture.id ||
                    (user.currentProfilePicture
                        ? user.currentProfilePicture.id
                        : null),
                status:
                    currentProfilePicture.status ||
                    (user.currentProfilePicture
                        ? user.currentProfilePicture.status
                        : 'PENDING'),
            },
        })
    );
};

export default dispatchUserCurrentProfilePicture;
