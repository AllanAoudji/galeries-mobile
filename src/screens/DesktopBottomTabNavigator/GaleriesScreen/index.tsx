import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTiming } from 'react-native-reanimated';

import { InteractionManager } from 'react-native';
import {
    BottomLoader,
    DefaultHeader,
    FullScreenLoader,
    SearchBar,
} from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import {
    getGaleries,
    resetGaleriesFilterName,
    selectGaleriesAllIds,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
    updateGaleriesFilterName,
} from '#store/galeries';

import EmptyScrollView from './EmptyScrollView';
import Galeries from './Galeries';

import { Container, Header, SearchBarContainer } from './styles';

const GaleriesScreen = () => {
    const dispatch = useDispatch();

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const galeriesAllIds = useSelector(selectGaleriesAllIds);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const { containerStyle, headerStyle, scrollHandler, translateY } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT);

    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<string>(filterGaleriesName);

    const showBottonLoader = React.useMemo(
        () =>
            galeriesNameStatus === 'PENDING' ||
            galeriesNameStatus === 'INITIAL_LOADING' ||
            !searchFinished,
        [galeriesNameStatus, searchFinished]
    );
    const handleChangeText = React.useCallback(
        (e: string) => {
            dispatch(updateGaleriesFilterName(e.trim()));
            translateY.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(200));
        },
        [searchFinished]
    );
    const handleFocusSearchBar = React.useCallback(() => {
        translateY.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(200));
    }, []);
    const handleStopTyping = React.useCallback(
        () => setSearchFinished(true),
        []
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
            if (showBottonLoader) translateY.value = 0;
        }, [showBottonLoader])
    );

    return (
        <Container>
            <Header style={containerStyle}>
                <DefaultHeader style={headerStyle} title="galeries" />
                <SearchBarContainer>
                    <SearchBar
                        mt="smallest"
                        onChangeText={handleChangeText}
                        onFocus={handleFocusSearchBar}
                        onStopTyping={handleStopTyping}
                        setValue={setValue}
                        value={value}
                    />
                </SearchBarContainer>
            </Header>
            {!!galeriesAllIds && galeriesAllIds.length > 0 ? (
                <Galeries
                    allIds={galeriesAllIds}
                    scrollHandler={scrollHandler}
                />
            ) : (
                <EmptyScrollView scrollHandler={scrollHandler} />
            )}
            <FullScreenLoader show={showBottonLoader} />
            <BottomLoader
                bottom="huge"
                show={galeriesNameStatus === 'LOADING'}
            />
        </Container>
    );
};

export default GaleriesScreen;
