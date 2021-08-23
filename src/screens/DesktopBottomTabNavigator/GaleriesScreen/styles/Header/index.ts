import styled from 'styled-components/native';

const Header = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export default Header;
