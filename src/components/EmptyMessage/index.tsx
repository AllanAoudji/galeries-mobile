import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import Typography from '#components/Typography';

import { Container, StyledAnimatedScrollView } from './styles';

type Props = {
    editScrollY?: (offsetY: number) => void;
    height: number;
    isFocus?: boolean;
    onRefresh?: () => void;
    pb?: number;
    progressViewOffset?: number;
    pt?: number;
    refreshStatus?: Store.Status;
    scrollY?: Animated.SharedValue<number>;
    text: string;
};

const EmptyMessage = ({
    editScrollY,
    height,
    isFocus,
    onRefresh,
    pb,
    progressViewOffset,
    pt,
    refreshStatus,
    scrollY,
    text,
}: Props) => {
    const theme = useTheme();

    const scrollViewRef = React.useRef<ScrollView | null>(null);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );

    const handleRefresh = React.useCallback(() => {
        if (onRefresh) {
            setRefreshing(true);
            onRefresh();
        }
    }, [onRefresh]);
    const refreshControl = React.useMemo(() => {
        if (!onRefresh) return undefined;
        return (
            <RefreshControl
                colors={colors}
                onRefresh={handleRefresh}
                progressBackgroundColor={theme.colors['secondary-light']}
                progressViewOffset={progressViewOffset}
                refreshing={refreshing}
            />
        );
    }, [
        colors,
        handleRefresh,
        onRefresh,
        progressViewOffset,
        refreshing,
        theme,
    ]);

    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (isFocus) return;
            if (scrollViewRef.current)
                scrollViewRef.current.scrollTo({ y: newScrollY });
        },
        [isFocus]
    );

    useAnimatedReaction(
        () => (scrollY ? scrollY.value : 0),
        (newScrollY) => {
            if (!scrollY) return;
            runOnJS(setInitialScroll)(newScrollY);
        },
        [setInitialScroll]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (!isFocus) return;
                if (!editScrollY) return;
                editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, isFocus]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!refreshing) return;
            if (!refreshStatus) setRefreshing(false);
            if (refreshStatus === 'SUCCESS' || refreshStatus === 'ERROR')
                setRefreshing(false);
        }, [refreshStatus, refreshing])
    );
    useFocusEffect(React.useCallback(() => () => setRefreshing(false), []));

    // TODO:
    // need a way to scroll top when a new model is posted

    return (
        <StyledAnimatedScrollView
            onScroll={scrollHandler}
            overScrollMode="never"
            ref={scrollViewRef}
            refreshControl={refreshControl}
            showsVerticalScrollIndicator={false}
        >
            <Container height={height} pb={pb} pt={pt}>
                <Typography
                    color="primary"
                    fontFamily="light"
                    fontSize={14}
                    textAlign="center"
                >
                    {text}
                </Typography>
            </Container>
        </StyledAnimatedScrollView>
    );
};

export default React.memo(EmptyMessage);
