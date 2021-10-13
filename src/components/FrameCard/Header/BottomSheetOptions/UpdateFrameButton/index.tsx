import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { updateFramesCurrent } from '#store/frames';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const UpdateFrameButton = ({ frame, me }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.HomeNavigationProp
        | Screen.DesktopBottomTab.FrameProp
    >();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('UpdateFrame');
        closeBottomSheet();
    }, [frame]);

    if (!me) return null;
    if (me.id !== frame.userId) return null;

    return <BottomSheetButton onPress={handlePress} title="update frame" />;
};

export default React.memo(UpdateFrameButton);
