import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    postProfilePicture,
    resetProfilePicturesLoadingPost,
    selectProfilePicturesLoadingPost,
} from '#store/profilePictures';
import CheckImageExtension from '#helpers/CheckImageExtension';

export const CreateProfilePictureContext = React.createContext<{
    addPicture: (uri: string) => void;
    pictureUri: string | null;
    repost: () => void;
    removePicture: () => void;
    setPicture: (uri: string) => void;
}>({
    addPicture: () => {},
    pictureUri: null,
    repost: () => {},
    removePicture: () => {},
    setPicture: () => {},
});

export const CreateProfilePictureProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const loading = useSelector(selectProfilePicturesLoadingPost);

    const [pictureUri, setPictureUri] = React.useState<string | null>(null);

    const addPicture = React.useCallback(
        (uri: string) => {
            if (loading.includes('LOADING')) return;
            const type = CheckImageExtension(uri);
            if (!type) return;

            setPictureUri(uri);
            const formData = new FormData();
            formData.append('image', {
                // @ts-ignore
                uri,
                type,
                name: uri,
            });
            dispatch(postProfilePicture(formData));
        },
        [loading, pictureUri]
    );
    const repost = React.useCallback(() => {
        if (pictureUri && loading === 'ERROR') {
            const type = CheckImageExtension(pictureUri);
            if (!type) return;

            const formData = new FormData();
            formData.append('image', {
                // @ts-ignore
                uri: pictureUri,
                type,
                name: pictureUri,
            });
            dispatch(postProfilePicture(formData));
        }
    }, [loading, pictureUri]);
    const removePicture = React.useCallback(() => {
        setPictureUri(null);
    }, []);
    const setPicture = React.useCallback(
        (uri: string) => setPictureUri(uri),
        []
    );

    React.useEffect(() => {
        if (loading === 'SUCCESS') {
            dispatch(resetProfilePicturesLoadingPost());
        }
    }, [loading, removePicture]);

    return (
        <CreateProfilePictureContext.Provider
            value={{
                addPicture,
                pictureUri,
                repost,
                removePicture,
                setPicture,
            }}
        >
            {children}
        </CreateProfilePictureContext.Provider>
    );
};
