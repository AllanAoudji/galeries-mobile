const galerieSelector: (
    id: string
) => (state: Store.Reducer) => Store.Models.Galerie = (id) => (state) =>
    state.galeries.byId[id];

export default galerieSelector;
