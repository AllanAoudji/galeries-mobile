import styled from 'styled-components/native';

const Informations = styled.View`
    flex: 1;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;

export default Informations;
