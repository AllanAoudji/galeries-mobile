import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { selectCurrentFrame } from '#store/frames';

type Props = {
    navigation: Screen.DesktopBottomTab.FrameProp;
};

const FrameScreen = ({ navigation }: Props) => {
    const currentFrame = useSelector(selectCurrentFrame);

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame]);

    return <Typography>Frame</Typography>;
};

export default FrameScreen;
