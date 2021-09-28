import { Dispatch } from 'redux';
import { updateGaleriesById } from '#store/galeries';

const dispatchUpdateGalerieCoverPicture = (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    coverPicture: {
        id?: string | null;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateGaleriesById({
            ...galerie,
            coverPicture: {
                id:
                    coverPicture.id ||
                    (galerie.coverPicture ? galerie.coverPicture.id : null),
                status:
                    coverPicture.status ||
                    (galerie.coverPicture
                        ? galerie.coverPicture.status
                        : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateGalerieCoverPicture;
