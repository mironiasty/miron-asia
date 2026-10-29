import { useEffect, useState } from "react";

import hero from "./assets/jamnikflamia.jpg";
import blaskIcon from "./assets/projects/blask.png";
import liftradarLogo from "./assets/projects/liftradar.svg";
import PhotoCard from "./PhotoCard";
import PhotoLightbox from "./PhotoLightbox";
import { latestPhotos } from "./photos";
import { formatDate } from "./format";
import { useScroller } from "./useScroller";
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
    icon: <img src={liftradarLogo} alt="" />,
    description: "Warunki śniegowe w alpejskich ośrodkach: pokrywa śnieżna, otwarte wyciągi i trasy, aktualizowane dwa razy dziennie.",
  },
];

const skiGraphs = [
  { href: "skigraphs/ski/", name: "Mapa cieplna", description: "Gdzie i jak często jeździłem, kolorowane liczbą dni albo prędkością, z widokiem 3D na teren." },
  { href: "skigraphs/gpu/", name: "Duchy", tag: "WebGPU", description: "Wszystkie dni na nartach odtworzone naraz według pory dnia, jako świecące duchy ze smugami." },
  { href: "skigraphs/gpu/race.html", name: "Wyścig", tag: "WebGPU", description: "Każdy zjazd w historii, wszystkie ruszają w tej samej chwili." },
  { href: "skigraphs/gpu/flow.html", name: "Przepływ", tag: "WebGPU", description: "Cząsteczki śniegu płynące tak, jak zwykle jeździ się po trasach." },
  { href: "skigraphs/gpu/ribbons.html", name: "Wstęgi", tag: "WebGPU", description: "Zjazdy jako świecące ściany nad trójwymiarowym terenem: im szybciej, tym wyżej." },
  { href: "skigraphs/gpu/dna.html", name: "DNA narciarza", tag: "WebGPU", description: "Każdy dzień jako grzbiet wysokości w czasie, ułożone w pasmo górskie." },
];

type SkiSummary = { days: number; seasons: unknown[]; run_km: number; vertical_km: number };

const toSkiStats = (summary: SkiSummary) => [
  { value: summary.days, label: "dni na nartach" },
  { value: summary.seasons.length, label: "sezonów" },
  { value: summary.run_km.toLocaleString("pl-PL"), label: "km zjazdów" },
  { value: summary.vertical_km.toLocaleString("pl-PL"), label: "km w pionie" },
];

export default function App() {
  const [index, setIndex] = useState(-1);
  const [skiStats, setSkiStats] = useState<ReturnType<typeof toSkiStats>>([]);

  // loaded at runtime: /skigraphs is served as static files, it can't be imported as a module in dev
  useEffect(() => {
    fetch("skigraphs/ski/data/summary.json")
      .then((response) => response.json())
      .then((summary: SkiSummary) => setSkiStats(toSkiStats(summary)))
      .catch(() => {});
  }, []);

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

        <Gallery onOpen={setIndex} />

        <section className="section section--projects">
          <div className="section-heading">
            <h2>Wykresy narciarskie</h2>
          </div>
          <p className="skigraphs__lead">
            Sezony jazdy w Austrii narysowane z danych GPS z zegarka sportowego. Każdy zjazd, wjazd wyciągiem i dzień na stoku
            pokazany na sześć sposobów.
          </p>
          <dl className="skigraphs__stats">
            {skiStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
          <div className="projects projects--three">
            {skiGraphs.map((graph) => (
              <a key={graph.href} className="project" href={graph.href}>
                <span className="project__body">
                  <span className="project__name">
                    {graph.name}
                    {graph.tag && <span className="project__tag">{graph.tag}</span>}
                  </span>
                  <span className="project__description">{graph.description}</span>
                </span>
              </a>
            ))}
          </div>
          <p className="skigraphs__note">
            Widoki WebGPU wymagają aktualnej przeglądarki Chrome, Edge albo Safari. Dat celowo nie podaję: widać tylko sezon.
          </p>
        </section>

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
        <span className="footer__brand">
          <img src="/favicon.svg" width="28" height="28" alt="" />
          <span>
            © {new Date().getFullYear()} <b>Pan Jamnik</b>
          </span>
        </span>
        <a className="footer__channel" href={YOUTUBE_URL} target="_blank" rel="noreferrer">
          <YouTubeIcon />
          @panjamnik
        </a>
      </footer>

      <PhotoLightbox slides={latestPhotos} index={index} close={() => setIndex(-1)} />
    </>
  );
}

function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  const { scroller, scroll } = useScroller();

  return (
    <section className="section">
      <div className="section-heading">
        <h2>Galeria</h2>
        <div className="section-heading__actions">
          <a className="section-heading__link" href="photos/">
            Wszystkie zdjęcia →
          </a>
          <button className="scroll-button" type="button" aria-label="Poprzednie zdjęcia" onClick={() => scroll(-1)}>
            ‹
          </button>
          <button className="scroll-button" type="button" aria-label="Następne zdjęcia" onClick={() => scroll(1)}>
            ›
          </button>
        </div>
      </div>

      <div className="videos" ref={scroller}>
        {latestPhotos.map((photo, i) => (
          <PhotoCard key={photo.src} photo={photo} onOpen={() => onOpen(i)} />
        ))}
      </div>
    </section>
  );
}

function Videos() {
  const { scroller, scroll } = useScroller();

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
