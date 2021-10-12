import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectMe } from '#store/me';
import BottomSheetButton from '#components/BottomSheetButton';
import { updateFramesCurrent } from '#store/frames';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    frameId: string;
    userId: string;
};

const UpdateFrameButton = ({ frameId, userId }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Screen.DesktopBottomTab.UpdateFrameProp>();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const me = useSelector(selectMe);

    const handlePressUpdateFrame = React.useCallback(() => {
        dispatch(updateFramesCurrent(frameId));
        navigation.navigate('UpdateFrame');
        closeBottomSheet();
    }, [frameId]);

    if (!me || me.id !== userId) return null;

    return (
        <BottomSheetButton
            title="update frame"
            onPress={handlePressUpdateFrame}
        />
    );
};

export default UpdateFrameButton;
