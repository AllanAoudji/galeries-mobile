import styled from 'styled-components/native';

const Container = styled.View`
    align-items: stretch;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-top-width: 1px;
    bottom: 0;
    flex-direction: row;
    height: 62px;
    justify-content: center;
    position: absolute;
    width: 100%;
`;

export default Container;
