import * as React from 'react';

import Pictogram from '#components/Pictogram';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import BottomSheetOptions from './BottomSheetOptions';

import {
    Container,
    InfoContainer,
    InnerContainer,
    UserNameContainer,
} from './styles';

type Props = {
    color?: keyof Style.Colors;
    galerie?: Store.Models.Galerie;
    galerieBlackList?: Store.Models.GalerieBlackList;
    role?: Store.Role;
    user: Store.Models.User;
};

const UserCard = ({
    color = 'secondary-light',
    galerie,
    galerieBlackList,
    role,
    user,
}: Props) => {
    return (
        <Container color={color}>
            <ProfilePicture size="normal" user={user} />
            <InnerContainer>
                <InfoContainer>
                    <UserNameContainer>
                        <Typography fontFamily="bold" fontSize={18}>
                            {user.pseudonym}
                        </Typography>
                        {!!role && role !== 'user' && (
                            <Pictogram
                                color="primary"
                                ml="smallest"
                                size="small"
                                variant={
                                    role === 'admin'
                                        ? 'admin-role'
                                        : 'moderator-role'
                                }
                            />
                        )}
                    </UserNameContainer>
                    <Typography fontSize={14}>{user.userName}</Typography>
                </InfoContainer>
                <BottomSheetOptions
                    galerie={galerie}
                    galerieBlackList={galerieBlackList}
                    role={role}
                    user={user}
                />
            </InnerContainer>
        </Container>
    );
};

export default React.memo(UserCard);
