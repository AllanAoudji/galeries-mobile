import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider } from 'react-redux';

import { BottomSheetProvider } from '#contexts/BottomSheetContext';
import { CreateFrameProvider } from '#contexts/CreateFrameContext';
import { CreateProfilePictureProvider } from '#contexts/CreateProfilePictureContext';
import { DeleteBetaKeyModalProvider } from '#contexts/DeleteBetaKeyModalContext';
import { DeleteCommentModalProvider } from '#contexts/DeleteCommentModalContext';
import { DeleteFrameModalProvider } from '#contexts/DeleteFrameModalContext';
import { DeleteGalerieBlackListModalProvider } from '#contexts/DeleteGalerieBlackListModalContext';
import { DeleteGalerieUserModalProvider } from '#contexts/DeleteGalerieUserModalContext';
import { DeleteInvitationModalProvider } from '#contexts/DeleteInvitationModalContext';
import { DeleteNotificationModalProvider } from '#contexts/DeleteNotificationModalContext';
import { DeleteProfilePictureModalProvider } from '#contexts/DeleteProfilePictureModalContext';
import { GaleriesSearchProvider } from '#contexts/GaleriesSearchContext';
import ThemeProvider from '#contexts/ThemeContext';
import Loader from '#helpers/Loader';
import store from '#store';

const ContextsProvider: React.FC<{}> = ({ children }) => {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <Loader>
                    <NavigationContainer>
                        <CreateFrameProvider>
                            <CreateProfilePictureProvider>
                                <DeleteBetaKeyModalProvider>
                                    <DeleteFrameModalProvider>
                                        <DeleteGalerieBlackListModalProvider>
                                            <DeleteCommentModalProvider>
                                                <DeleteGalerieUserModalProvider>
                                                    <DeleteInvitationModalProvider>
                                                        <DeleteNotificationModalProvider>
                                                            <DeleteProfilePictureModalProvider>
                                                                <GaleriesSearchProvider>
                                                                    <BottomSheetProvider>
                                                                        {
                                                                            children
                                                                        }
                                                                    </BottomSheetProvider>
                                                                </GaleriesSearchProvider>
                                                            </DeleteProfilePictureModalProvider>
                                                        </DeleteNotificationModalProvider>
                                                    </DeleteInvitationModalProvider>
                                                </DeleteGalerieUserModalProvider>
                                            </DeleteCommentModalProvider>
                                        </DeleteGalerieBlackListModalProvider>
                                    </DeleteFrameModalProvider>
                                </DeleteBetaKeyModalProvider>
                            </CreateProfilePictureProvider>
                        </CreateFrameProvider>
                    </NavigationContainer>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
};

export default ContextsProvider;
