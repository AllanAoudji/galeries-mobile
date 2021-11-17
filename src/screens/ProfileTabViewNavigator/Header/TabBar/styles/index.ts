import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';

const TabbarStyled = styled(TabBar)`
    background-color: transparent;
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { TabbarStyled };
