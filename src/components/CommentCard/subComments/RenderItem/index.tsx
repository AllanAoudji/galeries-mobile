import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import SubCommentCard from '#components/SubCommentCard';
import { selectComment } from '#store/comments';
import { selectUser } from '#store/users';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const userSelector = React.useMemo(
        () => selectUser(comment.userId),
        [comment.userId]
    );
    const user = useSelector(userSelector);

    const { closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { selectedComment, setCommentSelected } = React.useContext(
        SelectedCommentContext
    );

    const handleBottomSheetDelete = React.useCallback(() => {
        closeBottomSheet();
    }, [comment]);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <BottomSheetButton
                onPress={handleBottomSheetDelete}
                title="delete comment"
            />
        );
    }, []);
    const handlePress = React.useCallback(() => {
        setCommentSelected(comment.id);
        openBottomSheet(bottomSheetContent);
    }, [comment]);

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
