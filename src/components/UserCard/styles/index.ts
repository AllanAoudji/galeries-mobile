import styled from 'styled-components/native';

const PROFILE_PICTURE_CONTAINER_SIZE = 50;

const Container = styled.View`
    align-items: center;
    flex-direction: row;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small}`};
`;
const InfoContainer = styled.View`
    margin-left: ${({ theme }) => theme.spacings.small};
`;
const ProfilePictureContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${() => `${PROFILE_PICTURE_CONTAINER_SIZE / 2}px`};
    height: ${() => `${PROFILE_PICTURE_CONTAINER_SIZE}px`};
    width: ${() => `${PROFILE_PICTURE_CONTAINER_SIZE}px`};
`;

export { Container, InfoContainer, ProfilePictureContainer };
