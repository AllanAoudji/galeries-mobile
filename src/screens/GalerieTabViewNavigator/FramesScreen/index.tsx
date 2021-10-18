import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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

import Frame from './Frames';

type Props = {
    galerie?: Store.Models.Galerie;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const FramesScreen = ({ galerie, paddingTop, scrollHandler }: Props) => {
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
                        <Frame
                            allIds={framesAllIds}
                            galerie={galerie}
                            paddingTop={paddingTop}
                            scrollHandler={scrollHandler}
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
