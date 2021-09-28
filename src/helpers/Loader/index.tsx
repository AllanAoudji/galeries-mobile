import { useFonts } from 'expo-font';
import * as React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { SplashScreen } from '#components';
import { getMe, selectMe, selectMeStatus } from '#store/me';

const Loader: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();
    const me = useSelector(selectMe);
    const meStatus = useSelector(selectMeStatus);

    const [test, setTest] = React.useState<boolean>(false);

    const [fontsLoaded] = useFonts({
        HelveticaLtStBold: require('../../../assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('../../../assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('../../../assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('../../../assets/fonts/HelveticaLTStd-Roman.otf'),
    });

    React.useEffect(() => {
        if (test === false) {
            setTest(true);
            dispatch(getMe());
        }
    }, [me, meStatus]);

    const userLoading = React.useCallback(() => {
        if (me) return false;
        if (meStatus === 'ERROR' || meStatus === 'SUCCESS') return false;
        return true;
    }, [me, meStatus]);

    if (!fontsLoaded || !userLoading) {
        return <SplashScreen />;
    }

    return <>{children}</>;
};

export default Loader;
