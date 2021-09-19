import { useFonts } from 'expo-font';
import * as React from 'react';

import { SplashScreen } from '#components';
import { useCheckIfUser } from '#hooks';

const Loader: React.FC<{}> = ({ children }) => {
    const { checkIfUser, userLoaded } = useCheckIfUser();
    const [fontsLoaded] = useFonts({
        HelveticaLtStBold: require('../../../assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('../../../assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('../../../assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('../../../assets/fonts/HelveticaLTStd-Roman.otf'),
    });

    React.useEffect(() => {
        checkIfUser();
    }, []);

    if (!fontsLoaded || !userLoaded) {
        return <SplashScreen />;
    }

    return <>{children}</>;
};

export default Loader;
