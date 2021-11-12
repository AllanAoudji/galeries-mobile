import styled from 'styled-components/native';

const SIZE = 10;

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.danger};
    border-radius: ${() => `${Math.ceil(SIZE / 2)}px`};
    height: ${() => `${SIZE}px`};
    position: absolute;
    right: -4px;
    top: -2px;
    width: ${() => `${SIZE}px`};
    z-index: 100;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
