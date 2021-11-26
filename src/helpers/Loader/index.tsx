import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SplashScreen } from '#components';
import { getMe, selectMe, selectMeStatus } from '#store/me';

import { Container } from './styles';

const INTERVAL = 1000 * 60;

const Loader: React.FC<{}> = ({ children }) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const meStatus = useSelector(selectMeStatus);
    const me = useSelector(selectMe);

    const [assets] = useAssets([require('../../../assets/images/PP.jpg')]);

    const [fontsLoaded] = useFonts({
        HelveticaLtStBold: require('../../../assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('../../../assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('../../../assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('../../../assets/fonts/HelveticaLTStd-Roman.otf'),
    });

    React.useEffect(() => {
        if (meStatus === 'PENDING') dispatch(getMe());
    }, [meStatus]);
    React.useEffect(() => {
        if (!me && timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
        if (me && !timer.current)
            timer.current = setInterval(() => {
                dispatch(getMe());
            }, INTERVAL);
    }, [me]);
    React.useEffect(
        () => () => {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
        },
        []
    );

    if (!assets || !fontsLoaded || meStatus === 'INITIAL_LOADING') {
        return <SplashScreen />;
    }

    return <Container height={dimension.height}>{children}</Container>;
};

export default Loader;
