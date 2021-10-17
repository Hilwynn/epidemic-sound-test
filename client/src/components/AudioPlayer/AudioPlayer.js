import { useRef, useState } from "react";
import Player from "react-h5-audio-player";
import { usePlaylists } from "../../context/playlistContext";
import { useTracks } from "../../context/trackContext";
import { shuffleList } from "../../utils/array";
import customIcons from "./customIcons";
import GradientLogoSVG from "../Icons/GradientLogoSVG";
import RepeatOneSVG from "../Icons/RepeatOneSVG";
import ShuffleSVG from "../Icons/ShuffleSVG";
import "./AudioPlayer.scss";
import styles from "./AudioPlayer.module.scss";

function AudioPlayer() {
  const audioPlayerRef = useRef(null);
  const { currentTrack, setCurrentTrack } = useTracks();
  const [repeatTrack, setRepeatTrack] = useState(false);
  const {
    currentPlaylist,
    shufflePlaylist,
    toggleShuffle,
    shuffledPlaylist,
    setShuffledPlaylist
  } = usePlaylists();

  const getCurrentTrackIndex = (playlist, currentTrackId) => {
    return playlist.findIndex(track => track.id === currentTrackId);
  };

  const handleNextTrack = () => {
    const playlist = shuffledPlaylist || currentPlaylist.tracks;
    if (currentTrack && playlist?.length > 1) {
      const currentTrackIndex = getCurrentTrackIndex(playlist, currentTrack.id);

      if (currentTrackIndex < playlist.length - 1) {
        setCurrentTrack(playlist[currentTrackIndex + 1]);
      }
    }
  };

  const handlePreviousTrack = () => {
    const playlist = shuffledPlaylist || currentPlaylist.tracks;
    if (currentTrack && playlist?.length > 1) {
      const currentTrackIndex = getCurrentTrackIndex(playlist, currentTrack.id);

      if (currentTrackIndex - 1 >= 0) {
        setCurrentTrack(playlist[currentTrackIndex - 1]);
      }
    }
  };

  const handleRepeat = () => {
    const audioPlayer = audioPlayerRef.current.audio.current;
    if (!repeatTrack) {
      audioPlayer.setAttribute("loop", "");
    } else {
      audioPlayer.removeAttribute("loop");
    }
    setRepeatTrack(oldState => !oldState);
  };

  const handleShuffle = () => {
    if (!shufflePlaylist && currentPlaylist?.tracks?.length > 1) {
      const shuffledList = shuffleList(currentPlaylist.tracks);

      if (currentTrack) {
        const filteredList = shuffledList.filter(
          track => track.id !== currentTrack.id
        );
        setShuffledPlaylist([currentTrack, ...filteredList]);
      } else {
        setShuffledPlaylist(shuffledList);
      }
    }

    toggleShuffle();
  };

  const RepeatButton = () => (
    <button
      className="rhap_button-clear rhap_repeat-button"
      aria-label={repeatTrack ? "Disable Repeat Track" : "Enable Repeat Track"}
      onClick={handleRepeat}
    >
      <RepeatOneSVG />
    </button>
  );

  const ShuffleButton = () => (
    <button
      className="rhap_button-clear rhap_shuffle-button"
      aria-label={shufflePlaylist ? "Disable Shuffle" : "Enable Shuffle"}
      onClick={handleShuffle}
    >
      <ShuffleSVG />
    </button>
  );

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
          ref={audioPlayerRef}
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
          customAdditionalControls={[<RepeatButton />, <ShuffleButton />]}
        />
      </div>
    </>
  );
}

export default AudioPlayer;
