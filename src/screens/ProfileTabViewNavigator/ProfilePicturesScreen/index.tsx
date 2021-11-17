import * as React from 'react';
import Animated from 'react-native-reanimated';
import { GalerieTabbarScreenContainer } from '#components';

import EmptyScrollView from './EmptyScrollView';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    scrollY: Animated.SharedValue<number>;
};

const ProfilePicturesScreen = ({ current, editScrollY, scrollY }: Props) => {
    return (
        <GalerieTabbarScreenContainer>
            <EmptyScrollView
                scrollY={scrollY}
                current={current}
                editScrollY={editScrollY}
            />
        </GalerieTabbarScreenContainer>
    );
};

export default ProfilePicturesScreen;
