import styled from 'styled-components/native';

const InnerContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} ${theme.spacings.small}`};
`;

export default InnerContainer;
