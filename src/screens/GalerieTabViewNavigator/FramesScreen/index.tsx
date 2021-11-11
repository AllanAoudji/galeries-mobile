import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { InteractionManager } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddButton,
    BottomLoader,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getGalerieFrames,
    selectCurrentGalerieFramesAllIds,
    selectCurrentGalerieFramesStatus,
} from '#store/frames';

import EmptyScrollView from './EmptyScrollView';
import Frames from './Frames';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const FramesScreen = ({ current, editScrollY, galerie, scrollY }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const framesAllIds = useSelector(selectCurrentGalerieFramesAllIds);
    const framesStatus = useSelector(selectCurrentGalerieFramesStatus);

    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => framesStatus === 'PENDING' || framesStatus === 'INITIAL_LOADING',
        [framesStatus]
    );

    const handlePressAddButton = React.useCallback(() => {
        navigation.navigate('CreateFrame', {
            screen: 'AddPictures',
        });
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (framesStatus && framesStatus === 'PENDING' && galerie)
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getGalerieFrames(galerie.id));
                });
        }, [framesStatus, galerie])
    );

    return (
        <GalerieTabbarScreenContainer>
            {framesAllIds && framesAllIds.length > 0 ? (
                <Frames
                    allIds={framesAllIds}
                    current={current}
                    editScrollY={editScrollY}
                    galerie={galerie}
                    scrollY={scrollY}
                />
            ) : (
                <EmptyScrollView
                    current={current}
                    editScrollY={editScrollY}
                    galerie={galerie}
                    scrollY={scrollY}
                />
            )}
            <AddButton
                bottom="largest"
                onPress={handlePressAddButton}
                right="normal"
            />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(FramesScreen);
