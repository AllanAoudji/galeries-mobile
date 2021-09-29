import { Dispatch } from 'redux';

import { updateGaleriesById } from '#store/galeries/actionCreators';

const dispatchUpdateGalerieUsers = (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    users: {
        allIds?: string[];
        end?: boolean;
        previous?: string | undefined;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateGaleriesById({
            ...galerie,
            users: {
                allIds: [
                    ...(galerie.users ? galerie.users.allIds : []),
                    ...(users.allIds || []),
                ],
                end: users.end || (galerie.users ? galerie.users.end : false),
                previous:
                    users.previous ||
                    (galerie.users ? galerie.users.previous : undefined),
                status:
                    users.status ||
                    (galerie.users ? galerie.users.status : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateGalerieUsers;
