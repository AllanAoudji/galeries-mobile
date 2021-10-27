import { useFocusEffect } from '@react-navigation/native';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, View } from 'react-native';
import * as React from 'react';

type Props = {
    navigation: Screen.DesktopBottomTab.SubscribeGalerieNavigationProp;
};

const SubscribeGalerieScreen = ({ navigation }: Props) => {
    const [hasPermission, setHasPermission] = React.useState<boolean | null>(
        null
    );

    const handleBarCodeScanned: BarCodeScannedCallback = React.useCallback(
        ({ type, data }) => {
            console.log(type, data);
        },
        []
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
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={handleBarCodeScanned}
            />
        </View>
    );
};

export default SubscribeGalerieScreen;
