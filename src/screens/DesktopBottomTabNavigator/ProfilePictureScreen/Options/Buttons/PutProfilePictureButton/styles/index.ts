import styled from 'styled-components/native';

const Button = styled.Pressable`
    align-items: center;
    padding: ${({ theme }) => `${theme.spacings.smallest} 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Button };
