import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteCommentModalContext } from '#contexts/DeleteCommentModalContext';
import { selectGalerie } from '#store/galeries';
import { selectMeId } from '#store/me';
import { updateCommentsCurrent } from '#store/comments';
import { selectFrame } from '#store/frames';

type Props = {
    comment?: Store.Models.Comment;
    user?: Store.Models.User;
};

const DeleteReportButton = ({ comment, user }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.CommentsNavigationProp>();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteCommentModalContext);

    const frameSelector = React.useMemo(
        () => selectFrame(comment ? comment.frameId : null),
        [comment]
    );
    const frame = useSelector(frameSelector);
    const galerieSelector = React.useMemo(
        () => selectGalerie(comment ? comment.galerieId : null),
        [comment]
    );
    const galerie = useSelector(galerieSelector);
    const meId = useSelector(selectMeId);

    const handleBottomSheetDelete = React.useCallback(() => {
        if (comment) {
            handleOpenModal(comment.id);
            closeBottomSheet();
        }
    }, [closeBottomSheet, comment, handleOpenModal]);
    const handleBottomSheetReport = React.useCallback(() => {
        closeBottomSheet();
        if (comment) {
            dispatch(updateCommentsCurrent(comment.id));
            navigation.navigate('ReportComment');
        }
    }, [closeBottomSheet, comment, navigation]);

    if (!comment) return null;
    if (!galerie) return null;
    if (!frame) return null;
    if (!meId) return null;
    if (!user) return null;

    if (meId === user.id || galerie.role !== 'user' || frame.userId === meId)
        return (
            <BottomSheetButton
                onPress={handleBottomSheetDelete}
                title="delete comment"
            />
        );

    return (
        <BottomSheetButton
            onPress={handleBottomSheetReport}
            title="report comment"
        />
    );
};

export default React.memo(DeleteReportButton);
