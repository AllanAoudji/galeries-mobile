import { useFocusEffect } from '@react-navigation/native';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar, StyleSheet } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pictogram } from '#components';
import { GLOBAL_STYLE, PRE_CODE } from '#helpers/constants';
import {
    postGalerieSubscribe,
    resetGaleriesLoadingPost,
    selectGaleriesLoadingPost,
} from '#store/galeries';
import { selectNotification, updateNotification } from '#store/notification';

import { BackButtonContainer, Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.SubscribeGalerieNavigationProp;
};

const SubscribeGalerieScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const mounted = React.useRef<boolean>(false);

    const notification = useSelector(selectNotification);
    const loading = useSelector(selectGaleriesLoadingPost);

    const [hasPermission, setHasPermission] = React.useState<boolean | null>(
        null
    );

    const [fetching, setFetching] = React.useState<boolean>(false);

    const handleBarCodeScanned: BarCodeScannedCallback = React.useCallback(
        ({ data }) => {
            if (notification) return;
            const code = data.split(PRE_CODE)[1];
            if (!code) {
                dispatch(
                    updateNotification({
                        status: 'error',
                        text: 'wrong QRcode',
                    })
                );
            }
            if (!fetching) {
                setFetching(true);
                dispatch(postGalerieSubscribe({ code }));
            }
        },
        [fetching, notification]
    );
    const handlePressBack = React.useCallback(() => {
        if (!fetching) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [fetching, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const { status } =
                    await BarCodeScanner.requestPermissionsAsync();
                if (mounted.current) setHasPermission(status === 'granted');
            })();
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (hasPermission === false) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [hasPermission, navigation])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetGaleriesLoadingPost());
                navigation.navigate('Galerie');
            }
            if (loading === 'ERROR') setFetching(false);
        }, [loading, navigation])
    );

    useFocusEffect(
        React.useCallback(() => {
            setFetching(false);
        }, [])
    );

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

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
