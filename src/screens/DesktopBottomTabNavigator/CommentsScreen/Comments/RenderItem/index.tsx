import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectComment } from '#store/comments';

import { BottomSheetButton, CommentCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const onPress = React.useCallback((user: Store.Models.User) => {
        openBottomSheet(
            <>
                <BottomSheetButton title={`reply to ${user.pseudonym}`} />
                <BottomSheetButton title="delete comment" />
            </>
        );
    }, []);

    if (!comment) return null;

    return <CommentCard comment={comment} onPress={onPress} />;
};

export default React.memo(RenderItem);
