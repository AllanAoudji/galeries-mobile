import * as Yup from 'yup';

export default Yup.object().shape({
    numOfInvits: Yup.number().min(1).max(200),
    time: Yup.number().notRequired().min(1).max(99),
});
