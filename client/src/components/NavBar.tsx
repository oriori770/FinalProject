import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";



const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "color 1.5s ease", // מעבר חלק של צבע
          "&:hover": {
            color: "#00ffff", // צבע כחול זורח
          },
        },
      },
    },
  },
});

const NavBar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            top: 0,
            zIndex: 1100,
            padding: 1,
            backgroundColor: "#1d1d1d",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              minHeight: 56,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                margin: "0 auto",
              }}
            >
              <Button
              onClick={()=>navigate("/1/a")}
                color="inherit"
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                1/a
              </Button>
              <Button
                onClick={()=>navigate("/2/b")}
                color="inherit"
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                2/b
              </Button>
              <Button
                color="inherit"
                onClick={()=>navigate("/3/b")}
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                3/b
              </Button>
              <Button
                color="inherit"
                onClick={()=>navigate("/4/bi")}
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                4/bi
              </Button>
              <Button
                color="inherit"
                onClick={()=>navigate("/4/bii")}
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                4/bii
              </Button>
              <Button
                color="inherit"
                onClick={()=>navigate("/5/b")}
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                5/b
              </Button>
              <Button
                color="inherit"
                onClick={()=>navigate("/6/b")}
                sx={{
                  fontSize: 16,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                6/b
              </Button>
            </Box>
          </Toolbar>
        
        </AppBar>
        

        <Toolbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
          }}
        >
          {children}
        </Box>

        <Box
          component="footer"
          sx={{
            color: (theme) => theme.palette.text.primary,
            textAlign: "center",
            fontSize: 12,
            py: 2,
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center" }}>&copy; {new Date().getFullYear()} All Rights Reserved.</div>
          <div>
            Follow us on{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#90caf9" }}
            >
              Twitter
            </a>
            ,{" "}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#90caf9" }}
            >
              Facebook
            </a>
            , and{" "}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#90caf9" }}
            >
              Instagram
            </a>
            .
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
