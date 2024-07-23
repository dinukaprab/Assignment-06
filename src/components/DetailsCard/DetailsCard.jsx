import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./DetailsCard.css";

const top100Films = [];

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "green",
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "green",
          },
        },
      },
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

const validateNic = (nic) => {
  let year, dayOfYear, gender;
  if (/^[0-9]{9}[VvXx]$/.test(nic)) {
    year = parseInt(nic.slice(0, 2)) + 1900;
    dayOfYear = parseInt(nic.slice(2, 5));
  } else if (/^[0-9]{12}$/.test(nic)) {
    year = parseInt(nic.slice(0, 4));
    dayOfYear = parseInt(nic.slice(4, 7));
  } else {
    throw new Error("Invalid NIC format");
  }

  gender = dayOfYear > 500 ? "Female" : "Male";
  const date = new Date(
    year,
    0,
    Math.abs(dayOfYear - (gender === "Female" ? 500 : 0))
  );
  return {
    nicNumber: nic,
    birthday: date.toISOString().split("T")[0],
    gender,
  };
};

export default function DetailsCard({ handleClose }) {
  const [nic, setNic] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);

  const handleSubmit = () => {
    try {
      const nicDetails = validateNic(nic);
      setDetails(nicDetails);
      setError("");
    } catch (err) {
      setError("Invalid NIC number");
      setDetails(null);
    }
  };

  return (
    <section>
      <div className="details-card">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 200, borderRadius: 3 }}
            image="/src/assets/hand-img.png"
          />
          <CloseIcon className="close-icon" onClick={handleClose} />
          <CardContent>
            <ThemeProvider theme={theme}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter NIC Number"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    error={!!error}
                    helperText={error}
                  />
                )}
              />
            </ThemeProvider>

            <Typography gutterBottom variant="h5" component="div">
              <div className="sub-btn">
                <ColorButton variant="contained" onClick={handleSubmit}>
                  <span className="sub-text">Submit</span>
                </ColorButton>
              </div>
            </Typography>

            {details && (
              <Typography variant="body2" color="text.secondary">
                <div className="text-fields">
                  <div className="details-text">
                    <h5>NIC No:</h5>
                    <h3>{details.nicNumber}</h3>
                  </div>
                </div>
                <div className="text-fields">
                  <div className="details-text">
                    <h5>Birthday:</h5>
                    <h3>{details.birthday}</h3>
                  </div>
                </div>
                <div className="text-fields">
                  <div className="details-text">
                    <h5>Gender:</h5>
                    <h3>{details.gender}</h3>
                  </div>
                </div>
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
