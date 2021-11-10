import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Typography } from '#components';
import { updateFramesCurrent } from '#store/frames';

import { Button } from './style';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const UpdateFrameButton = ({ frame, me }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Screen.DesktopBottomTab.FrameProp>();

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('UpdateFrame');
    }, [frame, navigation]);

    if (!me) return null;
    if (me.id !== frame.userId) return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>update frame</Typography>
        </Button>
    );
};

export default React.memo(UpdateFrameButton);
