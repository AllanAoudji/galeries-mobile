import * as React from 'react';

export const CreateFrameContext = React.createContext<{
    addPictures: (uri: string, callBack?: () => void) => void;
    picturesUri: string[];
    removePictures: (uri: string) => void;
}>({
    addPictures: () => {},
    picturesUri: [],
    removePictures: () => {},
});

export const CreateFrameProvider: React.FC<{}> = ({ children }) => {
    const [picturesUri, setPicturesUri] = React.useState<string[]>([]);

    const addPictures = React.useCallback(
        (uri: string, callBack?: () => void) => {
            if (picturesUri.length < 6)
                setPicturesUri((prevState) => [...prevState, uri]);
            if (callBack) callBack();
        },
        [picturesUri]
    );
    const removePictures = React.useCallback(
        (uri: string) => {
            const newPicturesUri = picturesUri.filter(
                (pictureUri) => pictureUri !== uri
            );
            setPicturesUri(newPicturesUri);
        },
        [picturesUri]
    );

    return (
        <CreateFrameContext.Provider
            value={{ addPictures, picturesUri, removePictures }}
        >
            {children}
        </CreateFrameContext.Provider>
    );
};
