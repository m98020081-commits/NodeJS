
const applySearch = (paintings, searchTerm) => {
    if (!searchTerm) return paintings;
    return paintings.filter(painting => painting.title.toLowerCase().includes(searchTerm) || painting.artist.toLowerCase().includes(searchTerm) || painting.description.toLowerCase().includes(searchTerm));
};


const applyFilters = (paintings, filters) => {
    let filtered = [...paintings];
    

    if (filters.genre) {
        const genreTerm = filters.genre.toLowerCase();
        filtered = filtered.filter(painting => painting.genre.some(g => g.toLowerCase().includes(genreTerm)));
    }  
    if (filters.artist) {
        const artistTerm = filters.artist.toLowerCase();
        filtered = filtered.filter(painting => painting.artist.toLowerCase().includes(artistTerm));
    }
    if (filters.minYear) {
        filtered = filtered.filter(p => p.year >= parseInt(filters.minYear));
    }
    if (filters.maxYear) {
        filtered = filtered.filter(p => p.year <= parseInt(filters.maxYear));
    }
    if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    if (filters.isFeatured !== undefined) {
        filtered = filtered.filter(p => p.isFeatured === (filters.isFeatured === 'true'));
    }

    return filtered;
};


const applyPagination = (paintings, page, limit) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
  
    return {
        data: paintings.slice(startIndex, endIndex), 
        pagination: {
            currentPage: pageNum,
            totalPages: Math.ceil(paintings.length / limitNum),
            itemsPerPage: limitNum,
            totalItems: paintings.length,
            hasNextPage: pageNum < Math.ceil(paintings.length / limitNum),
            hasPrevPage: pageNum > 1
        }
    };
};

module.exports = {
    applySearch,
    applyFilters,
    applyPagination
};
