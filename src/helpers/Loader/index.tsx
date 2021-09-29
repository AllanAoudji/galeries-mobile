import { useFonts } from 'expo-font';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SplashScreen } from '#components';
import { getMe, selectMe } from '#store/me';
import { selectLoginStatus } from '#store/login';

const Loader: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const me = useSelector(selectMe);
    const loginStatus = useSelector(selectLoginStatus);

    const [fontsLoaded] = useFonts({
        HelveticaLtStBold: require('../../../assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('../../../assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('../../../assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('../../../assets/fonts/HelveticaLTStd-Roman.otf'),
    });

    React.useEffect(() => {
        if (!loginStatus.includes('LOADING')) dispatch(getMe());
    }, [me, loginStatus]);

    if (
        !fontsLoaded ||
        loginStatus === 'PENDING' ||
        loginStatus.includes('LOADING')
    ) {
        return <SplashScreen />;
    }

    return <>{children}</>;
};

export default Loader;
