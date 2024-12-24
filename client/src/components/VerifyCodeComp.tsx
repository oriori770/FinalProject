import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { verfiyUser } from "../store/slices/authSlice";
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
interface statusprops {
  statusFanc: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyCodeComp: React.FC<statusprops> = ({ statusFanc }: statusprops) => {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, userEmail } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(verfiyUser({ email: userEmail, code })).unwrap();
    statusFanc(false);
    navigate("/FindThreats");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        marginTop: 40,
        width: { xs: "80%", sm: "50%" }, // Responsive width for mobile
        padding: 8,
        borderColor: "primary.main",
        bgcolor: "grey.900",
        color: "text.primary",
        height: "auto", // Allow content to adjust based on screen size
        p: 2,
        border: 2,
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Verify Code
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", textAlign: "center", marginTop: 2 }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="code"
          type={showCode ? "text" : "password"}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCode((prev) => !prev)}>
                  {showCode ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          send code
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyCodeComp;
