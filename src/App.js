import { ThemeProvider, CssBaseline, Grid } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import theme from "./theme";
import Home from "./components/Home";
import Definition from "./components/Definition";

const App = () => {

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sx={{ p: 2 }}>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search/:word">
          <Definition />
        </Route>
      </Router>
      </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App;
