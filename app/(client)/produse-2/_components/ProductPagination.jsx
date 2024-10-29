import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const ProductPagination = ({ productsPerPage, count, currentPage }) => {
  const pages = Math.ceil(count / productsPerPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Set the "page" query parameter to the selected page
    currentParams.set("page", page);

    const url = `/produse-2?${currentParams.toString()}`;

    return url;
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
