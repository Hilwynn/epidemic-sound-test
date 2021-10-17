import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import classNames from "classnames";
import { usePlaylists } from "../../context/playlistContext";
import AddToPlaylistSVG from "../Icons/AddToPlaylistSVG";
import "@reach/menu-button/styles.css";
import buttonStyles from "../Button/Button.module.scss";
import styles from "./PlaylistMenu.module.scss";

function PlaylistMenu({ track }) {
  const { state, addTrackToPlaylist } = usePlaylists();

  return (
    <Menu>
      <MenuButton
        className={classNames(buttonStyles.button, buttonStyles.square)}
      >
        <span className="visually-hidden">Add to playlist</span>
        <AddToPlaylistSVG aria-hidden />
      </MenuButton>
      <MenuList className={styles.list}>
        <MenuItem onSelect={() => alert("New playlist")}>
          Add to new playlist
        </MenuItem>
        {state.playlists.map(playlist => (
          <MenuItem
            key={playlist.id}
            onSelect={() => addTrackToPlaylist(track, playlist.id)}
          >
            {playlist.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default PlaylistMenu;
