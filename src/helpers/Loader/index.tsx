import { useFonts } from 'expo-font';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SplashScreen } from '#components';
import { getMe, selectMe, selectMeStatus } from '#store/me';

const Loader: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const me = useSelector(selectMe);
    const meStatus = useSelector(selectMeStatus);

    const [fontsLoaded] = useFonts({
        HelveticaLtStBold: require('../../../assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('../../../assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('../../../assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('../../../assets/fonts/HelveticaLTStd-Roman.otf'),
    });

    React.useEffect(() => {
        if (meStatus === 'PENDING') dispatch(getMe());
    }, [me, meStatus]);

    if (
        !fontsLoaded ||
        meStatus === 'PENDING' ||
        meStatus.includes('LOADING')
    ) {
        return <SplashScreen />;
    }

    return <>{children}</>;
};

export default Loader;
