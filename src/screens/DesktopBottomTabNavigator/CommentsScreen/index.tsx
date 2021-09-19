import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    FlatList,
    Keyboard,
    ListRenderItemInfo,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import {
    AnimatedFlatList,
    BottomLoader,
    CommentCard,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
    Typography,
} from '#components';
import { FIELD_REQUIREMENT, GLOBAL_STYLE } from '#helpers/constants';
import { createCommentSchema } from '#helpers/schemas';
import {
    useComponentSize,
    useFetchComments,
    useHideHeaderOnScroll,
    usePostComment,
} from '#hooks';
import { currentFrameSelector } from '#store/selectors';

import {
    Container,
    FormContainer,
    Header,
    PostButton,
    TextInputStyled,
} from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.CommentsNavigationProp;
};

const TEXT_INPUT_DEFAULT_HEIGHT = 35;
const initialValues = {
    body: '',
};

const renderItem = ({
    item,
}: ListRenderItemInfo<
    Store.Models.Comment & {
        user: Store.Models.User & {
            currentProfilePicture: Store.Models.ProfilePicture;
        };
    }
>) => <CommentCard comment={item} />;

const CommentScreen = ({ navigation }: Props) => {
    const theme = useTheme();

    const { currentFrameComments, fetching, fetchNextFrameComments } =
        useFetchComments();
    const { loading, postComment } = usePostComment();

    const currentFrame = useSelector(currentFrameSelector);

    const { onLayout: headerOnLayout, size: headerSize } = useComponentSize();
    const { onLayout: footerOnLayout, size: footerSize } = useComponentSize();
    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const flatListRef = React.useRef<FlatList | null>(null);

    const [textInputHeight, setTextInputHeight] = React.useState<number>(0);

    const formik = useFormik({
        onSubmit: (values) => {
            if (currentFrame)
                postComment(values, currentFrame, successCallback);
        },
        initialValues,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: createCommentSchema,
    });

    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.body && formik.submitCount > 0;
        return clientHasError;
    }, [formik.errors, formik.submitCount]);
    const height = React.useMemo(
        () => Math.max(TEXT_INPUT_DEFAULT_HEIGHT, textInputHeight),
        [textInputHeight]
    );
    const paddingBottom = React.useMemo(
        () => (footerSize ? footerSize.height : 0),
        [footerSize]
    );
    const paddingTop = React.useMemo(
        () => (headerSize ? headerSize.height : 0),
        [headerSize]
    );

    const handleChangeBodyText = React.useCallback((e: string) => {
        formik.setFieldError('body', '');
        formik.setFieldValue('body', e);
    }, []);
    const handleContentSizeChange = React.useCallback(
        ({
            nativeEvent,
        }: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) =>
            setTextInputHeight(nativeEvent.contentSize.height),
        []
    );
    const handlePress = React.useCallback(() => {
        if (!loading && !disableButton && formik.values.body !== '') {
            formik.handleSubmit();
        }
    }, [disableButton, loading, formik.values.body]);
    const onPressReturn = React.useCallback(() => {
        if (!loading) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [loading, navigation]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const keyExtractor = React.useCallback((data) => data.id, []);
    const scrollToTop = React.useCallback(() => {
        if (flatListRef.current)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, []);
    const successCallback = React.useCallback(() => {
        scrollToTop();
        setTextInputHeight(0);
        formik.setValues(formik.initialValues);
    }, [scrollToTop]);

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setTextInputHeight(0);
                formik.setFieldError('body', '');
                formik.setFieldValue('body', '');
            };
        }, [])
    );

    return (
        <Container>
            <Header onLayout={headerOnLayout} style={containerStyle}>
                <DefaultHeader
                    onPress={onPressReturn}
                    title="comments"
                    variant="secondary"
                />
            </Header>
            {currentFrameComments && !!paddingTop && (
                <>
                    {!!paddingBottom && currentFrameComments.length > 0 ? (
                        <AnimatedFlatList
                            contentContainerStyle={{
                                paddingBottom,
                                paddingTop,
                            }}
                            data={currentFrameComments}
                            keyExtractor={keyExtractor}
                            maxToRenderPerBatch={15}
                            onScroll={scrollHandler}
                            onEndReached={fetchNextFrameComments}
                            onEndReachedThreshold={0.2}
                            onScrollBeginDrag={handleScrollBeginDrag}
                            ref={flatListRef}
                            renderItem={renderItem}
                            removeClippedSubviews={true}
                            scrollEventThrottle={4}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <EmptyMessage text="This frame do not have comment yet..." />
                    )}
                    <FormContainer onLayout={footerOnLayout}>
                        <TextInputStyled
                            editable={!loading}
                            height={height}
                            loading={loading}
                            maxLength={FIELD_REQUIREMENT.COMMENT_MAX_LENGTH}
                            multiline
                            onChangeText={handleChangeBodyText}
                            onContentSizeChange={handleContentSizeChange}
                            placeholder="post a comment..."
                            selectionColor={theme.colors['primary-dark']}
                            value={formik.values.body}
                        />
                        <PostButton onPress={handlePress}>
                            <Typography color="primary" fontSize={18}>
                                post
                            </Typography>
                        </PostButton>
                    </FormContainer>
                </>
            )}
            <FullScreenLoader show={!currentFrameComments} />
            <BottomLoader show={fetching} bottom="huge" />
        </Container>
    );
};

export default CommentScreen;
