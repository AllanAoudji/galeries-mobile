import styled from 'styled-components/native';

const Ligne = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
    height: 2px;
    width: 200px;
`;
const Container = styled.View`
    align-items: center;
    margin: ${({ theme }) =>
        `${theme.spacings.small} 0 ${theme.spacings.normal}`};
`;

export { Ligne, Container };
