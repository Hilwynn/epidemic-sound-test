import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import uuid from "react-uuid";

const PlaylistContext = createContext();
const localStorage = window.localStorage;

function playlistReducer(state, action) {
  const updateLocalStorage = data => {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem("playlists", stringifiedData);
  };

  switch (action.type) {
    case "createPlaylist": {
      const newPlaylist = {
        title: action.payload.title,
        id: uuid(),
        tracks: []
      };

      const updatedList = !state?.playlists?.length
        ? [newPlaylist]
        : [...state.playlists, newPlaylist];

      updateLocalStorage(updatedList);
      return { playlists: updatedList };
    }
    case "renamePlaylist": {
      const updatedList = state?.playlists.map(playlist => {
        return playlist.id === action.payload.playlistId
          ? {
              ...playlist,
              title: action.payload.title
            }
          : playlist;
      });

      updateLocalStorage(updatedList);
      return { playlists: updatedList };
    }
    case "deletePlaylist": {
      const updatedList = state.playlists.filter(
        playlist => playlist.id !== action.payload.playlistId
      );

      updateLocalStorage(updatedList);
      return { playlists: updatedList };
    }
    case "setPlaylists": {
      return { playlists: action.payload };
    }
    case "addTrackToPlaylist": {
      const updatedList = state?.playlists.map(playlist => {
        return playlist.id === action.payload.playlistId
          ? {
              ...playlist,
              tracks: [...playlist.tracks, action.payload.track]
            }
          : playlist;
      });

      updateLocalStorage(updatedList);
      return { playlists: updatedList };
    }
    case "removeTrackFromPlaylist": {
      const playlistId = action.payload.playlistId;
      const updatedList = state?.playlists.map(playlist => {
        return playlist.id === playlistId
          ? {
              ...playlist,
              tracks: [
                ...playlist.tracks.filter(
                  track => track.id !== action.payload.track.id
                )
              ]
            }
          : playlist;
      });

      updateLocalStorage(updatedList);
      return { playlists: updatedList };
    }
    case "changeTrackOrder": {
      return { count: state.count + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PlaylistContextProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, { playlists: [] });
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [shuffle, setShuffle] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("playlists");
    if (!data) {
      return;
    }

    dispatch({ type: "setPlaylists", payload: JSON.parse(data) });
  }, []);

  useEffect(() => {
    if (!shuffle) {
      setShuffledPlaylist(null);
    }
  }, [shuffle]);

  const createPlaylist = title =>
    dispatch({ type: "createPlaylist", payload: { title } });

  const renamePlaylist = (playlistId, title) =>
    dispatch({ type: "renamePlaylist", payload: { playlistId, title } });

  const deletePlaylist = playlistId =>
    dispatch({ type: "deletePlaylist", payload: { playlistId } });

  const getPlaylist = playlistId =>
    state.playlists?.find(playlist => playlist.id === playlistId);

  const addTrackToPlaylist = (track, playlistId) =>
    dispatch({ type: "addTrackToPlaylist", payload: { track, playlistId } });

  const removeTrackFromPlaylist = (track, playlistId) =>
    dispatch({
      type: "removeTrackFromPlaylist",
      payload: { track, playlistId }
    });

  const toggleShuffle = async () => {
    setShuffle(oldState => !oldState);
  };

  const value = {
    state,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    getPlaylist,
    currentPlaylist,
    setCurrentPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    shuffle,
    toggleShuffle,
    shuffledPlaylist,
    setShuffledPlaylist
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContextProvider;

export function usePlaylists() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylists must be used within a Provider");
  }
  return context;
}
