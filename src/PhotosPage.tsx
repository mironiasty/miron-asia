import { useState } from "react";

import PhotoCard from "./PhotoCard";
import PhotoLightbox from "./PhotoLightbox";
import { latestPhotos } from "./photos";

export default function PhotosPage() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <main>
        <a className="section-heading__link" href="/">
          ← Strona główna
        </a>
        <div className="section-heading page-heading">
          <h2>Wszystkie zdjęcia</h2>
          <span className="section-heading__count">{latestPhotos.length} zdjęć</span>
        </div>

        <div className="photo-list">
          {latestPhotos.map((photo, i) => (
            <PhotoCard key={photo.src} photo={photo} onOpen={() => setIndex(i)} />
          ))}
        </div>
      </main>

      <PhotoLightbox slides={latestPhotos} index={index} close={() => setIndex(-1)} />
    </>
  );
}
