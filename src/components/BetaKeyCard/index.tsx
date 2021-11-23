import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '#store/users';

import Body from './Body';
import CreatedBy from './CreatedBy';

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
            <Body betaKey={betaKey} />
        </Container>
    );
};

export default React.memo(BetaKeyCard);
