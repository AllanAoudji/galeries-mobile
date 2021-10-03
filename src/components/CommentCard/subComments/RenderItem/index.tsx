import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import SubCommentCard from '#components/SubCommentCard';
import { selectComment } from '#store/comments';
import { selectUserId } from '#store/users';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    item: string;
};

const handlePressBottomSheetButton = () => {};

const RenderItem = ({ item }: Props) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const userSelector = React.useMemo(
        () => selectUserId(comment.userId),
        [comment.userId]
    );
    const user = useSelector(userSelector);

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <BottomSheetButton
                onPress={handlePressBottomSheetButton}
                title="delete comment"
            />
        );
    }, []);
    const handlePress = React.useCallback(
        () => openBottomSheet(bottomSheetContent),
        []
    );

    if (!comment) return null;

    return (
        <SubCommentCard comment={comment} onPress={handlePress} user={user} />
    );
};

export default React.memo(RenderItem);
