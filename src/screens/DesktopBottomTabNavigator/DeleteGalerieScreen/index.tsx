import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubGalerieScreenHeader } from '#components';
import {
    resetGaleriesFieldsError,
    resetGaleriesLoadingDelete,
    selectCurrentGalerie,
} from '#store/galeries';

import Body from './Body';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.DeleteGalerieNavigationProp;
};

const DeleteGalerieScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const galerie = useSelector(selectCurrentGalerie);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
            return () => {
                dispatch(resetGaleriesLoadingDelete());
                dispatch(resetGaleriesFieldsError());
            };
        }, [galerie])
    );

    if (!galerie) return null;

    return (
        <Container>
            <SubGalerieScreenHeader
                galerie={galerie}
                subTitle="delete galerie"
                title={galerie.name}
            />
            <Body galerie={galerie} />
        </Container>
    );
};

export default DeleteGalerieScreen;
