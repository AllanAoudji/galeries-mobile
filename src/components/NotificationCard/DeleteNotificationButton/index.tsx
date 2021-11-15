import * as React from 'react';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteNotificationModalContext } from '#contexts/DeleteNotificationModalContext';

type Props = {
    notification: Store.Models.Notification;
};

const DeleteNotificationButton = ({ notification }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(
        DeleteNotificationModalContext
    );

    const handlePress = React.useCallback(() => {
        handleOpenModal(notification.id);
        closeBottomSheet();
    }, [closeBottomSheet, notification]);

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="delete notification..."
        />
    );
};

export default React.memo(DeleteNotificationButton);
