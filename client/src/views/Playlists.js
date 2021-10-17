import PlaylistCard from "../components/PlaylistCard/PlaylistCard";
import PlaylistForm from "../components/PlaylistForm/PlaylistForm";
import { usePlaylists } from "../context/playlistContext";
import AddSVG from "../components/Icons/AddSVG";
import styles from "./Playlists.module.scss";

function Playlists() {
  const {
    state: { playlists = [] },
    createPlaylist
  } = usePlaylists();

  return (
    <div aria-live="polite" aria-busy={!playlists.length > 0}>
      <div className={styles.header}>
        <h2>Playlists</h2>
        <PlaylistForm
          heading="New playlist"
          icon={AddSVG}
          handler={createPlaylist}
          label="Name"
        />
      </div>

      <ul className={styles.playlistWrapper}>
        {playlists.length
          ? playlists.map(playlist => (
              <PlaylistCard playlist={playlist} key={playlist.id} />
            ))
          : null}
      </ul>
    </div>
  );
}

export default Playlists;
