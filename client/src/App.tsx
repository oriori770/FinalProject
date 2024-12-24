import { RouterProvider } from "react-router-dom";
import router from "./Router/BrowserRouter";
import { ThemeProvider } from '@mui/material';
import theme from './theme'; 

import './App.css'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
