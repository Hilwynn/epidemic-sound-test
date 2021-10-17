import PlaylistMenu from "../PlaylistMenu/PlaylistMenu";
import IconButton from "../Button/IconButton";
import { useTracks } from "../../context/trackContext";
import { usePlaylists } from "../../context/playlistContext";
import { shuffleList } from "../../utils/array";
import PlaySVG from "../Icons/PlaySVG";
import RemoveSVG from "../Icons/RemoveSVG";
import styles from "./TrackRow.module.scss";

function TrackRow({ track, playlist }) {
  const { setCurrentTrack } = useTracks();
  const {
    removeTrackFromPlaylist,
    setCurrentPlaylist,
    setShuffledPlaylist,
    shufflePlaylist
  } = usePlaylists();

  const handlePlay = () => {
    setCurrentTrack(track);
    if (playlist) {
      setCurrentPlaylist(playlist);

      if (shufflePlaylist) {
        const shuffledList = shuffleList(playlist.tracks).filter(
          playlistTrack => playlistTrack.id !== track.id
        );

        setShuffledPlaylist([track, ...shuffledList]);
      }
    } else {
      setCurrentPlaylist({});
      setShuffledPlaylist(null);
    }
  };

  return (
    <li className={styles.trackRow} aria-labelledby="track-info">
      <IconButton
        icon={PlaySVG}
        label="Play"
        onClick={handlePlay}
        shape="round"
        className={styles.trackPlay}
      />
      <div id="track-info" className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
      </div>
      <div className={styles.playlistControls}>
        {playlist ? (
          <IconButton
            icon={RemoveSVG}
            label="Remove track from playlist"
            onClick={() => removeTrackFromPlaylist(track, playlist.id)}
          />
        ) : (
          <PlaylistMenu track={track} />
        )}
      </div>
      <img
        src={track.cover_art}
        alt="Album cover"
        className={styles.trackCover}
        height="128px"
        width="128px"
      />
    </li>
  );
}

export default TrackRow;
