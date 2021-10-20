import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import {
    AddButton,
    BottomLoader,
    EmptyMessage,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getGalerieFrames,
    selectCurrentGalerieFramesAllIds,
    selectCurrentGalerieFramesStatus,
} from '#store/frames';

import Frames from './Frames';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    paddingTop: number;
    scrollY: Animated.SharedValue<number>;
};

const FramesScreen = ({
    current,
    editScrollY,
    galerie,
    maxScroll,
    paddingTop,
    scrollY,
}: Props) => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();
    const dispatch = useDispatch();

    const framesAllIds = useSelector(selectCurrentGalerieFramesAllIds);
    const framesStatus = useSelector(selectCurrentGalerieFramesStatus);

    const handlePressAddGalerie = React.useCallback(() => {
        navigation
            .getParent<NavigationProp<Screen.DesktopBottomTab.ParamList>>()
            .navigate('CreateFrame', { screen: 'AddPictures' });
    }, [navigation]);

    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => framesStatus === 'PENDING' || framesStatus === 'INITIAL_LOADING',
        [framesStatus]
    );

    React.useEffect(() => {
        if (framesStatus && framesStatus === 'PENDING' && galerie)
            dispatch(getGalerieFrames(galerie.id));
    }, [framesStatus, galerie]);

    return (
        <GalerieTabbarScreenContainer>
            {!!paddingTop && (
                <>
                    {framesAllIds && framesAllIds.length > 0 ? (
                        <Frames
                            allIds={framesAllIds}
                            editScrollY={editScrollY}
                            current={current}
                            galerie={galerie}
                            maxScroll={maxScroll}
                            paddingTop={paddingTop}
                            scrollY={scrollY}
                        />
                    ) : (
                        <EmptyMessage
                            pt={paddingTop}
                            text="This galerie doesn't have frame yet. Click on the + button to post a new one"
                        />
                    )}
                    <AddButton
                        bottom="largest"
                        right="normal"
                        onPress={handlePressAddGalerie}
                    />
                </>
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default FramesScreen;
