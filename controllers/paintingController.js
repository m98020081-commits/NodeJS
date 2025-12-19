const { text } = require('express');
const paintings = require('../data/paintingsData');
const {
    applySearch,
    applyFilters,
    applyPagination,
} = require('../utils/paintingUtils');
const { sendError, ERROR_TYPES } = require('../utils/errors');

const getPaintings = (req, res) => {
    try {

        const {
            page = 1, 
            limit = 10, 
            search, 
            genre,
            artist,
            minYear,
            maxYear,
            minPrice,
            maxPrice,
            featured
        } = req.query;

let result = applySearch(paintings, search?.toLowerCase());

        const filters = { genre, artist,maxPrice,maxYear,minPrice,minYear,featured };
        result = applyFilters(result, filters);

        const applySorting = (paintingsArray, sortByField, sortOrderDir = 'asc') => {
            if (!sortByField) return paintingsArray;

            const order = sortOrderDir.toLowerCase() === 'desc' ? -1 : 1;

            return paintingsArray.sort((a, b) => {
             
                const getValue = (obj, path) =>
                    path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);

                const valA = getValue(a, sortByField);
                const valB = getValue(b, sortByField);

                if (valA === undefined || valB === undefined) return 0;

                if (typeof valA === 'string') {
                    return valA.localeCompare(valB) * order;
                } else {
                    return (valA - valB) * order;
                }
            });
        };

        result = applySorting(result, req.query.sortBy, req.query.sortOrder);

        const {data, pagination} = applyPagination(result, page, limit);

        const availableFilters = {
            genres: [...new Set(paintings.flatMap(p => p.genre))], 
            artists: [...new Set(paintings.map(p => p.artist))], 
            years: {
                min: Math.min(...paintings.map(p => p.year)), 
                max: Math.max(...paintings.map(p => p.year)) 
            },
            prices: {
                min: Math.min(...paintings.map(p => p.price).filter(p => p > 0)), 
                max: Math.max(...paintings.map(p => p.price)) 
            }
        };


        const response = {
            success: true,
            pagination, 
            filters: {
                applied: Object.keys(req.query).length > 0 ? req.query : null, 
                available: availableFilters 
            },
            data 
        };

        res.json(response);
    } catch (error) {
        console.error('Ошибка в getPaintings', error);
        sendError(res,ERROR_TYPES.SERVER_ERROR,'Не удалось получить список картин');
    }

};

const getPaintingById = (req, res) => {
    try {

        const paintingId = parseInt(req.params.id);

        const painting = paintings.find(p => p.id === paintingId);

        if (!painting) {
            return sendError(res,ERROR_TYPES.NOT_FOUND,"Картина с таким id не найдена")
        }
        res.json({
            success: true,
            data: painting
        });
    } catch (error) {

        console.log('Ошибка в getPaintingById:',error);
        sendError(res,ERROR_TYPES.SERVER_ERROR,'Не удалось получить данные картины');
    }
};

const getPaintingsFeatured = (req,res)=>{
    try {
        let result = paintings.filter(painting => painting.isFeatured) 
        res.json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении картин',
            error: error.message
        });
    }};

const getPaintingGenre = (req, res) => {
    const genreParam = req.params.genre; 
    if (!genreParam){ 
        return res.json({ 
            success: false, 
            message: "Жанр не указан" 
        });
    };
    
    const paintingsByGenre = paintings.filter(p =>
        p.genre.some(g => g.toLowerCase() === genreParam.toLowerCase())
    );

    if (paintingsByGenre.length === 0) {
        return res.json({ 
            success: false, 
            message: "Картины с таким жанром не найдены" 
        });
    }
    res.json({ success: true, 
        data: paintingsByGenre 
    });
};

module.exports = {
  getPaintings,
  getPaintingById,
  getPaintingsFeatured,
  getPaintingGenre
};
