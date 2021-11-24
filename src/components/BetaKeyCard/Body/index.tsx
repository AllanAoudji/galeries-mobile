import * as Clipboard from 'expo-clipboard';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Typography from '#components/Typography';
import { selectUser } from '#store/users';

import ResendButton from './ResendButton';
import UsedBy from './UsedBy';

import { CodeContainer, CodeInnerContainer, Container } from './styles';

type Props = {
    betaKey: Store.Models.BetaKeys;
};

const Body = ({ betaKey }: Props) => {
    const usedBySelector = React.useMemo(
        () => selectUser(betaKey.userId),
        [betaKey]
    );
    const usedBy = useSelector(usedBySelector);

    const handlePress = React.useCallback(
        () => Clipboard.setString(betaKey.code),
        [betaKey]
    );

    return (
        <Container>
            <CodeContainer>
                {!betaKey.userId && (
                    <CodeInnerContainer onPress={handlePress}>
                        <Typography fontFamily="bold" fontSize={18}>
                            {betaKey.code}
                        </Typography>
                    </CodeInnerContainer>
                )}
            </CodeContainer>
            {usedBy ? (
                <UsedBy user={usedBy} />
            ) : (
                <ResendButton betaKey={betaKey} />
            )}
        </Container>
    );
};

export default React.memo(Body);
