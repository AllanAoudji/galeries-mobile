import * as React from 'react';
import { View } from 'react-native';

import { Typography, GalerieTabbarScreenContainer } from '#components';

type Props = {
    paddingTop: number;
};

const OptionsScreen = ({ paddingTop }: Props) => {
    return (
        <GalerieTabbarScreenContainer>
            <View style={{ paddingTop }}>
                <Typography>Options</Typography>
            </View>
        </GalerieTabbarScreenContainer>
    );
};

export default OptionsScreen;
