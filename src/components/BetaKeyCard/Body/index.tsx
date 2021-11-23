import * as React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Typography from '#components/Typography';
import { selectUser } from '#store/users';

import ResendButton from './ResendButton';
import UsedBy from './UsedBy';

import { Container } from './styles';

type Props = {
    betaKey: Store.Models.BetaKeys;
};

const Body = ({ betaKey }: Props) => {
    const usedBySelector = React.useMemo(
        () => selectUser(betaKey.userId),
        [betaKey]
    );
    const usedBy = useSelector(usedBySelector);

    return (
        <Container justifyContent={usedBy ? 'flex-end' : 'space-between'}>
            {!usedBy && (
                <View>
                    <Typography fontSize={14}>
                        code:{' '}
                        <Typography
                            color="primary"
                            fontFamily="bold"
                            fontSize={14}
                        >
                            {betaKey.code}
                        </Typography>
                    </Typography>
                    {betaKey.email && (
                        <Typography fontSize={14}>
                            email:{' '}
                            <Typography
                                color="primary"
                                fontFamily="bold"
                                fontSize={14}
                            >
                                {betaKey.email}
                            </Typography>
                        </Typography>
                    )}
                </View>
            )}
            {usedBy ? (
                <UsedBy user={usedBy} />
            ) : (
                <ResendButton betaKey={betaKey} />
            )}
        </Container>
    );
};

export default React.memo(Body);
