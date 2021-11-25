import * as React from 'react';
import { useSelector } from 'react-redux';

import { TicketCard } from '#components';
import { selectTicket } from '#store/tickets';

type Props = {
    index: number;
    item: string;
};

const RenderItem = ({ index, item }: Props) => {
    const ticketSelector = React.useMemo(() => selectTicket(item), [item]);
    const ticket = useSelector(ticketSelector);

    return (
        <TicketCard
            color={index % 2 ? 'secondary' : 'secondary-light'}
            ticket={ticket}
        />
    );
};

export default React.memo(RenderItem);
