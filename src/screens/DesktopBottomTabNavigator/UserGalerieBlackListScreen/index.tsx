import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';

import { useSelector } from 'react-redux';

import { View } from 'react-native';
import { Container } from './styles';
import { selectGalerie } from '#store/galeries';
import { selectcurrentGalerieBlackList } from '#store/galerieBlackLists';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

type Props = {
    navigation: Screen.DesktopBottomTab.UserScreen;
};

const UserGalerieBlackListScreen = ({ navigation }: Props) => {
    const galerieBlackList = useSelector(selectcurrentGalerieBlackList);

    const galerieSelector = React.useMemo(
        () =>
            selectGalerie(
                galerieBlackList ? galerieBlackList.galerieId : undefined
            ),
        [galerieBlackList]
    );
    const galerie = useSelector(galerieSelector);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerieBlackList) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerieBlackList])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie || galerie.role === 'user') {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerie])
    );

    if (!galerieBlackList) return null;

    return (
        <Container>
            <Header galerieBlackList={galerieBlackList} />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginHorizontal: 45,
                }}
            >
                <Body galerieBlackList={galerieBlackList} />
                <Footer galerieBlackList={galerieBlackList} />
            </View>
        </Container>
    );
};

export default UserGalerieBlackListScreen;
