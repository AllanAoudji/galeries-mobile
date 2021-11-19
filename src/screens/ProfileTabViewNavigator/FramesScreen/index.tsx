import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import {
    BottomLoader,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getUserFrames,
    selectFramesMeAllIds,
    selectFramesMeStatus,
} from '#store/frames';
import { selectMeId } from '#store/me';

import EmptyScrollView from './EmptyScrollView';
import Frames from './Frames';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number, withAnimation?: boolean) => void;
    scrollY: Animated.SharedValue<number>;
};

const FramesScreen = ({ current, editScrollY, scrollY }: Props) => {
    const dispatch = useDispatch();

    const framesAllIds = useSelector(selectFramesMeAllIds);
    const framesStatus = useSelector(selectFramesMeStatus);
    const meId = useSelector(selectMeId);

    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => framesStatus === 'PENDING' || framesStatus === 'INITIAL_LOADING',
        [framesStatus]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (current && framesStatus === 'PENDING' && meId)
                dispatch(getUserFrames(meId));
        }, [current, framesStatus, meId])
    );

    return (
        <GalerieTabbarScreenContainer>
            {framesAllIds && framesAllIds.length > 0 ? (
                <Frames
                    allIds={framesAllIds}
                    current={current}
                    editScrollY={editScrollY}
                    scrollY={scrollY}
                />
            ) : (
                <EmptyScrollView
                    current={current}
                    editScrollY={editScrollY}
                    scrollY={scrollY}
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default FramesScreen;
