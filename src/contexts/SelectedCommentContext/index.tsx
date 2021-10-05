import * as React from 'react';

export const SelectedCommentContext = React.createContext<{
    resetCommentSelected: () => void;
    selectedComment: string | null;
    setCommentSelected: (commentId: string) => void;
}>({
    resetCommentSelected: () => {},
    selectedComment: null,
    setCommentSelected: () => {},
});

export const SelectCommentProvider: React.FC<{}> = ({ children }) => {
    const [selectedComment, setSelectedComment] = React.useState<string | null>(
        null
    );
    const setCommentSelected = React.useCallback(
        (commentId: string) => setSelectedComment(commentId),
        []
    );
    const resetCommentSelected = React.useCallback(
        () => setSelectedComment(null),
        []
    );

    return (
        <SelectedCommentContext.Provider
            value={{
                resetCommentSelected,
                selectedComment,
                setCommentSelected,
            }}
        >
            {children}
        </SelectedCommentContext.Provider>
    );
};
