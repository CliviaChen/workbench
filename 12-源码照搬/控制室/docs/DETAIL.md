# Control room

A single screen of status cards for the local projects (DSH Workspaces) of this installation, opened from an action at the foot of the left sidebar.

## What it does

- **Sidebar foot entry** — a row above Settings. In the 56px rail it shows the glyph only; hovering shows the label.
- **Project cards** — one card per Workspace, ordered *needs you → running → idle, then most recently updated*. Clicking a card opens the project cockpit; it does not start a conversation.
- **Three states** — `idle`, `running`, and `waiting`. Waiting is derived from the host's `pendingInteraction.kind` (`approval`, `plan-review`, `question`) and takes precedence over running; both active states pulse the hard shadow in fluorescent lime, and the dot is square when waiting and round when running.
- **Stage colours** — five stages: unset (dashed neutral chip, plain card), idea (cyan), active (amber), review (hot pink), delivered (ink). A stage tints the card 13% and paints a solid bold chip; unset stays neutral with a dashed chip. Lime is excluded from the stage palette on purpose, so the only lime on screen is the running / needs-you pulse — motion and colour never argue.
- **"Do next" bar** — up to three cards ranked needs-you → due today/tomorrow → due this week → running → touched this week, each showing its reason.
- **Cockpit** — four views behind the card:
  - *Overview* keeps stage, deadline and a one-line next step.
  - *Board* shows sessions, tasks done, days to deadline, last activity, a 14-day activity chart built from session update times, and a task progress bar.
  - *Tasks* lists per-project to-dos with add, complete and delete.
  - *Sessions* lists the project's sessions newest-first; clicking one calls `uiWorkspace.openSession(sessionId)` and falls back to `openWorkspace` when the host declines.
- **Explicit chat** — the cockpit header carries the only entry to the conversation, so looking around never interrupts a running chat.
- **Right-click menu** — archive, hide, or jump to *Sessions* for stars and notes. Archived and hidden projects drop out of the grid and the focus bar; a footnote below the grid shows them again and flags them, so nothing is lost.
- **Stars and notes** — each session row in the cockpit can be starred and annotated; both live in the same local record as the project metadata.
- **Clock** — top-right, on the same row as *Do next*: hour:minute at display size, then `YYYY.MM.DD` and the browser's weekday name in tracked caps. It ticks with the same one-second state that drives the running timers.
- **Records drawer** — a button anchored to the panel's own bottom-left corner (absolutely positioned inside the panel, not fixed to the viewport, so it can never cover the host sidebar). It opens a panel with a day / week / month switch and four numbers: projects delivered in the window (counted from the date a project was marked delivered), sessions, peak working hour, and token usage. Copy or download the period as Markdown. The panel's content scrolls inside an inner container, which is what keeps the button pinned while the cards scroll.
- **First run** — a one-line explainer that can be dismissed and is remembered locally.

## Visual language

The panel is a Memphis tile wall: square cards (`aspect-ratio: 1/1`) sized from the viewport, laid out in a grid of at most three columns with a wide gap, each square to the page and carried on a hard 9px offset shadow with zero blur. The grid container sizes itself to the columns in use, so one or two cards still sit centred; from the fourth card on the column count stays at three and the extra rows fill left to right.

Edge, paper and shadow are `light-dark()` pairs — ink-on-bone in the light theme, bone-on-near-black in the dark one — so a tile reads as a drawn object in either host theme. Text stays on the card's own ink token rather than the host label tokens, because the host tokens are tuned for the panel ground, not for a bone or plum tile. The panel background is the host `--dsw-alias-bg-base`; the dot grid behind the tiles is the ink token at 7% and deliberately bleeds 8% past the panel padding.

Three saturated accents come from the Memphis palette: hot pink (`#ff2e9a`) for the project mark, fluorescent lime (`#c8ff00`) for the running state, with cyan (`#00e5ff`) and amber (`#ff8a00`) defined and reserved. The badge at the card's top-left is a magenta square holding a white vector glyph (a 2×2 rounded grid) with its own 3px shadow, replacing the former letter monogram.

Because the page holds no header, the panel carries a visually hidden `<h1>` so the page still has a name for screen readers.

The two active states differ by more than colour: waiting uses a lime outline and a square dot, running keeps the ink outline and a round dot, and each carries its own copy (`Needs you` / `Running · mm:ss`). Both pulse the hard shadow 9px → 15px with a −4px lift (`cr-pulse`, 1.6s). `prefers-reduced-motion: reduce` stops the pulse and drops the hover lift.

## Usage

1. Open **Control room** from the action above Settings in the left sidebar.
2. Pick a card to open its cockpit — overview, board, tasks, sessions. No conversation starts.
3. Use **Open chat** in the cockpit header when you want the conversation; use a row in the *Sessions* view to reopen one specific session.
4. **← Back** returns to the card wall with its ordering and states intact.
5. Use the sidebar to leave the page.

## Limitations

- Projects are the Workspaces already registered in DSH; this page does not scan the filesystem, create Workspaces, or remove them — do that in the sidebar.
- The grid is capped at three columns, not at three cards: many projects make the page scroll, and it has no search or pagination.
- **Stage, deadline, next step and tasks live in `localStorage`**, not in the host. They are per browser, do not travel between devices or browser profiles, and are lost if site data is cleared. Moving them to host configuration is what v1.1 would do.
- **The three states use `pendingInteraction` only.** If the host exposes another kind of interaction, it renders as the generic "needs you" label until a copy key is added.
- **Rename writes through to the Host.** The context menu's rename item opens a modal and posts `{ workspaceId, title }` to `/api/control-room-rename`; the Host calls `workspaceController.rename`, so the workspace record — and therefore the sidebar entry — changes. The card also keeps a local title override, so it flips immediately even if the host event arrives later. A blank title is rejected before the request; duplicates and other host errors surface in the dialog.
- **Scrolling is custom.** The native scrollbar is hidden (`scrollbar-width: none` plus a zero-width webkit bar). A thin overlay bar sits at the right edge, appears on wheel, fades out 900ms after the last wheel event, and its thumb can be dragged. Positions are computed from `scrollTop / scrollHeight / clientHeight`, refreshed by a `ResizeObserver` because a view or tab swap changes the content height without firing `scroll`.
- **New conversation is created from the blank canvas.** A right-click on the canvas (anywhere the card menu did not already claim the event) opens a one-item menu. The dialog collects a name (default `新建对话`) and the folder's absolute path; the Host calls `workspaceController.create({ path })` and, when the typed name differs from the folder name, `rename` right after. A blank path is rejected before any request; host errors (missing folder, duplicate) surface in the dialog.
- **Rubber band.** Pulling past either end translates the content wrapper up to 56px with gentle asymptotic damping (`56 * (1 - e^(-raw/84))`), so each extra wheel notch moves it less. Releasing the wheel (140ms idle) or the thumb eases back over 460ms with a mild overshoot (`cubic-bezier(.25,1.08,.34,1)`). The transform lives on `.cr-scrollInner`, so `scrollHeight` and the thumb never change during the stretch.
- **The scrollbar is magenta on purpose.** The thumb is the accent colour against a 16% line track so it reads against the paper background; it is the only saturated element at the right edge.
- **Motion is short and overshooting, never blurred.** Entering a project runs `cr-viewIn` (14px lift + 0.8% scale, 220ms, overshoot easing); going back plays `cr-gridIn` on the grid; each tab panel is re-keyed so `cr-panelIn` replays on every switch; the lime tab highlight transitions its fill and pops with `cr-tabOn`. The week chart's bars animate `height` from zero to `var(--h)` with a 45ms-per-column stagger, downward bars delayed another 70ms. The records drawer and both modals animate in, and animate out for 130ms via a `data-closing` flag before unmounting. Every keyframe is short, uses hard edges and the existing offset shadows — no blur, no bounce that softens the shape.
- **Reduced motion wins.** `prefers-reduced-motion: reduce` disables all of the above, including the new chart growth and the tab transition.
- **The week chart reads two series.** X is this calendar week (Monday onward). Grey tracks are the axis; **tokens grow up** (magenta) and **completed tasks grow down** (cyan), each normalised to its own maximum so a 4M-token day and a 3-task day are both visible. Hovering (or focusing) a column shows `Token 0.42M · 完成 3 个`.
- **Tokens are scoped to the project's sessions.** The chart requests `?since=<Monday>&sessions=<ids>`; the Host filters the log scan by session directory, so another workspace's tokens never appear. Tasks count by `doneAt`; tasks completed before this version have no timestamp and are absent.
- **Peak window is token-ranked and scale-aware.** Day scale finds the busiest **three consecutive hours** (`13:00—16:00`); week scale finds the busiest **day** (`11-22`); month scale finds the busiest **Monday-to-Sunday week** (`11-23—11-29`). Ranking uses **net** tokens, because ranking by the cached total would just report whichever hour reused the most context.
- **No data means no panel.** If the Host route is unavailable, or the relevant hourly / daily / weekly bucket has no tokens, the peak tile is removed entirely instead of rendering `—`.
- **The board has no durations.** Sessions expose titles and update times, not durations.
- **Token usage comes from the Host, not the browser.** The bundle's Host half scans `<dsh home>/sessions/**/session.v4.jsonl.zstd` and sums `data.message.usage` for the selected window. Session files are **concatenated zstd frames**, so `zstdDecompressSync` is applied frame by frame using `engine.bytesWritten`; a single-shot decompress returns only the first frame.
- **Two token figures.** `net` = `inputTokens + outputTokens`; `total` = the host's `totalTokens`, which includes cache reads. The tile shows net and the dialog shows both, so a 5.6M net can legitimately sit beside a 425M total.
- **The Client reaches it through an exact Fetch route.** `GET /api/control-room-usage?scale=day|week|month` is registered with `connection.fetch.register(...)`; Connection answers 403 to any non-owner Peer, so a remote browser cannot read another user's usage.
- **Loading a Host change does not need a full restart.** HMR watches no roots by default (`root: []`), so editing `index.js` does not reload it — but toggling the plugin row off and on in **Plugins** re-imports the Host half. A normal start also loads it. Activation is recorded in `<dsh home>/control-room-host.json` with `registered`, `calls`, `lastCall` and the Host's Node version, so the route can be diagnosed without a browser.
- **It also needs a Host Node with zstd.** This desktop runs the Host on Node 24.21.0, which has `zlib.zstdDecompressSync`; an older runtime would make the scanner throw and the route answer 500 rather than silently return zeros.
- **Registration is defensive.** Connection's accepted `requestBody` mode has changed across releases, so the Host half tries `buffered`, then the same route without the field, then `stream`, and never lets a failure break plugin activation.
- **The account returns a balance, not token history.** The same route also calls `deepseekAccount.getBalance` and returns the wallet rows. `deepseekAccount` exposes profile, balance, notifications and sign-in — no usage query — which is why the token numbers come from logs instead.
- **Delivered counts need a delivery date.** Marking a stage *delivered* stamps `doneAt`; projects delivered before this version have no stamp and therefore do not count in any window. The card still shows the stage.
- **Archive and hide are local.** They behave the same way (both leave the grid); the distinction is only the label, so a future version can attach different behaviour to each.
- **Session titles come from the host.** A session without a title shows the localized "Untitled session" label.
- The elapsed time for a running conversation is measured from the moment this page observes it running; a reload restarts that measurement, and the value is not read from the Session log.
