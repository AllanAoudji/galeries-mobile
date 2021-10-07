import * as React from 'react';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { selectFrame } from '#store/frames';

import { Container } from './styles';

type Props = {
    onPress: () => void;
    frameId: string;
};

const CommentButton = ({ frameId, onPress }: Props) => {
    const frameSelector = React.useMemo(() => selectFrame(frameId), [frameId]);

    const frame = useSelector(frameSelector);

    if (!frame) return null;

    return (
        <Container onPress={onPress}>
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

export default CommentButton;
