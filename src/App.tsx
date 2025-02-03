import { useState } from "react";

import { MasonryPhotoAlbum } from "react-photo-album";
// import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/styles.css"; // import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import photos from "./photos";

export default function App() {
  const [index, setIndex] = useState(-1);
  console.log("asdf");

  return (
    <>
      <MasonryPhotoAlbum
        spacing={16}
        padding={10}
        columns={3}
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        render={{
          wrapper: ({ style, ...rest }) => (
            <div
              style={{
                ...style,
                borderRadius: "4px",
                boxShadow:
                  "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
              data-asdf={console.log("dupa", rest)}
              {...rest}
            />
          ),
        }}
      />
      xd
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}
