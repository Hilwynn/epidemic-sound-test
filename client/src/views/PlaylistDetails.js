import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import IconButton from "../components/Button/IconButton";
import PlaylistForm from "../components/PlaylistForm/PlaylistForm";
import TrackRow from "../components/TrackRow/TrackRow";
import { usePlaylists } from "../context/playlistContext";
import { useTracks } from "../context/trackContext";
import { shuffleList } from "../utils/array";
import EditSVG from "../components/Icons/EditSVG";
import DeleteSVG from "../components/Icons/DeleteSVG";
import PlaySVG from "../components/Icons/PlaySVG";
import styles from "./PlaylistDetails.module.scss";

function PlaylistDetails() {
  const [playlist, setPlaylist] = useState(null);
  const {
    getPlaylist,
    renamePlaylist,
    deletePlaylist,
    setCurrentPlaylist,
    shufflePlaylist,
    setShuffledPlaylist
  } = usePlaylists();
  const { setCurrentTrack } = useTracks();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const playlist = getPlaylist(id);
    if (playlist) {
      setPlaylist(playlist);
      setCurrentPlaylist(playlist);
    }
  }, [id, getPlaylist, setCurrentPlaylist]);

  const handlePlay = () => {
    setCurrentPlaylist(playlist);

    if (shufflePlaylist) {
      const shuffledList = shuffleList(playlist.tracks);

      setShuffledPlaylist(shuffledList);
      setCurrentTrack(shuffledList[0]);
    } else {
      setCurrentTrack(playlist.tracks[0]);
    }
  };

  const handleDelete = () => {
    deletePlaylist(playlist.id);
    history.push("/playlists");
  };

  return (
    <div aria-live="polite" aria-busy={!playlist}>
      {playlist && (
        <>
          <h2 className={styles.heading}>
            <div className={styles.pageTitle}>Playlist</div>
            <div className={styles.playlistTitle}>{playlist?.title}</div>
          </h2>
          <div className={styles.controls}>
            <IconButton
              onClick={handlePlay}
              label="Start playlist"
              icon={PlaySVG}
              shape="round"
              className={styles.playButton}
              disabled={playlist.tracks.length === 0}
            />
            <PlaylistForm
              heading="Edit playlist"
              icon={EditSVG}
              initialValue={playlist.title}
              handler={body => renamePlaylist(playlist.id, body)}
              label="Playlist name"
            />
            <IconButton
              onClick={handleDelete}
              label="Delete playlist"
              icon={DeleteSVG}
            />
          </div>
          <ul>
            {playlist?.tracks.map(track => (
              <TrackRow key={track.id} track={track} playlist={playlist} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PlaylistDetails;
