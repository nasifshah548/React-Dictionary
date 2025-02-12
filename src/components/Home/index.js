import { Box, Typography, FilledInput, useTheme } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Home = () => {

  const [word, setWord] = useState("");
  const history = useHistory();
  const theme = useTheme();

  const handleSubmit = event => {
    event.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if(!trimmedWord || trimmedWord.split(" ").length > 1) return; // The button will not work if the user enters more than 1 word
    history.push(`/search/${word}`);  // Migrating the user to the definition component page after the user clicks submit
  }

  return(
    <Box sx={{ ...theme.mixins.alignAtTheCenter }}>
      <img src="/assets/dictionary.png" alt="Dictionary" width="200" height="200"/>
      <Typography
        sx={{ mt: 3, mb: 1 }} variant="h4" color="#7B3F00">Dictionary</Typography>
      <Typography color="black">Find the meanings of your words!</Typography>
      <Box sx={{ width: "360px" }}>
        <form onSubmit={handleSubmit}>
          <FilledInput
            value={word}
            onChange={event => setWord(event.target.value)}
            disableUnderline
            placeholder="Search word"
            sx={{
              my: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
              "& .MuiFilledInput-input": {
                    p: 2,
              }
            }}
            startAdornment={<SearchIcon color="disabled" />}
            fullWidth
          />
        </form>
      </Box>
     <MenuBookIcon fontSize="large" />
    </Box>
  )
}

export default Home;
