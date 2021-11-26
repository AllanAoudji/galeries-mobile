import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '#components/Typography';

import Header from './Header';

import { Container } from './styles';
import { updateTicketsCurrent } from '#store/tickets';

type Props = {
    color?: keyof Style.Colors;
    ticket?: Store.Models.Ticket;
};

const TicketCard = ({ color = 'secondary-light', ticket }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.ModeratorStack.TicketsScreenNavigationProp>();

    const handlePress = React.useCallback(() => {
        if (!ticket) return;
        dispatch(updateTicketsCurrent(ticket.id));
        navigation.navigate('Ticket');
    }, [navigation, ticket]);

    if (!ticket) return null;

    return (
        <Container color={color} onPress={handlePress}>
            <Header ticket={ticket} />
            <Typography textAlign="right">
                {moment(ticket.createdAt).fromNow()}
            </Typography>
        </Container>
    );
};

export default React.memo(TicketCard);
