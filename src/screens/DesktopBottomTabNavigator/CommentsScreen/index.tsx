import * as React from 'react';
import { Keyboard } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import {
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
    Typography,
} from '#components';
import { FIELD_REQUIREMENT, GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { fetchComments } from '#store/actions';
import {
    currentFrameCommentsStatusSelector,
    currentFrameSelector,
} from '#store/selectors';
import currentFrameCommentsSelector from '#store/selectors/currentFrameComments.selector';

type CommentTextInputProps = {
    height: number;
};

const Container = styled.Pressable`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    width: 100%;
    z-index: 10;
`;
const CommentFormContainer = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    bottom: 0;
    left: 0;
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${({ theme }) => theme.spacings.small};
    position: absolute;
    right: 0;
`;
const CommentFormButton = styled.Pressable`
    opacity: 0.5;
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
    flex-direction: row;
    align-self: stretch;
    align-items: center;
`;
const CommentTextInput = styled.TextInput<CommentTextInputProps>`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    margin: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.small}`};
    border-bottom-width: 3px;
    padding: ${({ theme }) => `10px ${theme.spacings.smallest}`};
    border-color: ${({ theme }) => theme.colors['primary-dark']};
    height: ${({ height }) => `${height}px`};
`;

const CommentScreen = () => {
    const currentFrame = useSelector(currentFrameSelector);
    const currentFrameComments = useSelector(currentFrameCommentsSelector);
    const currentFrameCommentsStatus = useSelector(
        currentFrameCommentsStatusSelector
    );
    const dispatch = useDispatch();
    const theme = useTheme();
    const { onLayout } = useComponentSize();
    const { containerStyle, headerStyle } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);
    const [height, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
        if (currentFrame && currentFrameCommentsStatus === 'PENDING') {
            setFirstFetchFinished(false);
            dispatch(fetchComments({ frameId: currentFrame.id }));
        }
    }, [currentFrameCommentsStatus, currentFrame]);
    React.useEffect(() => {
        if (
            (currentFrameCommentsStatus === 'SUCCESS' ||
                currentFrameCommentsStatus === 'ERROR') &&
            !firstFetchFinished
        ) {
            setFirstFetchFinished(true);
        }
    }, [currentFrameCommentsStatus]);

    return (
        <Container onPress={Keyboard.dismiss}>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader
                    style={headerStyle}
                    title="comments"
                    variant="secondary"
                />
            </Header>
            {firstFetchFinished && !!currentFrameComments && (
                <>
                    {currentFrameComments.length === 0 && (
                        <EmptyMessage text="This frame do not have comment yet..." />
                    )}
                    <CommentFormContainer>
                        <CommentTextInput
                            placeholder="post a comment..."
                            multiline
                            selectionColor={theme.colors['primary-dark']}
                            maxLength={FIELD_REQUIREMENT.COMMENT_MAX_LENGTH}
                            height={Math.max(35, height)}
                            onContentSizeChange={(e) =>
                                setHeight(e.nativeEvent.contentSize.height)
                            }
                        />
                        <CommentFormButton>
                            <Typography color="primary" fontSize={18}>
                                post
                            </Typography>
                        </CommentFormButton>
                    </CommentFormContainer>
                </>
            )}
            <FullScreenLoader show={!firstFetchFinished} />
        </Container>
    );
};

export default CommentScreen;
