import styled from 'styled-components/native';

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
const TimeContainer = styled.View`
    opacity: 0.8;
    padding-right: ${({ theme }) => theme.spacings.smallest};
`;

export { Container, ContentContainer, ContentContainerFooter, TimeContainer };
