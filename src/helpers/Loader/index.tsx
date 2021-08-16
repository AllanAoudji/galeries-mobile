import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { SplashScreen } from '#components';
import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { setUser } from '#store/actions';

const Loader: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();
    const [userLoaded, setUserLoaded] = React.useState<boolean>(false);
    const [fontsLoaded] = useFonts({
        HelveticaLtStBold: require('../../../assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('../../../assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('../../../assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('../../../assets/fonts/HelveticaLTStd-Roman.otf'),
    });
    React.useEffect(() => {
        request({
            body: {},
            method: 'GET',
            url: END_POINT.GET_ME,
        })
            .then((res) => {
                dispatch(
                    setUser({ data: res.data.data.user, status: 'SUCCESS' })
                );
                setUserLoaded(true);
            })
            .catch(() => {
                AsyncStorage.clear().finally(() => setUserLoaded(true));
            });
    }, []);

    if (!fontsLoaded || !userLoaded) {
        return <SplashScreen />;
    }

    return <>{children}</>;
};

export default Loader;
