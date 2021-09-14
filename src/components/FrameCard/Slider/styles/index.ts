import styled from 'styled-components/native';

type DotNavigationProps = {
    current: boolean;
};

const Dot = styled.View<DotNavigationProps>`
    background-color: ${({ theme, current }) =>
        current ? theme.colors.primary : theme.colors['secondary-dark']};
    border-radius: 2px;
    height: 4px;
    margin: 0 2px;
    transform: ${({ current }) => (current ? 'scale(1.2)' : 'scale(1)')};
    width: 4px;
`;
const DotsContainer = styled.View`
    align-items: center;
    flex-direction: row;
    height: 22px;
    justify-content: center;
`;

export { Dot, DotsContainer };
