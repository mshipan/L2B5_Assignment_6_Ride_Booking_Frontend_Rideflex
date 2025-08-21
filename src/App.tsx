import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { ThemeProvider } from "./providers/theme.provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
