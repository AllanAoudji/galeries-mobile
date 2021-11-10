import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectGalerie } from '#store/galeries';
import { selectcurrentGalerieBlackList } from '#store/galerieBlackLists';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

import { BodyFooterContainer, Container } from './styles';

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
        }, [galerieBlackList, navigation])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie || galerie.role === 'user') {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerie, navigation])
    );

    if (!galerieBlackList) return null;

    return (
        <Container>
            <Header galerieBlackList={galerieBlackList} />
            <BodyFooterContainer>
                <Body galerieBlackList={galerieBlackList} />
                <Footer galerieBlackList={galerieBlackList} />
            </BodyFooterContainer>
        </Container>
    );
};

export default UserGalerieBlackListScreen;
