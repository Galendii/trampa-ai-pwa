"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

type InfiniteScrollProps = {
  fetchData: (pageData: any) => Promise<any>;

  renderData: (data: any) => React.ReactNode;
  querykey: string;
};

// --- Infinite Query Component ---
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchData,
  renderData,
  querykey,
}) => {
  // useInfiniteQuery hook to manage fetching paginated data
  const {
    data, // Contains the fetched data, structured by pages
    fetchNextPage, // Function to fetch the next page
    hasNextPage, // Boolean indicating if there's a next page to fetch
    isFetchingNextPage, // Boolean indicating if the next page is currently being fetched
    isLoading, // Boolean indicating if the initial data is loading
    isError, // Boolean indicating if an error occurred
    error, // Error object if isError is true
  } = useInfiniteQuery({
    queryKey: [querykey], // Unique key for this infinite query
    // queryFn now directly uses the fetchData prop, which will be your getClients function
    queryFn: ({ pageParam = 1 }) => fetchData({ page: pageParam }),
    refetchOnReconnect: true,

    initialPageParam: 1, // The initial page number to start fetching from
    getNextPageParam: (lastPage) => {
      // If 'lastPage.next' exists, extract the page number from its URL
      if (lastPage.next) {
        const regex = /[?&]page=(\d+)/;
        const match = lastPage.next.match(regex);
        // Return the parsed page number, or undefined if not found/no more pages
        return match ? parseInt(match[1], 10) : undefined;
      }
      // If 'lastPage.next' is null, there are no more pages
      return undefined;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg shadow-md p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Carregando...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Erro!</strong>
        <span className="block sm:inline ml-2">
          Falha ao carregar os dados: {error?.message}
        </span>
      </div>
    );
  }

  // Flatten the data from all pages into a single array for rendering
  const allData = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg font-inter">
      {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Our Projects
      </h2> */}

      <div className="space-y-4">
        {allData.length > 0 ? (
          allData.map((data) => renderData(data))
        ) : (
          <p className="text-center text-gray-600 text-lg py-8">
            Dados não encontrados.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
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
          Não há mais dados para carregar.
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;
