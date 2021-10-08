import * as React from 'react';
import { useDispatch } from 'react-redux';

import { DeleteModal } from '#components';
import { deleteComment } from '#store/comments';

export const DeleteCommentModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (commentId: string) => void;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
});

export const DeleteCommentModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [currentComment, setCurrentComment] = React.useState<string | null>(
        null
    );

    const handleCloseModal = React.useCallback(() => {
        setCurrentComment(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((commentId: string) => {
        setCurrentComment(commentId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (currentComment) dispatch(deleteComment(currentComment));
    }, [currentComment]);

    return (
        <DeleteCommentModalContext.Provider
            value={{
                handleCloseModal,
                handleOpenModal,
            }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="delete this comment?"
            />
        </DeleteCommentModalContext.Provider>
    );
};
