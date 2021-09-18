type SetProfilePicturesParams = {
    allIds?: string[];
    byId?: { [key: string]: Store.Models.ProfilePicture };
    status?: Store.Status;
};

export const PROFILE_PICTURES: Store.Entity = '[PROFILE PICTURE]';

export const PROFILE_PICTURES_FETCH = `${PROFILE_PICTURES} Fetch`;
export const PROFILE_PICTURES_SET = `${PROFILE_PICTURES} Set`;

export const fetchProfilePictures: () => Store.Action = () => ({
    payload: {
        data: {},
        meta: {},
    },
    type: PROFILE_PICTURES_FETCH,
});
export const resetProfilePictures: () => Store.Action = () => ({
    payload: {
        data: {
            allIds: [],
            byId: {},
            status: 'PENGING',
        },
        meta: {},
    },
    type: PROFILE_PICTURES_SET,
});
export const setProfilePictures: ({
    data,
    meta,
}: {
    data: SetProfilePicturesParams;
    meta?: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data,
        meta: meta || {},
    },
    type: PROFILE_PICTURES_SET,
});
