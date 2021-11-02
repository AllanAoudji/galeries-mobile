import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type StyledAnimatedFlatListProps = {
    marginTop: number;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);

const StyledAnimatedFlatList = styled(
    AnimatedFlatList
)<StyledAnimatedFlatListProps>`
    margin-top: ${({ marginTop }) => `${marginTop}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { StyledAnimatedFlatList };
