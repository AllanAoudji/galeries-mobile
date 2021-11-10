import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { updateFramesCurrent } from '#store/frames';
import { postLike } from '#store/likes';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const LikeButton = ({ frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();

    const handlePress = React.useCallback(() => {
        if (frame.numOfLikes > 0) {
            dispatch(updateFramesCurrent(frame.id));
            navigation.navigate('Likes');
        }
    }, [frame, navigation]);
    const handlePressLike = React.useCallback(() => {
        dispatch(postLike(frame.id));
    }, [frame]);

    return (
        <Container>
            <Pressable onPress={handlePress}>
                <Typography>{frame.numOfLikes} likes</Typography>
            </Pressable>
            <Pictogram
                color="danger"
                ml="smallest"
                onPress={handlePressLike}
                pb="smallest"
                pr="smallest"
                variant={frame.liked ? 'heart-fill' : 'heart-stroke'}
            />
        </Container>
    );
};

export default React.memo(LikeButton);
