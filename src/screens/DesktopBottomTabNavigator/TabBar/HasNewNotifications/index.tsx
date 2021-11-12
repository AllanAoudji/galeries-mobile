import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectMe } from '#store/me';

import { Container } from './styles';

const HasNewNotifications = () => {
    const me = useSelector(selectMe);

    if (!me) return null;
    if (!me.hasNewNotifications) return null;

    return <Container />;
};

export default React.memo(HasNewNotifications);
