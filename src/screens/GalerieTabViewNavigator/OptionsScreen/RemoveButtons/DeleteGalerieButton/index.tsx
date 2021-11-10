import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { CustomButton } from '#components';

type Props = {
    galerie: Store.Models.Galerie;
};

const DeleteGalerieButton = ({ galerie }: Props) => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const handlePress = React.useCallback(
        () => navigation.navigate('DeleteGalerie'),
        [galerie, navigation]
    );

    return (
        <CustomButton
            ml="smallest"
            mr="smallest"
            mt="large"
            onPress={handlePress}
            title="delete this galerie"
        />
    );
};

export default DeleteGalerieButton;
