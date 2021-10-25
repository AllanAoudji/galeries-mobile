import * as React from 'react';
import { View } from 'react-native';

import { GalerieTabbarScreenContainer } from '#components';

import AllowNotification from './AllowNotification';

type Props = {
    galerie?: Store.Models.Galerie;
    paddingTop: number;
};

const OptionsScreen = ({ galerie, paddingTop }: Props) => {
    if (!galerie) return null;

    return (
        <GalerieTabbarScreenContainer>
            <View style={{ paddingTop }}>
                <AllowNotification galerie={galerie} />
            </View>
        </GalerieTabbarScreenContainer>
    );
};

export default OptionsScreen;
