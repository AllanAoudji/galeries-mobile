import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectComment, updateCommentsCurrent } from '#store/comments';

import { BottomSheetButton, CommentCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectUserId } from '#store/users';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';

type Props = {
    item: string;
};

const handlePressBottomSheetButton = () => {};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const userSelector = React.useMemo(
        () => selectUserId(comment.userId),
        [comment.userId]
    );
    const user = useSelector(userSelector);

    const { resetCommentSelected, selectedComment, setCommentSelected } =
        React.useContext(SelectedCommentContext);
    const { bottomSheetIsOpen, openBottomSheet } =
        React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
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
    const handlePress = React.useCallback((commentId: string) => {
        setCommentSelected(commentId);
        openBottomSheet(bottomSheetContent);
    }, []);
    const handlePressReply = React.useCallback(() => {
        dispatch(updateCommentsCurrent(comment.id));
    }, [comment]);

    React.useEffect(() => {
        if (!bottomSheetIsOpen) resetCommentSelected();
    }, [bottomSheetIsOpen]);

    return (
        <CommentCard
            comment={comment}
            current={selectedComment === comment.id}
            onPress={handlePress}
            onPressReply={handlePressReply}
            user={user}
        />
    );
};

export default React.memo(RenderItem);
