import { useRef, useState } from "react";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import optional lightbox plugins
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import hero from "./assets/jamnikflamia.jpg";
import blaskIcon from "./assets/projects/blask.png";
import photos from "./photos";
import videos from "./videos.json";

const YOUTUBE_URL = "https://www.youtube.com/@panjamnik";

const projects = [
  {
    name: "Blask Sync",
    url: "https://blask.miron.asia",
    image: blaskIcon,
    description: "Darmowa aplikacja na Maca, która synchronizuje światła Philips Hue z obrazem na ekranie albo z muzyką.",
  },
  {
    name: "LiftRadar.eu",
    url: "https://liftradar.eu",
    icon: "❄️",
    description: "Warunki śniegowe w alpejskich ośrodkach: pokrywa śnieżna, otwarte wyciągi i trasy, aktualizowane dwa razy dziennie.",
  },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

export default function App() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <header className="hero" style={{ backgroundImage: `url(${hero})` }}>
        <div className="hero__content">
          <p className="hero__eyebrow">Zima jest piękna</p>
          <h1 className="hero__title">
            <img className="hero__logo" src="/favicon.svg" alt="" />
            Miron Szuka Śniegu
          </h1>
          <a className="button" href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            <YouTubeIcon />
            Obejrzyj na YouTube
          </a>
        </div>
      </header>

      <main>
        {videos.length > 0 && <Videos />}

        <div className="section-heading">
          <h2>Galeria</h2>
          <span className="section-heading__count">{photos.length} zdjęć</span>
        </div>

        <MasonryPhotoAlbum
          photos={photos}
          spacing={(width) => (width < 600 ? 12 : 20)}
          columns={(width) => (width < 500 ? 1 : width < 900 ? 2 : 3)}
          onClick={({ index }) => setIndex(index)}
          render={{
            extras: (_, { photo }) => (
              <span className="photo-caption">
                <span className="photo-caption__title">{photo.title}</span>
                <span className="photo-caption__date">{formatDate(photo.date)}</span>
              </span>
            ),
          }}
        />

        <section className="section section--projects">
          <div className="section-heading">
            <h2>Moje projekty</h2>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <a key={project.url} className="project" href={project.url} target="_blank" rel="noreferrer">
                {project.image ? (
                  <img className="project__image" src={project.image} alt="" />
                ) : (
                  <span className="project__icon" aria-hidden="true">
                    {project.icon}
                  </span>
                )}
                <span className="project__body">
                  <span className="project__name">{project.name}</span>
                  <span className="project__description">{project.description}</span>
                  <span className="project__url">{new URL(project.url).host} →</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Pan Jamnik</span>
        <a href={YOUTUBE_URL} target="_blank" rel="noreferrer">
          youtube.com/@panjamnik
        </a>
      </footer>

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}

function Videos() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const element = scroller.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="section">
      <div className="section-heading">
        <h2>Najnowsze filmy</h2>
        <div className="section-heading__actions">
          <a className="section-heading__link" href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            Wszystkie filmy →
          </a>
          <button className="scroll-button" type="button" aria-label="Poprzednie filmy" onClick={() => scroll(-1)}>
            ‹
          </button>
          <button className="scroll-button" type="button" aria-label="Następne filmy" onClick={() => scroll(1)}>
            ›
          </button>
        </div>
      </div>

      <div className="videos" ref={scroller}>
        {videos.map((video) => (
          <a key={video.id} className="video" href={video.url} target="_blank" rel="noreferrer">
            <span className="video__thumb">
              <img src={video.thumbnail} alt="" loading="lazy" />
              <span className="video__play">
                <YouTubeIcon />
              </span>
            </span>
            <span className="video__title">{video.title}</span>
            <span className="video__date">{formatDate(video.published)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
      />
    </svg>
  );
}
