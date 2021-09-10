import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';

const TabbarStyled = styled(TabBar)`
    background-color: transparent;
    padding-top: ${({ theme }) => theme.spacings.smallest};
`;

export default TabbarStyled;
