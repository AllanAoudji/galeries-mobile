import styled from 'styled-components/native';

const PROFILE_PICTURE_SIZE = 34;

const Container = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) => `5px 0 5px ${theme.spacings.small}`};
`;
const InfoContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;
const ProfilePicturesContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.tertiary};
    border-radius: ${() => `${PROFILE_PICTURE_SIZE / 2}px`};
    height: ${() => `${PROFILE_PICTURE_SIZE}px`};
    margin-right: ${({ theme }) => theme.spacings.smallest};
    width: ${() => `${PROFILE_PICTURE_SIZE}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, InfoContainer, ProfilePicturesContainer };
