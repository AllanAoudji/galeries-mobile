import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar, StyleSheet } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';
import { GLOBAL_STYLE, PRE_CODE } from '#helpers/constants';
import {
    postGalerieSubscribe,
    resetGaleriesLoadingPost,
    selectGaleriesLoadingPost,
} from '#store/galeries';
import { selectNotification, updateNotification } from '#store/notification';

import { BackButtonContainer, Container } from './styles';
import { Pictogram } from '#components';

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
            if (loading.includes('LOADING') || loading === 'SUCCESS') return;
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
    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

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

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetGaleriesLoadingPost());
                navigation.navigate('Galerie');
            }
        }, [loading])
    );

    return (
        <Container>
            <BackButtonContainer paddingTop={StatusBar.currentHeight}>
                <Pictogram
                    color="secondary-light"
                    height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                    onPress={handlePressBack}
                    pl="small"
                    pr="small"
                    variant="arrow-left"
                />
            </BackButtonContainer>
            <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={handleBarCodeScanned}
            />
        </Container>
    );
};

export default SubscribeGalerieScreen;
