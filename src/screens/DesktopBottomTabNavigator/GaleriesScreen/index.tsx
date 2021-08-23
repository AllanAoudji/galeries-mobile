import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
    BottomLoader,
    FullScreenLoader,
    GalerieModal,
    HeaderDesktopBottomTab,
    SearchBar,
    Typography,
} from '#components';
import { useComponentSize } from '#hooks';
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

import { Container, Header } from './styles';

// TODO:
// need to scroll a little bit when fetch onReachEnd
// and allIds have new content.
const GaleriesScreen = () => {
    const { onLayout, size } = useComponentSize();

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

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: 249,
            offset: 249 * index,
            index,
        }),
        []
    );
    const handleChangeText = React.useCallback(
        (e: string) => {
            setSearchFinished(false);
            setName(e);
            dispatch(setGaleriesNameFilter(e.trim()));
        },
        [searchFinished]
    );
    const handleReachEnd = React.useCallback(() => {
        if (!galeriesEnd && galeriesStatus !== 'FETCHING') {
            setFetchFinished(false);
            dispatch(fetchGaleries());
        }
    }, [galeriesEnd, galeriesStatus]);
    const keyExtractor = React.useCallback((id) => id, []);
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
            if (galeriesStatus === 'PENDING') {
                setIsFirstLoad(true);
            } else {
                setIsFirstLoad(false);
            }
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
            hasFocus
        ) {
            setFirstFetchFinished(true);
            if (!fetchFinished) setFetchFinished(true);
        }
    }, [fetchFinished, galeriesStatus, hasFocus]);

    return (
        <Container>
            <Header onLayout={onLayout}>
                <HeaderDesktopBottomTab />
                <Typography fontSize={24}>Galeries</Typography>
                <SearchBar
                    onChangeText={handleChangeText}
                    onStopTyping={onStopTyping}
                    value={name}
                />
            </Header>
            {(firstFetchFinished || searchFinished) && (
                <FlatList
                    contentContainerStyle={{
                        paddingTop: size ? size.height : 0,
                    }}
                    data={galeriesAllIds}
                    getItemLayout={getItemLayout}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={5}
                    onEndReached={handleReachEnd}
                    onEndReachedThreshold={0.1}
                    onScrollBeginDrag={onScrollBeginDrag}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <FullScreenLoader show={!firstFetchFinished && !searchFinished} />
            <BottomLoader show={!fetchFinished} />
        </Container>
    );
};

export default GaleriesScreen;
