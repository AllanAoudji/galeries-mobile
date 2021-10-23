import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    margin: ${({ theme }) => `${theme.spacings.normal} 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
