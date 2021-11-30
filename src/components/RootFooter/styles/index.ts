import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.Pressable`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    bottom: 0;
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.FOOTER_LOGGER_HEIGHT}px`};
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
