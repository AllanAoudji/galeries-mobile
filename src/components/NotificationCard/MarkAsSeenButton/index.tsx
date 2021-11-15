import * as React from 'react';
import { useDispatch } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { putNotification } from '#store/notifications';

type Props = {
    notification: Store.Models.Notification;
};

const MarkAsSeenButton = ({ notification }: Props) => {
    const dispatch = useDispatch();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        dispatch(putNotification(notification.id));
    }, [closeBottomSheet, notification]);

    if (notification.seen) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title='mark this notification as "seen"'
        />
    );
};

export default React.memo(MarkAsSeenButton);
