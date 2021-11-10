import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommentCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteCommentModalContext } from '#contexts/DeleteCommentModalContext';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';
import { selectComment, updateCommentsCurrent } from '#store/comments';
import { selectUser } from '#store/users';

import DeleteReportButton from './DeleteReportButton';
import ReplyButton from './ReplyButton';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    const { bottomSheetIsOpen, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteCommentModalContext
    );
    const { resetCommentSelected, selectedComment, setCommentSelected } =
        React.useContext(SelectedCommentContext);

    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const userSelector = React.useMemo(
        () => selectUser(comment.userId),
        [comment.userId]
    );
    const user = useSelector(userSelector);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <ReplyButton comment={comment} user={user} />
                <DeleteReportButton comment={comment} user={user} />
            </>
        );
    }, [comment, user]);
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

    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (openModal)
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        handleCloseModal();
                        return true;
                    }
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [handleCloseModal, openModal])
    );

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
