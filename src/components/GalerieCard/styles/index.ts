import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type DefaultCoverPictureProps = {
    size: number;
};

const Container = styled.Pressable`
    height: ${() => `${GLOBAL_STYLE.GALERIE_MODAL_HEIGHT}px`};
    margin-bottom: 15px;
`;
const DefaultCoverPicture = styled(LinearGradient)<DefaultCoverPictureProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;
const Informations = styled.View`
    height: 74px;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;
const NumOfUsersContainer = styled.View`
    margin-left: 8px;
`;
const PictureContainer = styled(LinearGradient)`
    height: 140px;
    justify-content: center;
    overflow: hidden;
`;
const UserContainer = styled.View`
    margin-left: -16px;
`;
const UsersContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;

export {
    Container,
    DefaultCoverPicture,
    Informations,
    NumOfUsersContainer,
    PictureContainer,
    UserContainer,
    UsersContainer,
};
