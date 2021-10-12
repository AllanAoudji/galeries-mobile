import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectComment, updateCommentsCurrent } from '#store/comments';

import { BottomSheetButton, CommentCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';
import { selectMeId } from '#store/me';
import { selectUser } from '#store/users';
import { DeleteCommentModalContext } from '#contexts/DeleteCommentModalContext';

type Props = {
    item: string;
};

const handlePressBottomSheetButton = () => {};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    const { handleOpenModal } = React.useContext(DeleteCommentModalContext);

    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const userSelector = React.useMemo(
        () => selectUser(comment.userId),
        [comment.userId]
    );
    const user = useSelector(userSelector);
    const meId = useSelector(selectMeId);

    const { bottomSheetIsOpen, closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { resetCommentSelected, selectedComment, setCommentSelected } =
        React.useContext(SelectedCommentContext);

    const handleBottomSheetPressReply = React.useCallback(() => {
        closeBottomSheet();
        dispatch(updateCommentsCurrent(comment.id));
    }, [comment]);
    const handleBottomSheetDelete = React.useCallback(() => {
        closeBottomSheet();
        handleOpenModal(comment.id);
    }, [comment]);

    const userPseudonym = React.useMemo(() => {
        if (!user) return 'userId';
        if (meId === user.id) return 'me';
        return user.pseudonym;
    }, [user, meId]);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <BottomSheetButton
                    onPress={handleBottomSheetPressReply}
                    title={`reply to ${userPseudonym}`}
                />
                {user && meId === user.id ? (
                    <BottomSheetButton
                        onPress={handleBottomSheetDelete}
                        title="delete comment"
                    />
                ) : (
                    <BottomSheetButton
                        onPress={handlePressBottomSheetButton}
                        title="report comment"
                    />
                )}
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
