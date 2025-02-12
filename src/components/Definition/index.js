import { Stack, Typography, Box, Button, IconButton, Divider, CircularProgress, useTheme } from "@material-ui/core";
import { ArrowBack as BackIcon, PlayArrow as PlayIcon } from "@material-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

const Definition = () => {

  const { word } = useParams();   // This hook returns the word, from the url of the page, searched by the user
  const history = useHistory();
  const [definitions, setDefinitions] = useState([]);
  const [exist, setExist] = useState(true);
  const [audio, setAudio] = useState(null);
  const theme = useTheme();

  useEffect(() => {

    const fetchDefinition = async () => {
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        setDefinitions(response.data);
        const phonetics = response.data[0].phonetics;
        if(!phonetics.length) return;
        const url = phonetics[0].audio.replace("//ssl", "https://ssl");
        setAudio(new Audio(url));
        //console.log(response.data);
      } catch(err) {
        setExist(false);
      }
    }
    
    fetchDefinition()
  }, [word]);

  if(!exist) {
    return(
      <Box sx={{ ...theme.mixins.alignAtTheCenter }}>
        <Typography>Word not found</Typography>
        <Button variant="contained" sx={{ textTransform: "capitalize", mt: 2 }} onClick={history.goBack}>
          Go back
        </Button>
      </Box>
    )
  }

  if(!definitions.length) {
    return(
    <Box sx={{ ...theme.mixins.alignAtTheCenter }}>
      <CircularProgress />
    </Box>
  )
}

return(
    <>
      <Stack direction="row" justifyContent="space-between">
        <IconButton onClick={history.goBack}> {/* Clicking this button the user migrates back to the home page */}
          <BackIcon sx={{ color: "black"}} />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
        mt: 3,
        background: "#7B3F00",
        boxShadow: "0px 10px 20px rgba(19, 23, 71, 0.25)",
        px: 4,
        py: 5,
        color: "white",
        borderRadius: 2,
      }}>
        <Typography sx={{ textTransform: "capitalize "}} variant="h5">{ word }</Typography>
        {audio && <IconButton onClick={() => audio.play()} sx={{ // If only the audio is available then only we will display the audio button
          borderRadius: 2,
          p: 1,
          color: "#FFF",
          background: theme => theme.palette.pink,
        }}><PlayIcon /></IconButton>}
      </Stack>

      {definitions.map((x, index) =>
        <Fragment key={index}>
          <Divider sx={{
            display: index === 0 ? "none" : "block",
            my: 3
          }}/>
          {x.meanings.map(y =>
            <Box key={Math.random()} sx={{
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#C19A6B",
              p: 2,
              borderRadius: 2,
              mt: 3
            }}>
              <Typography sx={{ textTransform: "capitalize" }} color="black" variant="subtitle1">
                {y.partOfSpeech}
              </Typography>
              {y.definitions.map((z, i) =>
                <Typography sx={{ my: 1 }} style={{ fontWeight: 500 }} variant="body2" key={z.definition}>
                  <em>{y.definitions.length > 1 && `${i + 1}. `}{z.definition}</em>
                </Typography>
              )}
            </Box>
          )}
        </Fragment>
      )}
    </>
  )
}

export default Definition;
