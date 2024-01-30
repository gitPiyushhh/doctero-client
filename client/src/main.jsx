import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SocketProvider } from "./contexts/SocketProvider.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 60 * 1000,
  },
});

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </SocketProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
