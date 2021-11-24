import * as React from 'react';

import { View } from 'react-native';
import Typography from '#components/Typography';
import ProfilePicture from '#components/ProfilePicture';

import BottomSheetOptions from './BottomSheetOptions';

import { Container, UserContainer } from './styles';

type Props = {
    betaKey: Store.Models.BetaKeys;
    user?: Store.Models.User;
};

const CreatedBy = ({ betaKey, user }: Props) => {
    return (
        <Container>
            <UserContainer>
                <ProfilePicture mr="smallest" user={user} />
                <View>
                    <Typography>
                        Created by{' '}
                        <Typography fontFamily="bold">
                            {user ? user.pseudonym : 'user not found'}
                        </Typography>
                    </Typography>
                    {!!betaKey.email && (
                        <Typography>
                            Send to{' '}
                            <Typography fontFamily="bold">
                                {betaKey.email}
                            </Typography>
                        </Typography>
                    )}
                </View>
            </UserContainer>
            <BottomSheetOptions betaKey={betaKey} />
        </Container>
    );
};

export default CreatedBy;
