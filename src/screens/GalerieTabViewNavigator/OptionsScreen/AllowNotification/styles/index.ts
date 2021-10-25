import styled from 'styled-components/native';

const Container = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.smallest} ${theme.spacings.small}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
