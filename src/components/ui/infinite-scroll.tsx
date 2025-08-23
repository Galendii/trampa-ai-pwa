"use client";

import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Use a generic TData to make the component type-safe.
// We constrain TData to ensure it has an 'id' for the React key.
type InfiniteScrollProps<TData extends { id: string | number }> = {
  queryKey: string[];
  fetchData: (
    pageData: PageDataModel
  ) => Promise<PaginatedResponseModel<TData>>;
  renderData: (data: TData) => React.ReactNode;
  className?: string;
  disabled?: boolean;
  loadOnEnd?: boolean;
};

// --- True Infinite Scroll Component ---
const InfiniteScroll = <TData extends { id: string | number }>({
  fetchData,
  renderData,
  queryKey,
  className = "",
  disabled = false,
  loadOnEnd = false,
}: InfiniteScrollProps<TData>) => {
  const { ref, inView } = useInView(); // Hook to observe when an element is in view
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchData({ page: pageParam }),
    initialPageParam: 1,
    enabled: !disabled,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get("page");
        return nextPage ? parseInt(nextPage, 10) : undefined;
      }
      return undefined;
    },
  });

  // When the observer element (`ref`) comes into view, fetch the next page.
  useEffect(() => {
    if (loadOnEnd && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [loadOnEnd, inView, hasNextPage, isFetchingNextPage, fetchNextPage, data]);

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
            Nenhum dado encontrado.
          </p>
        )}
      </div>

      {/* This invisible div at the bottom will trigger the next fetch */}
      <div ref={ref} className="h-1" />

      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      {!loadOnEnd && hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className={`
              px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
              ${
                !hasNextPage || isFetchingNextPage
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg"
              }
              flex items-center justify-center
            `}
          >
            {isFetchingNextPage ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Carregando mais...
              </>
            ) : (
              "Carregar mais dados"
            )}
          </button>
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

export default InfiniteScroll;
