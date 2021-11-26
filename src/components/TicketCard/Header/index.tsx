import * as React from 'react';

import { useSelector } from 'react-redux';
import { View } from 'react-native';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import { Container } from './styles';
import { selectUser } from '#store/users';

type Props = {
    ticket: Store.Models.Ticket;
};

const Header = ({ ticket }: Props) => {
    const userSelector = React.useMemo(
        () => selectUser(ticket.userId),
        [ticket]
    );
    const user = useSelector(userSelector);

    return (
        <Container>
            <ProfilePicture mr="smallest" user={user} />
            <View>
                <Typography fontFamily="bold" fontSize={18}>
                    title:{' '}
                    <Typography color="primary" fontSize={18}>
                        {ticket.header}
                    </Typography>
                </Typography>
                <Typography>
                    posted by{' '}
                    <Typography fontFamily={user ? 'bold' : 'oblique'}>
                        {user ? user.pseudonym : '*user not found*'}
                    </Typography>
                </Typography>
            </View>
        </Container>
    );
};

export default Header;
