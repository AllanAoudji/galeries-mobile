import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectGalerie } from '#store/galeries';
import { updateFramesCurrent } from '#store/frames';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const ReportFrameButton = ({ frame, me }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
    >();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        closeBottomSheet();
        navigation.navigate('ReportFrame');
    }, [frame, navigation]);

    if (!me || !galerie) return null;
    if (frame.userId === me.id) return null;
    if (galerie.role !== 'user') return null;

    return <BottomSheetButton onPress={handlePress} title="report frame" />;
};

export default React.memo(ReportFrameButton);
