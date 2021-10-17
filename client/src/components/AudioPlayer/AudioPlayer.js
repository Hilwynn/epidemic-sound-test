import Player, { RHAP_UI } from "react-h5-audio-player";
import { usePlaylists } from "../../context/playlistContext";
import { useTracks } from "../../context/trackContext";
import { shuffleList } from "../../utils/array";
import customIcons from "./customIcons";
import GradientLogoSVG from "../Icons/GradientLogoSVG";
import ShuffleSVG from "../Icons/ShuffleSVG";
import "./AudioPlayer.scss";
import styles from "./AudioPlayer.module.scss";

function AudioPlayer() {
  const { currentTrack, setCurrentTrack } = useTracks();
  const {
    currentPlaylist,
    shuffle,
    toggleShuffle,
    shuffledPlaylist,
    setShuffledPlaylist
  } = usePlaylists();

  const getCurrentTrackIndex = playlist =>
    playlist.findIndex(track => track.id === currentTrack.id);

  const handleNextTrack = () => {
    const playlist = shuffledPlaylist || currentPlaylist.tracks;
    if (currentTrack && playlist.length > 1) {
      const currentTrackIndex = getCurrentTrackIndex(playlist);
      if (currentTrackIndex < playlist.length - 1) {
        console.log("currentTrackIndex NEXT", currentTrackIndex);
        setCurrentTrack(playlist[currentTrackIndex + 1]);
      }
    }
  };

  const handlePreviousTrack = () => {
    const playlist = shuffledPlaylist || currentPlaylist.tracks;
    if (currentTrack && playlist.length > 1) {
      const currentTrackIndex = getCurrentTrackIndex(playlist);
      if (currentTrackIndex - 1 >= 0) {
        console.log("currentTrackIndex PREV", currentTrackIndex);
        setCurrentTrack(playlist[currentTrackIndex - 1]);
      }
    }
  };

  const handleShuffle = () => {
    if (!shuffle && currentPlaylist?.tracks?.length > 1) {
      const shuffledList = shuffleList(currentPlaylist.tracks).filter(
        track => track.id !== currentTrack.id
      );
      setShuffledPlaylist([currentTrack, ...shuffledList]);
    }

    toggleShuffle();
  };

  console.log("SHUFFLE IS ON: ", shuffle);
  console.log("shuffled: ", shuffledPlaylist);
  console.log("currentPlaylist: ", currentPlaylist);

  return (
    <>
      <div className={styles.audioPlayer}>
        {currentTrack?.cover_art ? (
          <img
            src={currentTrack.cover_art}
            alt="Album cover"
            className={styles.trackCover}
            height="128px"
            width="128px"
          />
        ) : (
          <div className={styles.trackCover}>
            <GradientLogoSVG aria-hidden />
          </div>
        )}
        <div className={styles.trackInfo}>
          <p className={styles.trackTitle}>{currentTrack?.title}</p>
          <p className={styles.trackArtist}>
            {currentTrack?.main_artists.join(", ")}
          </p>
        </div>
        <Player
          src={currentTrack?.audio}
          loop="false"
          onClickPrevious={handlePreviousTrack}
          onClickNext={handleNextTrack}
          showSkipControls={true}
          showFilledVolume={true}
          defaultCurrentTime={
            <div className="rhap_time rhap_current-time" aria-hidden>
              --:--
            </div>
          }
          defaultDuration={
            <div className="rhap_time rhap_total-time" aria-hidden>
              --:--
            </div>
          }
          className={styles.player}
          customIcons={customIcons}
          customAdditionalControls={[
            RHAP_UI.LOOP,
            <button
              className="rhap_button-clear rhap_shuffle-button"
              aria-label={shuffle ? "Disable Shuffle" : "Enable Shuffle"}
              onClick={handleShuffle}
            >
              <ShuffleSVG />
            </button>
          ]}
        />
      </div>
    </>
  );
}

export default AudioPlayer;
