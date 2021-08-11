import styled from 'styled-components/native';

const Body = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-right-radius: ${({ theme }) => theme.spacings.normal};
    padding-top: ${({ theme }) => theme.spacings.small};
`;

export default Body;
