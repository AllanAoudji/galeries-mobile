import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { EmptyMessage } from '#components';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';

import { InnerContainer, StyledAnimatedScrollView } from './styles';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    scrollY: Animated.SharedValue<number>;
};

const EmptyScrollView = ({ current, editScrollY, scrollY }: Props) => {
    const dimension = useWindowDimensions();

    const scrollViewRef = React.useRef<ScrollView | null>(null);

    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (scrollViewRef.current && !current) {
                scrollViewRef.current.scrollTo({ y: newScrollY });
            }
        },
        [current]
    );

    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [setInitialScroll, current]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, current]
    );

    React.useEffect(() => {
        if (current) editScrollY(0);
    }, []);

    return (
        <StyledAnimatedScrollView
            onScroll={scrollHandler}
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
        >
            <InnerContainer height={dimension.height + ProfileTabViewMaxScroll}>
                <EmptyMessage text="You don't have any profile picture yet. Click on the + button to post a new one" />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default React.memo(EmptyScrollView);
