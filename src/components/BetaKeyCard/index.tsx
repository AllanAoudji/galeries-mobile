import * as React from 'react';
import { useSelector } from 'react-redux';

import Typography from '#components/Typography';
import { selectUser } from '#store/users';

import CreatedBy from './CreatedBy';
import ResendButton from './ResendButton';

import { Container } from './styles';

type Props = {
    betaKey?: Store.Models.BetaKeys;
};

const BetaKeyCard = ({ betaKey }: Props) => {
    const createdBySelector = React.useMemo(
        () => selectUser(betaKey ? betaKey.createdById : undefined),
        [betaKey]
    );
    const createdBy = useSelector(createdBySelector);

    if (!betaKey) return null;

    return (
        <Container>
            <CreatedBy user={createdBy} />
            <Typography fontSize={14}>
                code:{' '}
                <Typography color="primary" fontFamily="bold" fontSize={14}>
                    {betaKey.code}
                </Typography>
            </Typography>
            {betaKey.email && (
                <Typography fontSize={14}>
                    email:{' '}
                    <Typography color="primary" fontFamily="bold" fontSize={14}>
                        {betaKey.email}
                    </Typography>
                </Typography>
            )}
            <ResendButton betaKey={betaKey} />
        </Container>
    );
};

export default React.memo(BetaKeyCard);
