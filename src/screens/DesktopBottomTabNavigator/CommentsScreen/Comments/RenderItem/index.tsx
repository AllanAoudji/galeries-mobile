import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectComment, updateCommentsCurrent } from '#store/comments';

import { BottomSheetButton, CommentCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    item: string;
};

const handlePressBottomSheetButton = () => {};
const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback((user: Store.Models.User) => {
        openBottomSheet(
            <>
                <BottomSheetButton
                    onPress={handlePressBottomSheetButton}
                    title={`reply to ${user.pseudonym}`}
                />
                <BottomSheetButton
                    onPress={handlePressBottomSheetButton}
                    title="delete comment"
                />
            </>
        );
    }, []);

    const handlePressReply = React.useCallback(() => {
        dispatch(updateCommentsCurrent(comment.id));
    }, [comment]);

    if (!comment) return null;

    return (
        <CommentCard
            comment={comment}
            onPress={handlePress}
            onPressReply={handlePressReply}
        />
    );
};

export default React.memo(RenderItem);
