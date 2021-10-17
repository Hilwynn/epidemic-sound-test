import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Playlists from "./views/Playlists";
import PlaylistDetails from "./views/PlaylistDetails";
import Tracks from "./views/Tracks";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Menu from "./components/Menu/Menu";
import TrackContextProvider from "./context/trackContext";
import PlaylistContextProvider from "./context/playlistContext";
import styles from "./App.module.scss";

function App() {
  return (
    <TrackContextProvider>
      <PlaylistContextProvider>
        <Router>
          <header>
            <Menu />
          </header>
          <main className={styles.main}>
            <Switch>
              <Route path="/" exact>
                <Tracks />
              </Route>
              <Route path="/playlists" exact>
                <Playlists />
              </Route>
              <Route path="/playlists/:id">
                <PlaylistDetails />
              </Route>
            </Switch>
            <AudioPlayer />
          </main>
        </Router>
      </PlaylistContextProvider>
    </TrackContextProvider>
  );
}

export default App;
