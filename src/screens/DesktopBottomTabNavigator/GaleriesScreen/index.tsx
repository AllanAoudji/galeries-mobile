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
import {
    useComponentSize,
    useFetchGaleries,
    useHideHeaderOnScroll,
} from '#hooks';
import { setGaleriesNameFilter } from '#store/actions';
import { galeriesSelector, galeriesStatusSelector } from '#store/selectors';

import { Container, Header, SearchBarContainer } from './styles';

const renderItem = ({ item }: ListRenderItemInfo<Store.Models.Galerie>) => (
    <GalerieCard galerie={item} />
);

const GaleriesScreen = () => {
    const dispatch = useDispatch();

    const galeries = useSelector(galeriesSelector);
    const galeriesStatus = useSelector(galeriesStatusSelector);

    const { fetchFrame, fetching, firstFetchIsFinished } = useFetchGaleries();

    const { onLayout, size } = useComponentSize();
    const { containerStyle, headerStyle, scrollHandler, translateY } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT, true);

    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [show, setShow] = React.useState<boolean>(false);

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
        dispatch(setGaleriesNameFilter(e.trim()));
    }, []);
    const handleReachEnd = React.useCallback(() => {
        if (galeriesStatus === 'ERROR' || galeriesStatus === 'SUCCESS')
            fetchFrame();
    }, [fetchFrame, galeriesStatus]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const handleStopTyping = React.useCallback(
        () => setSearchFinished(true),
        []
    );
    const keyExtractor = React.useCallback((galerie) => galerie.id, []);
    const onFocusSearchBar = React.useCallback(() => {
        translateY.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(200));
    }, []);

    React.useEffect(() => fetchFrame(), []);

    React.useEffect(() => {
        if (!firstFetchIsFinished) setShow(true);
    }, [firstFetchIsFinished]);
    React.useEffect(() => {
        if (searchFinished && firstFetchIsFinished) {
            setSearchFinished(false);
            setShow(false);
        }
    }, [searchFinished, firstFetchIsFinished]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader style={headerStyle} title="galeries" />
                <SearchBarContainer>
                    <SearchBar
                        mt="smallest"
                        onChangeText={handleChangeText}
                        onFocus={onFocusSearchBar}
                        onStopTyping={handleStopTyping}
                        setValue={setSearchValue}
                        value={searchValue}
                    />
                </SearchBarContainer>
            </Header>
            {firstFetchIsFinished && (
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
                    onScrollBeginDrag={handleScrollBeginDrag}
                    removeClippedSubviews={true}
                    renderItem={renderItem}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <FullScreenLoader show={show} />
            <BottomLoader show={fetching} />
        </Container>
    );
};

export default React.memo(GaleriesScreen, () => true);
