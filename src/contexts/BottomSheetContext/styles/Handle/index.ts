import styled from 'styled-components/native';

const Handle = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-dark']};
    border-radius: 100px;
    height: 4px;
    width: 30px;
`;

export default Handle;
