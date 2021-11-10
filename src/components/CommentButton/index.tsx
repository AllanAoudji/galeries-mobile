import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { updateFramesCurrent } from '#store/frames';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const CommentButton = ({ frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
    >();

    const handlePress = React.useCallback(() => {
        if (frame) {
            dispatch(updateFramesCurrent(frame.id));
            navigation.navigate('Comments');
        }
    }, [frame]);

    if (!frame) return null;

    return (
        <Container onPress={handlePress}>
            <Pictogram
                color="primary"
                mb="smallest"
                ml="smallest"
                mr="smallest"
                variant="comments-stroke"
            />
            <Typography>{frame.numOfComments} comments</Typography>
        </Container>
    );
};

export default React.memo(CommentButton);
