import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { setProfilePictures, setUsers } from '#store/actions';
import { meSelector } from '#store/selectors';
import normalizeData from '#helpers/normalizeData';

export const ProfilePicturesFetcherContext = React.createContext<{
    fetchProfilePicture: (user?: Store.Models.User) => void;
}>({
    fetchProfilePicture: () => {},
});

export const ProfilePicturesFetcherProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const { id: currentUserId } = useSelector(meSelector);

    const [usersFetched, setUsersFetched] = React.useState<{
        [key: string]: { user: Store.Models.User; status: Store.Status };
    }>({});

    const fetchProfilePicture = React.useCallback(
        (user?: Store.Models.User) => {
            if (user)
                setUsersFetched((prevState) => {
                    if (!prevState[user.id]) {
                        return {
                            ...prevState,
                            [user.id]: { user, status: 'PENDING' },
                        };
                    }
                    return prevState;
                });
        },
        [usersFetched]
    );

    React.useEffect(() => {
        if (Object.keys(usersFetched).length) {
            const needToBeFetched = Object.entries(usersFetched).filter(
                (data) =>
                    data[1].status === 'PENDING' || data[1].status === 'ERROR'
            );
            if (needToBeFetched.length) {
                const fetching: {
                    [key: string]: {
                        user: Store.Models.User;
                        status: Store.Status;
                    };
                } = {};
                needToBeFetched.forEach(([id, data]) => {
                    fetching[id] = { user: data.user, status: 'FETCHING' };
                });
                setUsersFetched((prevState) => {
                    return {
                        ...prevState,
                        ...fetching,
                    };
                });
                needToBeFetched.forEach(([id, data]) => {
                    const url =
                        currentUserId === id
                            ? END_POINT.GET_ME_CURRENT_PROFILE_PICTURE
                            : END_POINT.GET_USER_CURRENT_PROFILE_PICTURE(id);
                    request({
                        body: {},
                        method: 'GET',
                        url,
                    })
                        .then((res) => {
                            const currentProfilePicture =
                                res.data.data &&
                                res.data.data.currentProfilePicture !==
                                    undefined
                                    ? (res.data.data
                                          .currentProfilePicture as Store.Models.ProfilePicture)
                                    : null;
                            dispatch(
                                setUsers({
                                    byId: {
                                        [data.user.id]: {
                                            ...data.user,
                                            currentProfilePictureId:
                                                currentProfilePicture
                                                    ? currentProfilePicture.id
                                                    : null,
                                        },
                                    },
                                })
                            );
                            if (currentProfilePicture) {
                                const normalized = normalizeData(
                                    currentProfilePicture
                                );
                                dispatch(
                                    setProfilePictures({
                                        data: {
                                            byId: {
                                                ...normalized.byId,
                                            },
                                        },
                                    })
                                );
                            }
                            setUsersFetched((prevState) => ({
                                ...prevState,
                                [id]: { user: data.user, status: 'SUCCESS' },
                            }));
                        })
                        .catch(() =>
                            setUsersFetched((prevState) => ({
                                ...prevState,
                                [id]: { user: data.user, status: 'SUCCESS' },
                            }))
                        );
                });
            }
        }
    }, [usersFetched]);

    return (
        <ProfilePicturesFetcherContext.Provider value={{ fetchProfilePicture }}>
            {children}
        </ProfilePicturesFetcherContext.Provider>
    );
};
