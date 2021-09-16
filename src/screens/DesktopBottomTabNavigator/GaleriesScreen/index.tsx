import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, ListRenderItemInfo } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { withTiming } from 'react-native-reanimated';

import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    FullScreenLoader,
    GalerieCard,
    SearchBar,
} from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { fetchGaleries, setGaleriesNameFilter } from '#store/actions';
import {
    filtersGaleriesNameSelector,
    galeriesStatusSelector,
    galeriesEndSelector,
    galeriesSelector,
} from '#store/selectors';

import { Container, Header, SearchBarContainer } from './styles';

const renderItem = ({ item }: ListRenderItemInfo<Store.Models.Galerie>) => (
    <GalerieCard galerie={item} />
);

const GaleriesScreen = () => {
    const dispatch = useDispatch();

    const focus = useIsFocused();

    const { onLayout, size } = useComponentSize();
    const { containerStyle, headerStyle, scrollHandler, translateY } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT, true);

    const filtersGaleriesName = useSelector(filtersGaleriesNameSelector);
    const galeries = useSelector(galeriesSelector);
    const galeriesEnd = useSelector(galeriesEndSelector);
    const galeriesStatus = useSelector(galeriesStatusSelector);

    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);
    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);
    const [searchValue, setSearchValue] = React.useState<string>('');

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
        dispatch(setGaleriesNameFilter(e.trim()));
    }, []);
    const handleReachEnd = React.useCallback(() => {
        if (!galeriesEnd && galeriesStatus !== 'FETCHING') {
            dispatch(fetchGaleries({ name: filtersGaleriesName }));
        }
    }, [filtersGaleriesName, galeriesEnd, galeriesStatus]);
    const keyExtractor = React.useCallback((galerie) => galerie.id, []);
    const onFocusSearchBar = React.useCallback(() => {
        translateY.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(200));
    }, []);
    const onScrollBeginDrag = React.useCallback(() => Keyboard.dismiss(), []);
    const onStopTyping = React.useCallback(() => {
        setSearchFinished(true);
    }, []);

    // Fetch galeries
    React.useEffect(() => {
        if (galeriesStatus === 'PENDING' && focus) {
            setFirstFetchFinished(false);
            dispatch(fetchGaleries({ name: filtersGaleriesName }));
        }
    }, [galeriesStatus, filtersGaleriesName, focus]);
    // Check if fetch is finished
    React.useEffect(() => {
        if (
            (galeriesStatus === 'SUCCESS' || galeriesStatus === 'ERROR') &&
            focus &&
            searchFinished &&
            !firstFetchFinished
        )
            setFirstFetchFinished(true);
    }, [firstFetchFinished, focus, galeriesStatus, searchFinished]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader style={headerStyle} title="galeries" />
                <SearchBarContainer>
                    <SearchBar
                        mt="smallest"
                        onChangeText={handleChangeText}
                        onFocus={onFocusSearchBar}
                        onStopTyping={onStopTyping}
                        setValue={setSearchValue}
                        value={searchValue}
                    />
                </SearchBarContainer>
            </Header>
            {firstFetchFinished && (
                <AnimatedFlatList
                    contentContainerStyle={{
                        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                        paddingTop,
                    }}
                    data={galeries}
                    getItemLayout={getItemLayout}
                    keyExtractor={keyExtractor}
                    keyboardShouldPersistTaps="handled"
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
            <BottomLoader
                show={
                    firstFetchFinished &&
                    galeriesStatus === 'FETCHING' &&
                    !galeriesEnd
                }
            />
        </Container>
    );
};

export default React.memo(GaleriesScreen, () => true);
