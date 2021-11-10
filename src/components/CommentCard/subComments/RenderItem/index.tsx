import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';

import SubCommentCard from '#components/SubCommentCard';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteCommentModalContext } from '#contexts/DeleteCommentModalContext';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';
import { selectComment } from '#store/comments';
import { selectUser } from '#store/users';

import DeleteReportButton from './DeleteReportButton';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteCommentModalContext
    );
    const { selectedComment, setCommentSelected } = React.useContext(
        SelectedCommentContext
    );

    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const userSelector = React.useMemo(
        () => selectUser(comment.userId),
        [comment]
    );
    const user = useSelector(userSelector);

    const bottomSheetContent = React.useCallback(() => {
        return <DeleteReportButton comment={comment} user={user} />;
    }, [comment, user]);
    const handlePress = React.useCallback(() => {
        setCommentSelected(comment.id);
        openBottomSheet(bottomSheetContent);
    }, [comment]);

    useFocusEffect(
        React.useCallback(() => () => handleCloseModal(), [handleCloseModal])
    );
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

    if (!comment || !user) return null;

    return (
        <SubCommentCard
            comment={comment}
            current={selectedComment === comment.id}
            onPress={handlePress}
            user={user}
        />
    );
};

export default React.memo(RenderItem);
