import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTiming } from 'react-native-reanimated';

import {
    BottomLoader,
    DefaultHeader,
    FullScreenLoader,
    SearchBar,
} from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';

import { Container, Header, SearchBarContainer } from './styles';
import {
    getGaleries,
    selectGaleriesAllIds,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
    updateGaleriesFilterName,
} from '#store/galeries';

import EmptyScrollView from './EmptyScrollView';
import Galeries from './Galeries';

const GaleriesScreen = () => {
    const dispatch = useDispatch();

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const galeriesAllIds = useSelector(selectGaleriesAllIds);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const { onLayout: onInnerLayout, size: innerSize } = useComponentSize();
    const { onLayout: onOuterLayout, size: outerSize } = useComponentSize();
    const { containerStyle, headerStyle, scrollHandler, translateY } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT, true);

    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<string>(filterGaleriesName);

    const innerPaddingTop = React.useMemo(
        () => (innerSize ? innerSize.height : 0),
        [innerSize]
    );
    const outerPaddingTop = React.useMemo(
        () => (outerSize ? outerSize.height : 0),
        [outerSize]
    );

    const handleChangeText = React.useCallback((e: string) => {
        dispatch(updateGaleriesFilterName(e.trim()));
    }, []);
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
                dispatch(getGaleries(filterGaleriesName));
                if (filterGaleriesName !== '') setSearchFinished(false);
            }
        }, [filterGaleriesName, galeriesNameStatus])
    );

    return (
        <Container>
            <Header onLayout={onOuterLayout} style={containerStyle}>
                <DefaultHeader
                    style={headerStyle}
                    onLayout={onInnerLayout}
                    title="galeries"
                />
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
                    innerPaddingTop={innerPaddingTop}
                    outerPaddingTop={outerPaddingTop}
                    scrollHandler={scrollHandler}
                />
            ) : (
                <EmptyScrollView
                    innerPaddingTop={innerPaddingTop}
                    outerPaddingTop={outerPaddingTop}
                    scrollHandler={scrollHandler}
                />
            )}
            <FullScreenLoader
                show={
                    galeriesNameStatus === 'PENDING' ||
                    galeriesNameStatus === 'INITIAL_LOADING' ||
                    !searchFinished
                }
            />
            <BottomLoader
                show={galeriesNameStatus === 'LOADING'}
                bottom="huge"
            />
        </Container>
    );
};

export default GaleriesScreen;
