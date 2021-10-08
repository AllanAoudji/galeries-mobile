import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteComment } from '#store/comments';

export const DeleteCommentModalContext = React.createContext<{
    handleOpenModal: (commentId: string) => void;
}>({
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
        <DeleteCommentModalContext.Provider value={{ handleOpenModal }}>
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
