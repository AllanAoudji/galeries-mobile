import * as React from 'react';

import { useDispatch } from 'react-redux';
import Typography from '#components/Typography';

import RenderItem from './RenderItem';
import { Container, LoadMoreContainer, Separator } from './styles';
import { getCommentComments } from '#store/comments';

type Props = {
    allIds: string[];
    commentId: string;
    end: boolean;
};

const SubComments = ({ allIds, commentId, end }: Props) => {
    const dispatch = useDispatch();

    const handlePress = React.useCallback(
        () => dispatch(getCommentComments(commentId)),
        []
    );

    return (
        <Container>
            {allIds.map((id) => (
                <RenderItem key={id} item={id} />
            ))}
            {!end && allIds.length > 0 && (
                <LoadMoreContainer onPress={handlePress}>
                    <Separator />
                    <Typography fontSize={12} color="primary">
                        load more
                    </Typography>
                </LoadMoreContainer>
            )}
        </Container>
    );
};

export default SubComments;
