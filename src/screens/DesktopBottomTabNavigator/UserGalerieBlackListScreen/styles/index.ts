import styled from 'styled-components/native';

const BodyFooterContainer = styled.View`
    flex: 1;
    justify-content: space-between;
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['primary-light']};
    flex: 1;
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;

// eslint-disable-next-line import/prefer-default-export
export { BodyFooterContainer, Container };
