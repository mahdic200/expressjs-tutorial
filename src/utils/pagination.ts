interface Options {
    page: number;
    count: number;
    size: number;
}

export const paginateMetaData = ({ page, count, size }: Options) => {
    const totalPages = Math.ceil(count / size);
    let current = page < 1 ? 1 : page;
    current = current > totalPages ? totalPages : current;
    const prev = current - 1 > 0 ? current - 1 : null;
    const next = current + 1 <= totalPages ? current + 1 : null;
    return {
        totalPages: totalPages,
        previousPage: prev,
        nextPage: next,
        offset: (current - 1 > 0 ? current - 1 : 0) * size,
        limitPerPage: size,
        currentPage: current,
    }
}

export const initPageParam = (page: any) => {
    return isNaN(Number.parseInt(page)) ? 1 : Number.parseInt(page);
}