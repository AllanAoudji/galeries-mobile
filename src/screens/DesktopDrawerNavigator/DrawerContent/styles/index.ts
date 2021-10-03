import styled from 'styled-components/native';

const Container = styled.View`
    align-items: stretch;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `${theme.spacings.largest} ${theme.spacings.small} ${theme.spacings.smallest}`};
`;
const LogoContainer = styled.Pressable`
    display: flex;
    align-items: center;
    margin-bottom: 120px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, LogoContainer };
