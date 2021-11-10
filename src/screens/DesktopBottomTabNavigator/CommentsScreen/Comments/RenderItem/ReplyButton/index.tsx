import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { updateCommentsCurrent } from '#store/comments';
import { selectMeId } from '#store/me';

type Props = {
    comment: Store.Models.Comment;
    user?: Store.Models.User;
};

const ReplyButton = ({ comment, user }: Props) => {
    const dispatch = useDispatch();

    const meId = useSelector(selectMeId);

    const userPseudonym = React.useMemo(() => {
        if (!user) return 'userId';
        if (meId === user.id) return 'me';
        return user.pseudonym;
    }, [meId, user]);

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handleBottomSheetPressReply = React.useCallback(() => {
        closeBottomSheet();
        dispatch(updateCommentsCurrent(comment.id));
    }, [closeBottomSheet, comment]);

    return (
        <BottomSheetButton
            onPress={handleBottomSheetPressReply}
            title={`reply to ${userPseudonym}`}
        />
    );
};

export default React.memo(ReplyButton);
