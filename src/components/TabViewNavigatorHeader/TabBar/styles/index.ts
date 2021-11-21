import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';

type TabbarStyledProps = {
    variant: 'center' | 'scroll';
};

const TabbarStyled = styled(TabBar)<TabbarStyledProps>`
    background-color: transparent;
    margin: ${({ theme, variant }) =>
        `0 ${variant === 'center' ? theme.spacings.normal : 0}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { TabbarStyled };
