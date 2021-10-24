import moment from 'moment';
import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    invitation: Store.Models.Invitation;
};

const Informations = ({ invitation }: Props) => {
    const expiration = React.useMemo(() => {
        if (!invitation.time) return null;
        const now = moment(new Date());
        const end = moment(invitation.time);
        const duration = moment.duration(end.diff(now));
        if (duration.asDays() >= 1) {
            return `${Math.floor(duration.asDays())} day${
                !!(Math.floor(duration.asDays()) > 1) && 's'
            }`;
        }
        if (duration.asHours() >= 1) {
            return `${Math.floor(duration.asHours())} hour${
                !!(Math.floor(duration.asHours()) > 1) && 's'
            }`;
        }
        return `${Math.floor(duration.asMinutes())} minute${
            !!(Math.floor(duration.asMinutes()) > 1) && 's'
        }`;
    }, [invitation]);

    return (
        <Container>
            <Typography>
                {invitation.numOfInvits} invitation
                {invitation.numOfInvits > 1 && 's'} left
            </Typography>
            {!!expiration && <Typography>expire in {expiration}</Typography>}
        </Container>
    );
};

export default React.memo(Informations);
