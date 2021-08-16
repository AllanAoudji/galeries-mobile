import moment from 'moment';

export default (expiresIn: number) => {
    return moment().add(expiresIn, 's').valueOf().toString();
};
