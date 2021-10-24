import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.black};
    flex: 1;
    justify-content: center;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
