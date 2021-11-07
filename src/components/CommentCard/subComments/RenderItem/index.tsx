import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import SubCommentCard from '#components/SubCommentCard';
import { selectComment } from '#store/comments';
import { selectUser } from '#store/users';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { SelectedCommentContext } from '#contexts/SelectedCommentContext';
import { DeleteCommentModalContext } from '#contexts/DeleteCommentModalContext';
import { selectMeId } from '#store/me';
import { selectGalerie } from '#store/galeries';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);
    const galerieSelector = React.useMemo(
        () => selectGalerie(comment ? comment.galerieId : null),
        [comment]
    );
    const galerie = useSelector(galerieSelector);
    const meId = useSelector(selectMeId);
    const userSelector = React.useMemo(
        () => selectUser(comment.userId),
        [comment.userId]
    );
    const user = useSelector(userSelector);

    const { handleOpenModal } = React.useContext(DeleteCommentModalContext);

    const { closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { selectedComment, setCommentSelected } = React.useContext(
        SelectedCommentContext
    );

    const handleBottomSheetDelete = React.useCallback(() => {
        handleOpenModal(comment.id);
        closeBottomSheet();
    }, [comment]);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                {(user && user.id === meId) ||
                (galerie && galerie.role !== 'user') ? (
                    <BottomSheetButton
                        onPress={handleBottomSheetDelete}
                        title="delete comment"
                    />
                ) : (
                    <BottomSheetButton
                        onPress={handleBottomSheetDelete}
                        title="report comment"
                    />
                )}
            </>
        );
    }, [user, galerie, meId]);
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
