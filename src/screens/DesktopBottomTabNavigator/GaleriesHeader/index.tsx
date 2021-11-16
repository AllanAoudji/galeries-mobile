import {
    DrawerActions,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import * as React from 'react';
import { InteractionManager, Keyboard, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Pictogram, SearchBar } from '#components';
import { GaleriesSearchContext } from '#contexts/GaleriesSearchContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getGaleries,
    resetGaleriesFilterName,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
    updateGaleriesFilterName,
} from '#store/galeries';

import { Container } from './styles';

const GaleriesHeader = () => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GaleriesNavigationProp>();

    const { setSearchFinished } = React.useContext(GaleriesSearchContext);

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const [value, setValue] = React.useState<string>(filterGaleriesName);

    const handleChangeText = React.useCallback((e: string) => {
        dispatch(updateGaleriesFilterName(e.trim()));
    }, []);
    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        navigation.dispatch(DrawerActions.openDrawer());
    }, [navigation]);
    const handleStopTyping = React.useCallback(
        () => setSearchFinished(true),
        []
    );

    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetGaleriesFilterName());
                setValue('');
                setSearchFinished(true);
            },
            []
        )
    );

    useFocusEffect(
        React.useCallback(() => {
            if (galeriesNameStatus === 'PENDING') {
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getGaleries(filterGaleriesName));
                });
                if (filterGaleriesName !== '') setSearchFinished(false);
            }
        }, [filterGaleriesName, galeriesNameStatus])
    );

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                color="primary"
                height={
                    GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT -
                    (StatusBar.currentHeight || 0)
                }
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="hamburger-menu"
            />
            <SearchBar
                onChangeText={handleChangeText}
                onStopTyping={handleStopTyping}
                placeholder="search galeries..."
                setValue={setValue}
                value={value}
            />
        </Container>
    );
};

export default GaleriesHeader;
