import {MatPaginatorIntl} from '@angular/material/paginator';

const italianRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0)
        return `0 di ${length}`;

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} di ${length}`;
};


export function getItalianPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Oggetti per pagina:';
    paginatorIntl.nextPageLabel = 'Pagina successiva';
    paginatorIntl.previousPageLabel = 'Pagina precedente';
    paginatorIntl.lastPageLabel = 'Ultima pagina';
    paginatorIntl.firstPageLabel = 'Prima pagina';
    paginatorIntl.getRangeLabel = italianRangeLabel;

    return paginatorIntl;
}
