import * as React from 'react';
import { Keyboard, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withTiming } from 'react-native-reanimated';

import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
    GalerieCard,
    SearchBar,
} from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';

import { Container, Header, SearchBarContainer } from './styles';
import { selectFilterGaleriesName, setUiFilterGaleriesName } from '#store/ui';
import {
    getGaleries,
    selectGaleries,
    selectGaleriesNameStatus,
} from '#store/galeries';

const renderItem = ({ item }: ListRenderItemInfo<Store.Models.Galerie>) => (
    <GalerieCard galerie={item} />
);

const GaleriesScreen = () => {
    const dispatch = useDispatch();

    const filterGaleriesName = useSelector(selectFilterGaleriesName);
    const galeries = useSelector(selectGaleries);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const { onLayout, size } = useComponentSize();
    const { containerStyle, headerStyle, scrollHandler, translateY } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT, true);

    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<string>(filterGaleriesName);
    const [show, setShow] = React.useState<boolean>(true);

    const paddingTop = React.useMemo(
        () => (size ? size.height : undefined),
        [size]
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT,
            offset: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT * index,
            index,
        }),
        []
    );
    const handleChangeText = React.useCallback((e: string) => {
        dispatch(setUiFilterGaleriesName(e.trim()));
    }, []);
    const handleFocusSearchBar = React.useCallback(() => {
        translateY.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(200));
    }, []);
    const handleReachEnd = React.useCallback(() => {
        if (galeriesNameStatus === 'ERROR' || galeriesNameStatus === 'SUCCESS')
            dispatch(getGaleries());
    }, [galeriesNameStatus]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const handleStopTyping = React.useCallback(
        () => setSearchFinished(true),
        []
    );
    const keyExtractor = React.useCallback((galerie) => galerie.id, []);

    React.useEffect(() => {
        if (!galeries) {
            setShow(true);
        }
    }, [galeries, show]);
    React.useEffect(() => {
        if (galeries && searchFinished) {
            setSearchFinished(false);
            setShow(false);
        }
    }, [galeries, searchFinished]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
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
            {!!galeries && galeries.length > 0 && paddingTop ? (
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
            ) : (
                <EmptyMessage pt={paddingTop} text="No galerie found" />
            )}
            <FullScreenLoader
                show={
                    galeriesNameStatus === 'PENDING' ||
                    galeriesNameStatus === 'INITIAL_LOADING'
                }
            />
            <BottomLoader
                show={galeriesNameStatus === 'LOADING'}
                bottom="huge"
            />
        </Container>
    );
};

export default React.memo(GaleriesScreen, () => true);
