const { ERROR_TYPES, sendError } = require('../utils/errors');
const validateQueryParams = (req, res, next) => {
    const {
        page , 
        limit , 
        minYear,
        minPrice,
        maxYear,
        maxPrice,
    } = req.query;

if(page&&isNaN(parseInt(page))){
return sendError (res,ERROR_TYPES.VALIDATION_ERROR,'Номер страницы должен быть числом');
}
if(limit&&isNaN(parseInt(limit))){
    return sendError (res,ERROR_TYPES.VALIDATION_ERROR,'Лимит долже быть числом');
}
if (minYear && isNaN(parseInt(minYear))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Минимальныйгод должен быть числом`);
}
if (maxYear && isNaN(parseInt(maxYear))) {
    return sendError(res, ERROR_TYPES.VALIDATION_ERROR, `Максимальныйгод  должен быть числом`);
}
if(minYear && maxYear &&parseInt(minYear)>parseInt(maxYear)){
    return sendError(res,ERROR_TYPES.VALIDATION_ERROR,'Минимальный год не может быть больше максимального');
}
if(maxYear&&minYear&&parseInt(maxYear)<parseInt(minYear)){
    return sendError(res,ERROR_TYPES.VALIDATION_ERROR,'Максимальный год не может быть меньше минимального');
}
if(minPrice&&maxPrice&&parseFloat(minPrice)>parseFloat(maxPrice)){
    return sendError(res,ERROR_TYPES.VALIDATION_ERROR,'Минимальная цена не может быть больше максимального');
}
if(maxPrice&&minPrice&&parseFloat(maxPrice)<parseFloat(maxPrice)){
    return sendError(res,ERROR_TYPES.VALIDATION_ERROR,'Максимальная цена не может быть меньше минимальной');
}
next();
};
module.exports=validateQueryParams;
