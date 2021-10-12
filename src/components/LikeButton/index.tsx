import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { postLike } from '#store/likes';

import { Container } from './styles';
import { updateFramesCurrent } from '#store/frames';

type Props = {
    frame: Store.Models.Frame;
};

const LikeButton = ({ frame }: Props) => {
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();
    const dispatch = useDispatch();

    const handlePress = React.useCallback(() => {
        if (frame.numOfLikes > 0) {
            dispatch(updateFramesCurrent(frame.id));
            navigation.navigate('Likes');
        }
    }, [frame]);
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
