import TrackRow from "../components/TrackRow/TrackRow";
import { useTracks } from "../context/trackContext";

function Tracks() {
  const { tracks } = useTracks();
  return (
    <div aria-live="polite" aria-busy={!tracks}>
      <h2>Tracks</h2>
      <ul>
        {tracks.map(track => (
          <TrackRow key={track.id} track={track} />
        ))}
      </ul>
    </div>
  );
}

export default Tracks;
