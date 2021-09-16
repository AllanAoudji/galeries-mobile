import styled from 'styled-components/native';

const PROFILE_PICTURE_SIZE = 34;

const Container = styled.View`
    flex-direction: row;
    margin: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.small}`};
`;
const ContentContainer = styled.View`
    flex-direction: row;
    margin-bottom: 4px;
`;
const ContentContainerFooter = styled.View`
    flex-direction: row;
`;
const ProfilePictureContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['primary-dark']};
    border-radius: ${() => `${PROFILE_PICTURE_SIZE / 2}px`};
    height: ${() => `${PROFILE_PICTURE_SIZE}px`};
    margin-right: ${({ theme }) => theme.spacings.smallest};
    width: ${() => `${PROFILE_PICTURE_SIZE}px`};
`;
const TimeContainer = styled.View`
    opacity: 0.8;
    padding-right: ${({ theme }) => theme.spacings.smallest};
`;

export {
    Container,
    ContentContainer,
    ContentContainerFooter,
    ProfilePictureContainer,
    TimeContainer,
};
