import * as React from 'react';
import { View } from 'react-native';

import { Typography, GalerieTabbarScreenContainer } from '#components';

type Props = {
    paddingTop: number;
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
