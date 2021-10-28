import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PRE_CODE } from '#helpers/constants';
import {
    postGalerieSubscribe,
    selectGaleriesLoadingPost,
} from '#store/galeries';
import { selectNotification, updateNotification } from '#store/notification';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.SubscribeGalerieNavigationProp;
};

const SubscribeGalerieScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const notification = useSelector(selectNotification);
    const loading = useSelector(selectGaleriesLoadingPost);

    const [hasPermission, setHasPermission] = React.useState<boolean | null>(
        null
    );

    const handleBarCodeScanned: BarCodeScannedCallback = React.useCallback(
        ({ data }) => {
            if (notification) return;
            if (loading.includes('LOADING')) return;
            const code = data.split(PRE_CODE)[1];
            if (!code) {
                dispatch(
                    updateNotification({
                        status: 'error',
                        text: 'wrong QRcode',
                    })
                );
            }
            dispatch(postGalerieSubscribe({ code }));
        },
        [loading, notification]
    );

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    React.useEffect(() => {
        if (hasPermission === false) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [hasPermission]);

    return (
        <Container>
            <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={handleBarCodeScanned}
            />
        </Container>
    );
};

export default SubscribeGalerieScreen;
