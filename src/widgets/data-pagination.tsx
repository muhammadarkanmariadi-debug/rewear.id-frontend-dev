"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface DataPaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  perPage?: number;
  onPerPageChange?: (perPage: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export function DataPagination({
  currentPage,
  lastPage,
  onPageChange,
  perPage = 15,
  onPerPageChange,
  className = "",
  maxVisiblePages = 5,
}: DataPaginationProps) {
  if (lastPage <= 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePage = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  const renderPages = () => {
    const pages: React.ReactNode[] = [];
    if (lastPage <= 1) return pages;

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(lastPage, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(
        <PaginationItem key="1">
          <PaginationLink href="#" onClick={(e) => handlePage(e, 1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (start > 2) {
        pages.push(
          <PaginationItem key="dots-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => handlePage(e, i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
  
      if (end < lastPage) {
        if (end < lastPage - 1) {
          pages.push(
            <PaginationItem key="dots-end">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        pages.push(
          <PaginationItem key={lastPage}>
            <PaginationLink href="#" onClick={(e) => handlePage(e, lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        );
      }
  
      return pages;
    };
  
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        {onPerPageChange && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
            <span>Tampilkan</span>
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="bg-background border border-border rounded-md px-2 py-1 outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {[10, 15, 25, 50, 100].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <span>baris</span>
          </div>
        )}
  
        {lastPage > 1 && (
          <Pagination className="w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={handlePrev}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
  
              {renderPages()}
  
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={handleNext}
                  className={currentPage === lastPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  }
