import * as React from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { selectFrame } from '#store/frames';
import { postLike } from '#store/likes';

import { Container } from './styles';

type Props = {
    frameId: string;
    onPress: () => void;
};

const LikeButton = ({ frameId, onPress }: Props) => {
    const dispatch = useDispatch();

    const frameSelector = React.useMemo(() => selectFrame(frameId), [frameId]);
    const frame = useSelector(frameSelector);

    const handlePress = React.useCallback(() => {
        if (frame.numOfLikes > 0) onPress();
    }, [frame]);
    const handlePressLike = React.useCallback(() => {
        dispatch(postLike(frame.id));
    }, [frame]);

    if (!frame) return null;

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
