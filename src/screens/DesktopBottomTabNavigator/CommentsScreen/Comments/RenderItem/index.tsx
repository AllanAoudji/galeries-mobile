import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectComment, updateCommentsCurrent } from '#store/comments';

import { BottomSheetButton, CommentCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';
import { selectMeId } from '#store/me';
import { selectUser } from '#store/users';

type Props = {
    item: string;
    openModal: (commentId: string) => void;
};

const handlePressBottomSheetButton = () => {};

const RenderItem = ({ item, openModal }: Props) => {
    const dispatch = useDispatch();

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
        openModal(comment.id);
    }, [comment]);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <BottomSheetButton
                    onPress={handleBottomSheetPressReply}
                    title={`reply to ${
                        meId === user.id ? 'me' : user.pseudonym
                    }`}
                />
                {meId === user.id ? (
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
