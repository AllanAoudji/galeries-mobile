import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import CustomRadio from '#components/CustomRadio';
import DeleteModal from '#components/DeleteModal';
import Typography from '#components/Typography';
import { deleteGalerieUser } from '#store/users';
import { postGalerieBlackList } from '#store/galerieBlackLists';

export const DeleteGalerieUserModalContext = React.createContext<{
    handleOpenModal: (galerieId: string, userId: string) => void;
}>({
    handleOpenModal: () => {},
});

type Props = {
    value: boolean;
    onPress: () => void;
};

const Content = ({ onPress, value }: Props) => {
    return (
        <View style={{ paddingTop: 30 }}>
            <Typography fontFamily="bold">Black list user?</Typography>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                }}
            >
                <CustomRadio
                    onChange={onPress}
                    pt="smallest"
                    pb="smallest"
                    pr="small"
                    value={value}
                />
                <View style={{ flex: 1 }}>
                    <Typography>
                        If you decide to black list this user, he is not gonna
                        be able to subscribe to this galerie anymore
                    </Typography>
                </View>
            </View>
        </View>
    );
};

export const DeleteGalerieUserModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [blackListUser, setBlackListUser] = React.useState<boolean>(false);
    const [currentGalerie, setCurrentGalerie] = React.useState<string | null>(
        null
    );
    const [currentUser, setCurrentUser] = React.useState<string | null>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentGalerie(null);
        setCurrentUser(null);
        setOpenModal(false);
        setBlackListUser(false);
    }, []);
    const handleOpenModal = React.useCallback(
        (galerieId: string, userId: string) => {
            setCurrentGalerie(galerieId);
            setCurrentUser(userId);
            setOpenModal(true);
        },
        []
    );
    const handlePressDelete = React.useCallback(() => {
        if (currentGalerie && currentUser) {
            if (blackListUser)
                dispatch(postGalerieBlackList(currentGalerie, currentUser));
            else dispatch(deleteGalerieUser(currentGalerie, currentUser));
        }
    }, [blackListUser, currentUser]);

    const handlePressRadioButton = React.useCallback(
        () => setBlackListUser((prevState) => !prevState),
        []
    );

    const InnerContainer = React.useCallback(
        () => (
            <Content onPress={handlePressRadioButton} value={blackListUser} />
        ),
        [blackListUser]
    );

    return (
        <DeleteGalerieUserModalContext.Provider value={{ handleOpenModal }}>
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                content={InnerContainer}
                onPressDelete={handlePressDelete}
                open={openModal}
                title={`Are tou sure to delete this user?`}
            />
        </DeleteGalerieUserModalContext.Provider>
    );
};
