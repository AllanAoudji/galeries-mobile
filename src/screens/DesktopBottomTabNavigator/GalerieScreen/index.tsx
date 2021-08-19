import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Typography } from '#components';
import { galeriesSelector, galerieSelector } from '#store/selectors';

type Props = {
    route: RouteProp<Screen.DesktopBottomTab.ParamList, 'Galerie'>;
    navigation: Screen.DesktopBottomTab.GalerieNavigationProp;
};

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: red;
`;

const GalerieScreen = ({ route, navigation }: Props) => {
    const galerie = useSelector(
        galerieSelector(route.params ? route.params.id : 'notfound')
    );

    React.useEffect(() => {
        if (!route.params) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [route, navigation]);

    React.useEffect(() => {
        if (!galerie) {
            console.log('galerie not found');
        }
    }, [galerie]);

    if (!galerie) {
        return <></>;
    }

    return (
        <Container>
            <Typography>{galerie.name}</Typography>
        </Container>
    );
};

export default GalerieScreen;
