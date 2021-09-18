import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { meSelector } from '#store/selectors';
import { setUsers } from '#store/actions';

const useGetCurrentProfilePicture = (initialUser?: Store.Models.User) => {
    const dispatch = useDispatch();
    const { id: currentUserId } = useSelector(meSelector);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<Store.Models.User | undefined>(
        initialUser
    );

    const fetch = React.useCallback(() => {
        if (!loading && user && !user.currentProfilePicute) {
            setLoading(true);
            console.log('fetching');
            const url =
                currentUserId === user.id
                    ? END_POINT.GET_ME_CURRENT_PROFILE_PICTURE
                    : END_POINT.GET_USER_CURRENT_PROFILE_PICTURE(user.id);
            request({
                body: {},
                method: 'GET',
                url,
            })
                .then((res) => {
                    const currentProfilePicture =
                        res.data.data &&
                        res.data.data.currentProfilePicture !== undefined
                            ? res.data.data.currentProfilePicture
                            : null;
                    const userWithCurrentProfilePicture = {
                        ...user,
                        currentProfilePicute: currentProfilePicture,
                    };
                    setUser(userWithCurrentProfilePicture);
                    dispatch(
                        setUsers({
                            byId: {
                                [user.id]: userWithCurrentProfilePicture,
                            },
                        })
                    );
                })
                .catch((err: AxiosError) => console.log(err.response?.data))
                .finally(() => setLoading(false));
        }
    }, [currentUserId, user]);
    React.useEffect(() => {
        if (user && user.currentProfilePicute === undefined) fetch();
    }, [user]);

    return { loading };
};

export default useGetCurrentProfilePicture;
