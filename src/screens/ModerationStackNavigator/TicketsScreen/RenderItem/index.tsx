import * as React from 'react';
import { useSelector } from 'react-redux';

import { TicketCard } from '#components';
import { selectTicket } from '#store/tickets';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const ticketSelector = React.useMemo(() => selectTicket(item), [item]);
    const ticket = useSelector(ticketSelector);

    return <TicketCard ticket={ticket} />;
};

export default React.memo(RenderItem);
