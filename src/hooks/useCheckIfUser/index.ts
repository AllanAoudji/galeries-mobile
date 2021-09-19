import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { setMe, setUsers } from '#store/actions';

const useCheckIfUser = () => {
    const dispatch = useDispatch();

    const [userLoaded, setUserLoaded] = React.useState<boolean>(false);

    const checkIfUser = React.useCallback(() => {
        request({
            body: {},
            method: 'GET',
            url: END_POINT.GET_ME,
        })
            .then((res) => {
                if (
                    res.data.data &&
                    res.data.data.user &&
                    typeof res.data.data.user === 'object'
                ) {
                    const { id } = res.data.data.user;
                    if (typeof id === 'string') {
                        dispatch(
                            setUsers({ byId: { [id]: res.data.data.user } })
                        );
                        dispatch(setMe({ id, status: 'SUCCESS' }));
                        setUserLoaded(true);
                    } else {
                        AsyncStorage.clear().finally(() => setUserLoaded(true));
                    }
                } else {
                    AsyncStorage.clear().finally(() => setUserLoaded(true));
                }
            })
            .catch(() => {
                AsyncStorage.clear().finally(() => setUserLoaded(true));
            });
    }, []);

    return { checkIfUser, userLoaded };
};

export default useCheckIfUser;
