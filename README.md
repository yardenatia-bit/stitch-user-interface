# Stitch Codespace

Turn a design you made in [Google Stitch](https://stitch.withgoogle.com)
into a working website. You log in to Stitch, and an AI agent downloads your
design and builds it as an app (React, Vite and Tailwind CSS) that runs right
here in the codespace.

## Before you start

1. Design a few screens of an app in [Stitch](https://stitch.withgoogle.com),
   signed in with your Google account.
2. Click **Code → Codespaces → Create codespace on main** on this repo, and
   start your agent in the terminal.

Copy each prompt into the agent and press **Enter**. Read what the agent says
before you go on. If the agent asks to install something or run a command,
allow it.

## Step 1: Log In to Stitch

The codespace logs in to Stitch with an **API key**: a long secret code that
lets it use your Stitch account.

1. **Get your API key.** Go to <https://stitch.withgoogle.com>, open your
   profile menu (your picture, top right), choose **Stitch Settings**, then
   **API Keys**, and click **Create Key**. Copy the key.
2. **Open a second terminal**: click **Terminal → New Terminal** (or the
   **+** in the terminal panel). Use this terminal, not the agent, so your
   key stays private.
3. Type this, with your key in place of `YOUR-API-KEY`, and press **Enter**:

   ```default
   stitch login --api-key=YOUR-API-KEY
   ```

4. Go back to the agent's terminal.

Don't paste your API key into the agent's chat or into any file in this
repo. Anyone with the key can use your Stitch account.

## Step 2: Check You Are Logged In

```default
Check that I'm logged in to Stitch and list my Stitch projects.
```

## Step 3: Download Your Design

```default
Download all the screens of my Stitch project PROJECT NAME into the design folder, and tell me which screens you got.
```

## Step 4: Build the App

```default
Build my design as a React, Vite and Tailwind app in the app folder. Make every screen a page, make the links and buttons between screens work, and match the design as closely as you can. Then start the dev server and give me the link.
```

Open the link (or the **Ports** tab, port **5173**) to see your app.
Compare it with your design in Stitch.

## Step 5: Make It Better

Tell the agent what to change, for example:

```default
The header on the home page should be smaller, and make the Add to Cart button work.
```

The page in the browser updates by itself after each change.

## Running the App Again

If you come back to the codespace later, start the app with:

```default
./setup_dev_server.sh
```
