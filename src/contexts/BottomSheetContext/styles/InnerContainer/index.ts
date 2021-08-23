import styled from 'styled-components/native';

const BORDER_RADIUS = '18px';

const InnerContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: ${() => `${BORDER_RADIUS}`};
    border-top-right-radius: ${() => `${BORDER_RADIUS}`};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} ${theme.spacings.small}`};
`;

export default InnerContainer;
