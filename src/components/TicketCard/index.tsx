import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    ticket?: Store.Models.Ticket;
};

const TicketCard = ({ ticket }: Props) => {
    if (!ticket) return null;

    return (
        <Container>
            <Typography>{ticket.header}</Typography>
            <Typography>{ticket.createdAt}</Typography>
        </Container>
    );
};

export default TicketCard;
