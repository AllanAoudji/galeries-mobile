import styled from 'styled-components/native';

const Informations = styled.View`
    height: 74px;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;

export default Informations;
