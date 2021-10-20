import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';

const Container = styled.View`
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;
const TabbarStyled = styled(TabBar)`
    background-color: transparent;
    padding-top: ${({ theme }) => theme.spacings.smallest};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, TabbarStyled };
