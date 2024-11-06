import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductPagination = ({
  productsPerPage,
  count,
  currentPage,
  selectedFilters,
  updateURL,
}) => {
  const pages = Math.ceil(count / productsPerPage);

  const handlePageChange = (page) => {
    const newFilters = {
      ...selectedFilters,
      page: [page.toString()],
    };

    return `?${new URLSearchParams(
      Object.entries(newFilters).map(([key, value]) => [key, value.join(",")])
    ).toString()}`;
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={handlePageChange(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={handlePageChange(page)}
              active={page === currentPage ? "true" : "false"}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={handlePageChange(currentPage + 1)}
            aria-disabled={currentPage >= pages}
            tabIndex={currentPage >= pages ? 1 : undefined}
            className={
              currentPage >= pages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
