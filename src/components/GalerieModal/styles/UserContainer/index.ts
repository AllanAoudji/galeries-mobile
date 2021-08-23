import styled from 'styled-components/native';

const SIZE = 34;

const UserContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${() => `${SIZE / 2}px`};
    border-width: 2px;
    height: ${() => `${SIZE}px`};
    margin-left: -15px;
    overflow: hidden;
    width: ${() => `${SIZE}px`};
`;

export default UserContainer;
