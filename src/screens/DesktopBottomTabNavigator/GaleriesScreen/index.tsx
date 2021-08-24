import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { withTiming } from 'react-native-reanimated';

import {
    AnimatedFlatList,
    BottomLoader,
    FullScreenLoader,
    GalerieModal,
    SearchBar,
    Typography,
} from '#components';
import { DesktopBottomTabScreenHeader } from '#components/Screen';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import {
    fetchGaleries,
    setGaleries,
    setGaleriesNameFilter,
} from '#store/actions';
import {
    filtersGaleriesNameSelector,
    galeriesStatusSelector,
    galeriesEndSelector,
    galeriesAllIdsSelector,
} from '#store/selectors';

import { Container, Header, SearchBarContainer } from './styles';

const GaleriesScreen = () => {
    const { onLayout, size } = useComponentSize();
    const { containerStyle, headerStyle, scrollHandler, translateY } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT);

    const dispatch = useDispatch();
    const filtersGaleriesName = useSelector(filtersGaleriesNameSelector);
    const galeriesAllIds = useSelector(galeriesAllIdsSelector);
    const galeriesEnd = useSelector(galeriesEndSelector);
    const galeriesStatus = useSelector(galeriesStatusSelector);

    const [fetchFinished, setFetchFinished] = React.useState<boolean>(true);
    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);
    const [hasFocus, setHasFocus] = React.useState<boolean>(false);
    const [isFirstLoad, setIsFirstLoad] = React.useState<boolean>(true);
    const [name, setName] = React.useState<string>('');
    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);

    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT,
            offset: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT * index,
            index,
        }),
        []
    );
    const handleChangeText = React.useCallback((e: string) => {
        setSearchFinished(false);
        setName(e);
        dispatch(setGaleriesNameFilter(e.trim()));
    }, []);
    const handleReachEnd = React.useCallback(() => {
        if (!galeriesEnd && galeriesStatus !== 'FETCHING') {
            setFetchFinished(false);
            dispatch(fetchGaleries({ name: filtersGaleriesName }));
        }
    }, [galeriesEnd, galeriesStatus]);
    const keyExtractor = React.useCallback((id) => id, []);
    const onFocusSearchBar = React.useCallback(() => {
        translateY.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(200));
    }, []);
    const onScrollBeginDrag = React.useCallback(() => Keyboard.dismiss(), []);
    const onStopTyping = React.useCallback(() => {
        setSearchFinished(true);
    }, []);
    const removeGalerie = React.useCallback(
        (id: string) => {
            galeriesAllIds.filter((galerieId) => galerieId !== id);
            dispatch(
                setGaleries({
                    data: {
                        allIds: galeriesAllIds,
                    },
                    meta: {
                        query: {
                            name: filtersGaleriesName,
                        },
                    },
                })
            );
        },
        [galeriesAllIds]
    );
    const renderItem = React.useCallback(
        ({ item }) => {
            return (
                <GalerieModal
                    animationOnMount={isFirstLoad}
                    id={item}
                    removeGalerie={removeGalerie}
                />
            );
        },
        [galeriesStatus, isFirstLoad]
    );

    useFocusEffect(
        React.useCallback(() => {
            setHasFocus(true);
            return () => {
                setHasFocus(false);
                setName('');
                dispatch(setGaleriesNameFilter(''));
            };
        }, [])
    );

    // Check if need opacity animation on mount.
    React.useEffect(() => {
        if (firstFetchFinished && hasFocus) {
            if (galeriesStatus === 'PENDING') setIsFirstLoad(true);
            else setIsFirstLoad(false);
        }
    }, [firstFetchFinished, galeriesStatus, hasFocus]);
    // Fetch galeries
    React.useEffect(() => {
        if (galeriesStatus === 'PENDING' && hasFocus) {
            setFirstFetchFinished(false);
            dispatch(fetchGaleries({ name: filtersGaleriesName }));
        }
    }, [galeriesStatus, filtersGaleriesName, hasFocus]);
    // Check if fetch is finished
    React.useEffect(() => {
        if (
            (galeriesStatus === 'SUCCESS' || galeriesStatus === 'ERROR') &&
            hasFocus &&
            searchFinished
        ) {
            setFirstFetchFinished(true);
            if (!fetchFinished) setFetchFinished(true);
        }
    }, [fetchFinished, galeriesStatus, searchFinished, hasFocus]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DesktopBottomTabScreenHeader style={headerStyle} />
                <SearchBarContainer>
                    <Typography fontSize={24}>Galeries</Typography>
                    <SearchBar
                        mt="smallest"
                        onChangeText={handleChangeText}
                        onFocus={onFocusSearchBar}
                        onStopTyping={onStopTyping}
                        value={name}
                    />
                </SearchBarContainer>
            </Header>
            {firstFetchFinished && (
                <AnimatedFlatList
                    contentContainerStyle={{ paddingTop }}
                    data={galeriesAllIds}
                    getItemLayout={getItemLayout}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={4}
                    onEndReached={handleReachEnd}
                    onEndReachedThreshold={0.2}
                    onScroll={scrollHandler}
                    onScrollBeginDrag={onScrollBeginDrag}
                    removeClippedSubviews={true}
                    renderItem={renderItem}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <FullScreenLoader show={!firstFetchFinished} />
            <BottomLoader show={!fetchFinished} />
        </Container>
    );
};

export default React.memo(GaleriesScreen, () => true);
