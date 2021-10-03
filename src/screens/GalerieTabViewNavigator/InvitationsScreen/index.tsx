import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { Typography, GalerieTabbarScreenContainer } from '#components';

type Props = {
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const InvitationsScreen = ({ paddingTop }: Props) => {
    return (
        <GalerieTabbarScreenContainer>
            <View style={{ paddingTop }}>
                <Typography>Invitations</Typography>
            </View>
        </GalerieTabbarScreenContainer>
    );
};

export default InvitationsScreen;
