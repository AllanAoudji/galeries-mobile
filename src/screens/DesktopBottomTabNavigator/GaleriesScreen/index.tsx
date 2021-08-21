import * as React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    useWindowDimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import {
    fetchGaleries,
    resetGaleriesFilters,
    setGaleries,
} from '#store/actions';
import {
    galeriesStatusSelector,
    galeriesEndSelector,
    galeriesAllIdsSelector,
} from '#store/selectors';

import GalerieModal from './GalerieModal';
import { SearchBar, Typography } from '#components';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    padding-bottom: 62px;
`;
const Header = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.small}`};
`;

type Props = {
    navigation: Screen.DesktopBottomTab.GaleriesNavigationProp;
};

const GaleriesScreen = ({ navigation }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [name, setName] = React.useState<string>('');

    const galeriesAllIds = useSelector(galeriesAllIdsSelector(name));
    const galeriesEnd = useSelector(galeriesEndSelector(name));
    const galeriesStatus = useSelector(galeriesStatusSelector(name));

    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);
    const [fetchFinished, setFetchFinished] = React.useState<boolean>(true);

    React.useEffect(() => {
        dispatch(fetchGaleries());
    }, []);
    React.useEffect(() => {
        if (galeriesStatus === 'SUCCESS' && firstFetchFinished === false) {
            setTimeout(() => {
                setFirstFetchFinished(true);
            }, 500);
        }
    }, [galeriesStatus, firstFetchFinished]);
    React.useEffect(() => {
        if (galeriesStatus === 'SUCCESS' && fetchFinished === false) {
            setFetchFinished(true);
        }
    }, [galeriesStatus, fetchFinished]);

    const removeGalerie = React.useCallback((id: string) => {
        galeriesAllIds.filter((galerieId) => galerieId !== id);
        dispatch(resetGaleriesFilters());
        dispatch(
            setGaleries({
                data: {
                    allIds: galeriesAllIds,
                },
            })
        );
    }, []);

    const handlePress = React.useCallback(
        (id) => {
            navigation.navigate('Galerie', { id });
        },
        [navigation]
    );
    const handleReachEnd = React.useCallback(() => {
        if (!galeriesEnd) {
            setFetchFinished(false);
            dispatch(fetchGaleries());
        }
    }, [galeriesEnd]);
    React.useEffect(() => {
        if (name !== '' && galeriesStatus === 'PENDING') {
            setFirstFetchFinished(false);
            dispatch(fetchGaleries({ meta: { query: { name } } }));
        }
    }, [name, galeriesStatus]);

    const onChangeText = (e: string) => {
        setName(e);
    };

    return (
        <Container>
            <Header>
                <Typography fontSize={24}>Galeries</Typography>
                <SearchBar value={name} onChangeText={onChangeText} />
            </Header>
            {firstFetchFinished ? (
                <FlatList
                    data={galeriesAllIds}
                    renderItem={({ item }) => {
                        return (
                            <GalerieModal
                                handlePress={() => handlePress(item)}
                                id={item}
                                removeGalerie={removeGalerie}
                            />
                        );
                    }}
                    keyExtractor={(id) => id}
                    onEndReached={handleReachEnd}
                    onEndReachedThreshold={0.1}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                    />
                </View>
            )}
            {!fetchFinished && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        flex: 1,
                        alignItems: 'center',
                        width: dimension.width,
                    }}
                >
                    <View
                        style={{
                            width: 45,
                            height: 45,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.colors.primary,
                            borderRadius: 1000,
                        }}
                    >
                        <ActivityIndicator
                            size="small"
                            color={theme.colors['secondary-light']}
                        />
                    </View>
                </View>
            )}
        </Container>
    );
};

export default GaleriesScreen;
