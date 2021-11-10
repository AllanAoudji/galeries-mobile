import * as React from 'react';

import UserContainer from './UserContainer';

import { Container } from './styles';

type Props = {
    allIds: string[];
};

const Lists = ({ allIds }: Props) => {
    const fiveFirsts = React.useMemo(() => {
        if (allIds.length <= 5) return allIds;
        return allIds.slice(0, 5);
    }, [allIds]);

    if (allIds.length === 0) return null;

    return (
        <Container>
            {fiveFirsts.map((userId) => (
                <UserContainer key={userId} userId={userId} />
            ))}
        </Container>
    );
};

export default React.memo(Lists);
