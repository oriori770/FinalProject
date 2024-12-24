import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";

const RegisterComp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, password, email }) as any);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '70vh',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      }}
    >
          <Typography
            variant="h5"
            sx={{
              color: 'lightblue',
              textAlign: 'center',
              // marginBottom: 1,
              margin: '10px',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              position: 'absolute',
              top: '13vh',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            AI Data Analytical Platform
          </Typography>
      <Box
        sx={{
          minWidth:'50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'grey.900',
          color: 'text.primary',
          border: 2,
          borderRadius: '8px',
          padding: { xs: 1, sm: 2, md: 3 },
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          margin:'10px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            width: "100%", 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 1, fontSize: '1.1rem' }}>
            Register
          </Typography>

          {error && <Typography color="error" sx={{ mb: 1, fontSize: '0.9rem' }}>{error}</Typography>}

          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
              mb: 0.5,
              input: { 
                color: "#fff", 
                fontSize: { xs: '0.9rem', sm: '1rem' } 
              },
              label: { color: "#aaa", fontSize: '0.9rem' },
            }}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
              mb: 0.5,
              input: { 
                color: "#fff", 
                fontSize: { xs: '0.9rem', sm: '1rem' } 
              },
              label: { color: "#aaa", fontSize: '0.9rem' },
            }}
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
              mb: 0.5,
              input: { 
                color: "#fff", 
                fontSize: { xs: '0.9rem', sm: '1rem' } 
              },
              label: { color: "#aaa", fontSize: '0.9rem' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    size="small"
                    sx={{ color: "#aaa" }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ 
              mt: 0.5, 
              mb: 1,
              fontSize: { xs: '0.9rem', sm: '1rem' } 
            }}
          >
            Register
          </Button>

          <Box 
            sx={{ 
              textAlign: "center", 
              marginTop: 0.5 
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#fff", 
                fontSize: { xs: '0.8rem', sm: '0.9rem' } 
              }}
            >
              Already have an account?{" "}
              <Typography 
                component="a"
                href="/login"
                sx={{
                  color: "lightblue",
                  textDecoration: "none",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease",
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  '&:hover': {
                    backgroundColor: 'rgba(173, 216, 230, 0.2)'
                  }
                }}
              >
                Login
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
  
};

export default RegisterComp;