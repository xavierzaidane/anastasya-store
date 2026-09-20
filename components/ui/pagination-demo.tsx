"use client";

import {
  Pagination,
  PaginationPrevious,
  PaginationItem,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import React from "react";

function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => matchMedia.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function DemoOne() {
  const [currentPage, setCurrentPage] = React.useState(5);

  const totalPages = 20;
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const getVisiblePages = () => {
    const delta = isMobile ? 1 : isTablet ? 1 : 2;
    const rangeWithDots: (number | string)[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    rangeWithDots.push(1);

    let startPage = Math.max(2, currentPage - delta);
    let endPage = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage === 1) {
      endPage = Math.min(totalPages - 1, 1 + delta * 2);
    } else if (currentPage === totalPages) {
      startPage = Math.max(2, totalPages - delta * 2);
    } else {
      startPage = Math.max(2, Math.min(startPage, currentPage));
      endPage = Math.min(totalPages - 1, Math.max(endPage, currentPage));
    }

    if (startPage > 2) {
      rangeWithDots.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Pagination className="flex-wrap min-w-fit">
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Prev" : "Previous"}
        </PaginationPrevious>
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <PaginationEllipsis key={`ellipsis-${index}`} />
          ) : (
            <PaginationItem
              key={page}
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page as number)}
              size={isMobile ? "sm" : "default"}
            >
              {page}
            </PaginationItem>
          )
        )}
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Next" : "Next"}
        </PaginationNext>
      </Pagination>
    </div>
  );
}

export { DemoOne, useMediaQuery };

