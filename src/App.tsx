import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { ThemeProvider } from "./providers/theme.provider";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
