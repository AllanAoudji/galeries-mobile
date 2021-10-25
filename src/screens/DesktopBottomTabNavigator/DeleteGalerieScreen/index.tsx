import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentGalerie } from '#store/galeries';
import { Typography } from '#components';

type Props = {
    navigation: Screen.DesktopBottomTab.DeleteGalerieNavigationProp;
};

const DeleteGalerieScreen = ({ navigation }: Props) => {
    const galerie = useSelector(selectCurrentGalerie);

    React.useEffect(() => {
        if (!galerie) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [galerie]);

    return <Typography>delete galerie screen</Typography>;
};

export default DeleteGalerieScreen;
