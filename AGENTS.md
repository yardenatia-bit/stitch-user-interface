# Instructions for the coding agent

The user is a student who designed an app's screens in
[Google Stitch](https://stitch.withgoogle.com). You download their design
with the Stitch CLI (`stitch`) and build it as a working React app in this
codespace. Explain briefly what each step does, so they learn the workflow.

## How to talk to the student

The students are business and fashion students, not programmers. Speak to
them in plain words:

- Use short, everyday sentences. Say what happened and what it means for
  them, not how the software works inside.
- Avoid jargon. When you must use a technical word (component, dev server,
  package), explain it in a few plain words the first time.
- Don't paste long logs or stack traces. Show the part that matters and say
  in plain words what it means.
- When something goes wrong, say what happened and what you will do next (or
  what they need to do), in simple steps.
- Keep answers short. Offer more detail instead of giving it all at once.

## Logging in to Stitch

The student logs in with a Stitch API key, which they type themselves in a
second terminal (see the README). Never ask for the key, never put it in a
file or a command you run, and if they paste it into the chat, tell them to
make a new key in Stitch and delete the old one. Don't run plain
`stitch login` (it waits for a browser sign-in and your command will time
out).

To check whether they are logged in, run `stitch status`: it should say
`"authenticated": true`. If not, tell them:

1. Get an API key: on <https://stitch.withgoogle.com>, open the profile menu
   (top right), **Stitch Settings → API Keys → Create Key**, and copy it.
2. Open a new terminal: **Terminal → New Terminal** (or the **+** in the
   terminal panel).
3. Type `stitch login --api-key=YOUR-API-KEY` with their key, and press
   Enter.
4. Come back and type `done`.

If `stitch` is missing, install it: `npm install -g @google/stitch`.

## Downloading the design

1. List their projects: `stitch find project`. If there are several, ask
   which one (by its name) to build.
2. List that project's screens: `stitch find screen --project PROJECT_ID`.
3. Download every screen's HTML and screenshot into `design/`, one folder per
   screen named after it in lowercase with dashes (for example
   `design/home`, `design/product-page`):
   `stitch download screen SCREEN_ID --project PROJECT_ID --html --image --output design/SCREEN-NAME`
4. If the project has a design system (`stitch find design-system --project PROJECT_ID`),
   save its colors, fonts and spacing in `design/design-system.json`
   (`--json` output).
5. Tell the student which screens you downloaded. Never change the files in
   `design/`; they are the reference. Use `stitch --help` and
   `stitch <command> --help` if a command is unclear.

## Building the app

The app lives in `app/` and uses **React + Vite + Tailwind CSS**
(JavaScript, not TypeScript, unless the student asks).

1. Create it, without prompts:
   `npm create vite@latest app -- --template react --no-interactive`
   (don't let it start the dev server) then, in `app/`,
   `npm install` and `npm install tailwindcss @tailwindcss/vite react-router-dom`.
2. Set up Tailwind v4: add the `tailwindcss()` plugin from
   `@tailwindcss/vite` in `vite.config.js`, and make `src/index.css` start
   with `@import "tailwindcss";`. Remove Vite's demo styles and content.
3. In `vite.config.js` also set
   `server: { host: true, port: 5173, allowedHosts: true }` so the
   codespace's forwarded link works.
4. Rebuild each Stitch screen as a React page in `src/pages/`, with repeated
   parts (header, nav bar, product card, footer) as components in
   `src/components/`. Use one route per screen with `react-router-dom`, and
   make the buttons and links between screens work.
5. Match the design closely: copy its Tailwind classes, colors, fonts (load
   the same Google Fonts in `index.html`), icons and text from the
   downloaded HTML. Put the design's colors and fonts in `src/index.css` with
   Tailwind's `@theme`. Copy images the design uses into `public/` if they
   would otherwise break.
6. Keep made-up data (products, prices, names) in `src/data/` rather than
   repeated in the pages, so the student can change it in one place.
7. Check it builds: `npm run build` in `app/`. Fix every error.

## Running the app

Start the dev server with `./setup_dev_server.sh` from the repo root. It
runs Vite in the background (log in `dev-server.log`), waits for it, and
prints the link to open. Give the student that link, and tell them they can
also open it from the **Ports** tab (port 5173). Vite reloads the page by
itself when you change files, so you don't need to restart it; run the
script again only if the server stopped or you changed `vite.config.js` or
installed packages. `./setup_dev_server.sh stop` stops it.

Never run `npm run dev` directly in the foreground: it never finishes and
your command will time out.

## Changes after the first build

When the student asks for changes ("make the button pink", "add a checkout
page"), make them in `app/`, check with `npm run build`, and tell them to
look at the page in the browser. If they changed the design in Stitch and
want the new version, download the changed screens again into `design/` and
update the matching pages.
