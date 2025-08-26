"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery } from "@tanstack/react-query";

import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";

import Button from "./Button";

type FilterableListProps<TData extends { id: string | number }, TFilters> = {
  baseQueryKey: string[];

  filters: TFilters;
  ordering: string;

  fetchData: (
    params: PageDataModel & TFilters
  ) => Promise<PaginatedResponseModel<TData>>;

  renderData: (item: TData) => React.ReactNode;
  className?: string;
};

const FilterableList = <TData extends { id: string | number }, TFilters>({
  baseQueryKey,
  filters,
  ordering,
  fetchData,
  renderData,
  className = "",
}: FilterableListProps<TData, TFilters>) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    // The queryKey now includes filters and ordering.
    // TanStack Query will automatically refetch when these change.
    queryKey: [...baseQueryKey, filters, ordering],

    queryFn: ({ pageParam = 1 }) => fetchData({ page: pageParam, ...filters }),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        try {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("page");
          return nextPage ? parseInt(nextPage, 10) : undefined;
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },
  });

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{error.message}</span>
      </div>
    );
  }

  const allData = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <div className={className}>
      <div className="space-y-4">
        {allData.length > 0 ? (
          allData.map((item) => (
            <React.Fragment key={item.id}>{renderData(item)}</React.Fragment>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>

      <div ref={ref} className="h-1" />
      {/* 
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )} */}
      {hasNextPage && (
        <div className="flex justify-center items-center py-6">
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Carregar mais
          </Button>
        </div>
      )}

      {!hasNextPage && allData.length > 0 && (
        <p className="text-center text-gray-500 mt-8 text-sm">
          Você chegou ao fim da lista.
        </p>
      )}
    </div>
  );
};

export default FilterableList;
