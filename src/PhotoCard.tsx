import type { GalleryPhoto } from "./photos";
import { formatDate } from "./format";

export default function PhotoCard({ photo, onOpen }: { photo: GalleryPhoto; onOpen: () => void }) {
  return (
    <button className="video video--photo" type="button" onClick={onOpen}>
      <span className="video__thumb">
        <img src={photo.srcSet?.[0].src ?? photo.src} alt={photo.alt} loading="lazy" />
      </span>
      <span className="video__title">{photo.title}</span>
      <span className="video__date">{formatDate(photo.date)}</span>
    </button>
  );
}
