import * as React from 'react';
import { useSelector } from 'react-redux';

import { NotificationCard } from '#components';
import { selectNotification } from '#store/notifications';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const notificationSelector = React.useMemo(
        () => selectNotification(item),
        [item]
    );
    const notification = useSelector(notificationSelector);

    if (!notification) return null;

    return <NotificationCard notification={notification} />;
};

export default React.memo(RenderItem);
