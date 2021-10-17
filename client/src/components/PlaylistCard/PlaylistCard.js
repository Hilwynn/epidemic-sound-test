import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./PlaylistCard.module.scss";

function PlaylistCard({ playlist }) {
  return (
    <li
      className={classNames(styles.playlistCard, {
        [styles.placeholder]: !playlist?.tracks[0]?.cover_art
      })}
      style={
        playlist?.tracks[0]?.cover_art && {
          "--background-img-url": `url("${playlist?.tracks[0]?.cover_art}")`
        }
      }
    >
      <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
    </li>
  );
}

export default PlaylistCard;
