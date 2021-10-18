import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import { Pictogram } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { updateGaleriesCurrent } from '#store/galeries';

import { AbsoluteCoverPicture, Container } from './styles';

const AbsoluteHeader = () => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const handlePress = React.useCallback(() => {
        dispatch(updateGaleriesCurrent(null));
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else navigation.navigate('Home');
    }, [navigation]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <AbsoluteCoverPicture />
            <Pictogram
                color="secondary-light"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
        </Container>
    );
};

export default AbsoluteHeader;
