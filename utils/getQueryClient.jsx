// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";

// cache() is scoped per request, so we don't leak data between requests
const getQueryClient = () =>
  new QueryClient({
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  });
export default getQueryClient;
