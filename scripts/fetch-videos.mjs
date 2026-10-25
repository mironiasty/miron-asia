// Fetches the newest videos from the YouTube channel feed and stores them in src/videos.json.
// The feed has no CORS headers, so it has to be read at build time instead of in the browser.
import { writeFile } from "node:fs/promises";

const CHANNEL_ID = "UCHRlhgIco9hrYIDvBXEB7dA";
const LIMIT = 12;
const OUTPUT = new URL("../src/videos.json", import.meta.url);

const decode = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const pick = (entry, tag) => entry.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))?.[1] ?? "";

try {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const xml = await response.text();
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => {
      const id = pick(entry, "yt:videoId");
      return {
        id,
        title: decode(pick(entry, "title")),
        published: pick(entry, "published"),
        url: entry.match(/<link rel="alternate" href="([^"]*)"/)?.[1] ?? `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    })
    // Shorts are vertical and don't fit the video cards
    .filter((video) => !video.url.includes("/shorts/"))
    .slice(0, LIMIT);

  await writeFile(OUTPUT, JSON.stringify(videos, null, 2) + "\n");
  console.log(`Saved ${videos.length} videos to src/videos.json`);
} catch (error) {
  // Keep the previously saved list so the build still works offline.
  console.warn(`Could not fetch YouTube videos (${error.message}), using existing src/videos.json`);
}
