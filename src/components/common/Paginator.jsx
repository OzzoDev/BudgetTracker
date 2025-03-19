import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function Paginator({ items, maxItems, setItems, paginateTrigger }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setItems(items.slice((currentPage - 1) * maxItems, currentPage * maxItems));
    setCurrentPage(1);
  }, [items, maxItems, setItems, paginateTrigger]);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / maxItems);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setItems(items.slice((page - 1) * maxItems, page * maxItems));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <PaginationItem
              key={pageNum}
              className={
                pageNum === currentPage ? "px-4 py-[6px] rounded-md bg-white text-black" : ""
              }>
              {pageNum === currentPage ? (
                <span>{pageNum}</span>
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum);
                  }}>
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}
        {totalPages > 5 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
