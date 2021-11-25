import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FullScreenContainer, ProfilePicture, Typography } from '#components';
import { getTicket, selectCurrentTicket } from '#store/tickets';
import { selectUser } from '#store/users';

import {
    BodyContainer,
    Container,
    PostedByContainer,
    UserContainer,
} from './styles';

type Props = {
    navigation: Screen.ModeratorStack.TicketScreenNavigationProp;
};

const Ticket = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentTicket = useSelector(selectCurrentTicket);
    const userSelector = React.useMemo(
        () => selectUser(currentTicket ? currentTicket.userId : undefined),
        [currentTicket]
    );
    const user = useSelector(userSelector);

    const [initialLoading, setInitialLoading] = React.useState<boolean>(true);

    useFocusEffect(
        React.useCallback(() => {
            if (currentTicket) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Tickets');
        }, [currentTicket, navigation])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!currentTicket) return;
            if (!initialLoading) return;
            dispatch(getTicket(currentTicket.id));
        }, [initialLoading, currentTicket])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                setInitialLoading(true);
            },
            []
        )
    );

    if (!currentTicket) return null;

    return (
        <FullScreenContainer>
            <Container>
                <PostedByContainer>
                    <Typography fontSize={24} textAlign="right">
                        Posted by
                    </Typography>
                    <UserContainer>
                        <ProfilePicture
                            mr="smallest"
                            size="small"
                            user={user}
                        />
                        <Typography
                            fontFamily={user ? 'roman' : 'oblique'}
                            textAlign="center"
                        >
                            {user ? user.pseudonym : '*user not found*'}
                        </Typography>
                    </UserContainer>
                </PostedByContainer>
                <BodyContainer>
                    <Typography fontSize={18}>{currentTicket.body}</Typography>
                </BodyContainer>
            </Container>
        </FullScreenContainer>
    );
};

export default Ticket;
