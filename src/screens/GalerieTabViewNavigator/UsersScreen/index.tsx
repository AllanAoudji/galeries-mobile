import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { Typography } from '#components';
import { GalerieTabbarScreenContainer } from '#components/Screen';

type Props = {
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const UsersScreen = ({ paddingTop }: Props) => {
    return (
        <GalerieTabbarScreenContainer>
            <View style={{ paddingTop }}>
                <Typography>Users</Typography>
            </View>
        </GalerieTabbarScreenContainer>
    );
};

export default UsersScreen;
