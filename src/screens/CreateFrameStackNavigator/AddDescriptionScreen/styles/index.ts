import styled from 'styled-components/native';

const ButtonsContainer = styled.View`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    margin-bottom: ${({ theme }) => theme.spacings.normal};
`;
const Container = styled.View`
    margin-top: ${({ theme }) => theme.spacings.large};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, ButtonsContainer };
