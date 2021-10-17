import TrackRow from "../components/TrackRow/TrackRow";
import { useTracks } from "../context/trackContext";

function Tracks() {
  const { tracks } = useTracks();
  return (
    <>
      <h2>Tracks</h2>
      <ul>
        {tracks.map(track => (
          <TrackRow key={track.id} track={track} />
        ))}
      </ul>
    </>
  );
}

export default Tracks;
