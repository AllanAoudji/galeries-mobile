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
    handleNavigateToCreateGalerieScreen: () => void;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const FramesScreen = ({
    galerie,
    handleNavigateToCreateGalerieScreen,
    paddingTop,
    scrollHandler,
}: Props) => {
    const dispatch = useDispatch();
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

    React.useEffect(() => {
        console.log(framesStatus, galerie?.id);
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
                        onPress={handleNavigateToCreateGalerieScreen}
                    />
                </>
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default FramesScreen;
