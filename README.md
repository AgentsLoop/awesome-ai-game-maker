# Awesome AI Game Generators

> Index AI game generators, AI-assisted engines, and asset or publishing services here, with verified example games for each tool. Treat every capability as a vendor or project claim unless this index states that it was independently tested.

Keep tool entries separate from playable-game datasets such as [awesome-opus-5.5-games](https://github.com/AgentsLoop/awesome-opus-5.5-games). Verify counts and links before every revision. Last checked **2026-10-07**.

## Contents

- [Compare game-creation tools](#compare-game-creation-tools)
- [Feature checklist](#feature-checklist)
- [Games built with these tools](#games-built-with-these-tools)
- [Open-source generators and studios](#open-source-game-generators-and-studios--2026-10-04)
- [Local agent workflow](#local-agent-workflow--2026-09-27)
- [Genex search evidence](#genex-search-evidence)
- [Apply the gate](#apply-the-gate)

## Compare game-creation tools

| Tool | Category | Creation workflow | Play, publishing, remix | Code and export | Access and caveats |
| --- | --- | --- | --- | --- | --- |
| [Pixelfork](https://www.pixelfork.ai/) | Prompt-to-playable studio | Generate 2D and 3D games from a prompt, then tune the mechanics. | Play in the browser and share a link; community games can be remixed. | Read and edit the JavaScript and Three.js source; export an Android APK, AAB, or Android Studio project. | Live and free to try, per the product page. [Product](https://www.pixelfork.ai/) · [features](https://www.pixelfork.ai/features) |
| [Rosebud AI](https://rosebud.ai/ai-game-creator) | Prompt-to-playable studio | Generate game code, art, and sound from a prompt, then refine by chat. | Play in the browser, publish in one click, and remix published games. | Edit the generated JavaScript; Windows game export is advertised. | Free to start; project size, credits, and commercial rights depend on the plan. [Game creator](https://rosebud.ai/ai-game-creator) |
| [Makko AI](https://www.makko.ai/) | Prompt-to-playable studio | Generate characters, backgrounds, and animations, then prompt a 2D game from those assets. | Play in the browser and publish a share link. | Asset export is stated; game export is mentioned without a documented format or process. | Free quotas plus paid plans; the vendor states that users retain game and asset ownership. [Product](https://www.makko.ai/) |
| [PocketByte](https://pocketbyte.io/) | Prompt-to-playable studio | Generate browser games from prompts; refine them with a separate asset studio. | Play in the browser, publish to the community, and remix. | Game-source access and standalone game export are not established; the mobile apps are for using PocketByte. | The product page advertises creation and community access. [Product](https://pocketbyte.io/) |
| [Wanaka](https://wanaka.app/) | Prompt-to-playable 3D studio | Generate a playable first version, then edit worlds, rules, and details by conversation or by hand. | Play in the browser, publish with one link, and remix templates. | Source-code and native-game export are not established. | The studio prompts users to sign in; check the current plan and availability. [Product](https://wanaka.app/) |
| [Mindblown](https://mindblown.ai/) | Prompt-to-playable studio | A bot builds browser games from chat messages; remix a published game or tap "make one like this". The model is undisclosed; the vendor is Snark AI. | Play instantly in the browser; share links, likes, remixes, leaderboards, and multiplayer rooms. | No code is needed; no source or GitHub export was found. | Free to play and build with a 10M-token allowance, then paid. [Product](https://mindblown.ai/) · [make](https://mindblown.ai/make) · [example game](https://mindblown.ai/games/lofi-bird) · [game API](https://api.mindblown.ai/games/lofi-bird) |
| [Gamly](https://gamly.app/create) | Prompt-to-playable studio (waitlist) | Advertises prompt-to-game generation and iterative prompting. | Advertises web play and publishing. | Advertises source access and web, iOS, Android, and desktop exports. | The creator page currently requests a waitlist signup; treat the creation and export features as unverified until access is available. [Creator page](https://gamly.app/create) |
| [Summer Engine](https://www.summerengine.com/) | AI-assisted engine | Draft scenes, scripts, input, and mechanics through conversation in a Godot-compatible desktop engine; GDScript, C++, and C# are supported, with MCP and CLI workflows. | Advertises Summer Games and other launch destinations. | Code stays editable; advertises desktop, mobile, Steam, and console exports. | macOS and Windows downloads are offered; verify each export target before relying on it. [Product](https://www.summerengine.com/) · [workflow](https://www.summerengine.com/blog/creating-games-using-ai) |
| [GDevelop AI Agent](https://gdevelop.io/) | AI-assisted engine | Ask the agent to create or modify objects, events, and behaviors in an existing 2D or 3D project; it is not a one-prompt whole-game button. | Preview and publish through gd.games and other destinations. | JavaScript extensibility; export for web, desktop, and mobile. | AI credits and some publishing options vary by plan. [AI Agent guide](https://gdevelop.io/blog/make-games-with-ai-agent-gdevelop-automated-prompt) · [features and export](https://gdevelop.io/features) |
| [Buildbox 4](https://www.buildbox.com/) | AI-assisted engine | Prompt for assets, scenes, level edits, mechanics, and nodes inside a visual editor; expect to finish and review the project there. | Editor preview; public-play and community-remix features are not established. | Buildbox documents Android, Windows, iOS, macOS, Steam, Apple TV, and other exports; confirm Buildbox 4-specific support. | AI feature details come from vendor announcements and guides. [AI announcement](https://www.buildbox.com/buildbox-4-is-now-available-make-games-with-ai/) · [mechanics guide](https://www.buildbox.com/getting-started-with-buildbox-4-creating-game-mechanics-and-nodes-using-ai/) · [export guide](https://www.buildbox.com/portfolio/exporting/) |
| [SpawnForge](https://www.spawnforge.ai/) | AI-assisted engine (pre-launch) | Generate scenes, physics, scripts, and game logic in a browser-based AI-native 2D and 3D engine, per the site. | Instant play and one-click publishing are advertised. | The public repository describes a Bevy/Rust/WASM engine with ZIP and PWA export; some capabilities are incomplete or unverified. | The site says **Private pre-launch**, and the repository notes that external MCP is local-build-only and not verified end to end. [Product](https://www.spawnforge.ai/) · [source and capability notes](https://github.com/Tristan578/project-forge) |
| [Exists](https://exists.ai/) | World generator (unverified) | Advertises text-generated multiplayer worlds and gameplay with customization. | Advertises online play and sharing with friends. | Source code and export formats are not established. | The landing page uses future-facing language; do not treat the creation or output claims as independently verified. [Product](https://exists.ai/) |
| [Genex](https://genex.games/) | Asset generation and publishing service | Connect an AI coding agent to generators for 3D models, characters, animations, textures, images, video, sound effects, music, and voice; add multiplayer through the SDK. The coding agent builds the game logic, because Genex is not an editor or a full-game code generator. | Publish an existing browser game to a unique URL and a catalog page with an optional Remix action; hosted games can include multiplayer. | The CLI downloads ordinary asset files for any engine; browser publishing is documented and native builds are not. Scoped API and MCP credentials generate and read assets but cannot publish. | Requires account approval and pay-per-generation credits. Use Node 20+ with the CLI or skill, or connect over OAuth MCP; the HTTP API is beta. [Tools](https://genex.games/tools) · [docs](https://genex.games/docs) · [publish guide](https://genex.games/docs/guide/publish-your-game) · [GitHub source](https://github.com/genex-games/genex) · [plugin catalog](https://github.com/genex-games/genex-plugins) |
| [OmGithub](https://omgithub.com/) | Discovery and remix studio | Create projects through OpenCode, or submit and select GitHub games as remix sources. | Discover and play games, open hosted **Play** or **Original ↗** links, request a remix explicitly, and publish a hosted build. | Keep source in GitHub and review commits; native game export is not established. | Guest creation depends on the deployment configuration; sign in for authenticated workflows. [OmGithub](https://omgithub.com/) · [remix example](https://omgithub.com/codewithdivyasree/neon-drift) |

## Feature checklist

Scan the columns in the same order as the comparison table.

| Checklist | Pixelfork | Rosebud | Makko | PocketByte | Wanaka | Mindblown | Gamly | Summer | GDevelop | Buildbox 4 | Genex | OmGithub | Exists | SpawnForge |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Prompt-to-game | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ | — | ◐ | ◐ | ◐ |
| AI editing / iteration | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ | ✅ | ◐ assets only | ✅ | ◐ | ◐ |
| Browser play / share | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ✅ | ? | ✅ | ✅ | ◐ | ◐ |
| Community remix | ✅ | ✅ | ? | ✅ | ✅ | ✅ | ? | ? | ? | ? | ✅ | ✅ | ? | ? |
| Readable / editable source | ✅ | ✅ | ? | ? | ? | — | ◐ | ✅ | ✅ | ? | — external project | ✅ | ? | ◐ |
| Native game export | ✅ Android | ◐ Windows | ? | ? | ? | — | ◐ | ◐ | ✅ | ◐ | — web publishing | ? | ? | ◐ ZIP/PWA |

**Checklist key:** ✅ explicitly documented; ◐ limited, advertised, or unverified; ? not established by the reviewed evidence; — not offered by the tool or handled by an external project. Treat OmGithub as a project studio and catalog rather than a game engine. Treat Genex as an asset and publishing service, not a game generator. Treat Gamly, Exists, and SpawnForge as limited-access products; do not present their advertised output as verified.

## Games built with these tools

Count published games from each tool's own gallery, then link a few named examples. See [games.md](games.md) for every verified example with its page status.

| Tool | Published games found | Named examples | Source |
| --- | --- | --- | --- |
| Pixelfork | 24 published builds in the site sitemap | [Cluck & Brick](https://www.pixelfork.ai/publish/e8d61ce6-7e1f-45d7-9767-52b15ae42b37), [Polygon Range](https://www.pixelfork.ai/publish/0dc9ad32-3425-4c74-aa80-89c11f072069), [Suika Game](https://www.pixelfork.ai/publish/9423dc62-d521-426f-abe1-53d000c0b466) | [www.pixelfork.ai](https://www.pixelfork.ai/sitemap.xml) |
| Rosebud AI | 685 playable game pages in the sitemap | [Lantern Maze](https://rosebud.ai/play/lantern-maze), [Sakura: Ashes of Chernobyl](https://rosebud.ai/play/sakuras-last-bell), [Agefront](https://rosebud.ai/play/agefront) | [rosebud.ai](https://rosebud.ai/sitemap.xml) |
| PocketByte | 40 game links on the Explore Games page | [Moo Breaker](https://pocketbyte.io/games/moo-breaker-or9ryj), [Astro Blaster: Cosmic Upgrades](https://pocketbyte.io/games/astro-blaster-cosmic-upgrades-ee8f0284), [Inferno Arena](https://pocketbyte.io/games/inferno-arena-98ef8391) | [pocketbyte.io](https://pocketbyte.io/games) |
| Mindblown | 100 game pages in the sitemap | [Lofi Bird](https://mindblown.ai/games/lofi-bird), [Ashen Isle Roguevania](https://mindblown.ai/games/ashen-isle-roguevania), [Starward Dominion](https://mindblown.ai/games/starward-dominion) | [mindblown.ai](https://mindblown.ai/sitemap.xml) |
| Genex | 48 gallery listings | [Lost Cathedral](https://lost-cathedral.genex.technology/), [Stick & Steel · The Splinter Pit](https://stick-steel.genex.technology/), [SKATE](https://skate.genex.technology/) | [api.genex.games](https://api.genex.games/api/gallery?limit=48) |
| OmGithub | 109 published project pages in the sitemap | [Claude of Duty](https://omgithub.com/mshumer/claude-of-duty), [Claude of Tanks](https://omgithub.com/kevin-liu-01/claude-of-tanks), [Coro Solto](https://omgithub.com/corosolto/client) | [omgithub.com](https://omgithub.com/sitemap.xml) |
| Wanaka | 6 community showcase topics with playable builds | [osu! (lazer) replica](https://community.wanaka.app/t/16), [Brotato replica](https://community.wanaka.app/t/14), [Stellar Night Agency (otome)](https://community.wanaka.app/t/12) | [community.wanaka.app](https://community.wanaka.app/c/game-showcase/5) |
| Summer Engine | 1 first-party game and 20+ templates | [Sakura Rally (built by Claude Opus 5.5 from one prompt)](https://github.com/SummerEngine/sakura-rally), [Getting Started: 3D Platformer](https://github.com/SummerEngine/Getting-Started-3D-Platformer), [Getting Started: City Builder](https://github.com/SummerEngine/Getting-Started-City-Builder) | [github.com](https://github.com/orgs/SummerEngine/repositories) |
| GDevelop AI Agent | engine showcase only; no AI-Agent attribution published | [Spectrum](https://gd.games/mrmeeseeks/spectrum), [Ball Challenge 2](https://gd.games/andre_holtz/ball-challenge-2), [Antarctica NWYD Demo](https://gd.games/barelyapes/antarctica-nwyd) | [gdevelop.io](https://gdevelop.io/games) |
| Buildbox 4 | engine showcase; no Buildbox 4 AI attribution published | [GRAVI.TY](https://www.buildbox.com/portfolio/gravity/), [3D Bump Ball](https://www.buildbox.com/portfolio/3d-ball-bump/), [Switcher Ball 3D](https://www.buildbox.com/portfolio/switcher-ball-3d/) | [www.buildbox.com](https://www.buildbox.com/showcase/) |
| Gamly | 208 catalog games; AI generator waitlisted | [Board Soccer](https://gamly.app/play/soccergame), [Cube Stack](https://gamly.app/play/cubestack), [Helix Drop](https://gamly.app/play/helix-drop) | [gamly.app](https://gamly.app/games) |
| Makko AI | none found | none found | [www.makko.ai](https://www.makko.ai/sitemap-static.xml) |
| SpawnForge | none found | none found | [www.spawnforge.ai](https://www.spawnforge.ai/) |
| Exists | none found | none found | [exists.ai](https://exists.ai/) |

## Open-source game generators and studios — 2026-10-04

| Tool | Creation capability | Access and output limits | Primary evidence |
| --- | --- | --- | --- |
| [GameStudio](https://github.com/aurora-03/game_studio) | Use local Codex CLI with GPT-6.1 Sol to generate, preview, revise, version, and export playable browser games as HTML or ZIP. | Run locally with Node.js 24+ and an authenticated Codex account. It is a single-user local app, not a public hosted service. It does not silently substitute another model. | [README](https://github.com/aurora-03/game_studio/blob/dev/README.md) · [verification guide](https://github.com/aurora-03/game_studio/blob/dev/docs/verification.md) |
| [Gemify](https://github.com/thomasbrueggemann/gemify) | Photograph a board and its rulebook; use Claude to infer rules and generate a 3D browser game, then test it with bots and revise failed rule checks. | Self-host locally. Use an existing Claude Code login or provide an Anthropic API key. Generated games run in the app; no standalone export workflow is documented. Phone scanning needs HTTPS. | [README](https://github.com/thomasbrueggemann/gemify/blob/main/README.md) |
| [AutoGen Odyssey Game Studio](https://github.com/SathiyabalanSengodan/autogen-odyssey-game-studio) | Use designer, engineer, and reviewer agents to create or extend a playable Pygame game from an idea. The default model for the documented approved build is Claude Opus 5.5; configure the model and effort for later runs. | Run locally with Python, Pygame, and an Anthropic API key. The output is source code (coding/odyssey.py), not a hosted build. The documented smoke test executes generated code without a sandbox; inspect it before running. | [README](https://github.com/SathiyabalanSengodan/autogen-odyssey-game-studio/blob/main/README.md) |

Keep generator capabilities separate from verified game outputs. Add a generator repository to [games.json](https://github.com/AgentsLoop/awesome-opus-5.5-games/blob/main/games.json) only when that same repository contains a distinct, source-verified playable game; this pass records the AutoGen studio's playable **Odyssey of the Living Cap** output separately.

## Local agent workflow — 2026-09-27

- Use [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) to coordinate local game-development agents, prototype workflows, engine-specific work, and testing. Inspect the [primary README](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/main/README.md), which reports running tested games from its workflow comparison. Provide Claude Code access, model usage, and your engine and toolchain separately; do not treat this repository as a hosted one-click game exporter. Keep its MIT-licensed workflow distinct from the license and export capabilities of each generated project. Record verification on **2026-09-27**; keep the framework out of [games.json](https://github.com/AgentsLoop/awesome-opus-5.5-games/blob/main/games.json). Count the separately source-verified Tea Rush prototype in kpkrr/tea-game, not the framework's agents or skills.

## Genex search evidence

An exact-domain GitHub code search for genex.games (limit 100) surfaced 12 repositories. It found the official [Genex agent and tool repository](https://github.com/genex-games/genex) and [plugin catalog](https://github.com/genex-games/genex-plugins), plus game or integration code in the examples above. It also found [dark-soul](https://github.com/Piyushrathoree/dark-soul), which uses Genex but identifies its game as **Lost Cathedral**, duplicating the separately listed [Rabneba/lost-cathedral](https://github.com/Rabneba/lost-cathedral) project. Other results were references rather than integrations: [Domain-Connect/Templates](https://github.com/Domain-Connect/Templates) contains DNS templates; [taxodium](https://github.com/Spike-Leung/taxodium) links to Stick & Steel; [UltraIa](https://github.com/LucaPorro420/UltraIa) archives a source and demo link; [aigamedev-gems](https://github.com/hoveychen/aigamedev-gems) archives a Reddit discussion; and [0913_codex_project](https://github.com/yydshly/0913_codex_project) references Stick & Steel as an upstream example. Treat code search as indexed evidence, not an exhaustive list. Verified Genex examples: [skate-threejs](https://github.com/Rabneba/skate-threejs), [Lost Cathedral](https://github.com/Rabneba/lost-cathedral), [Stick & Steel](https://github.com/Rabneba/stick-steel), [QUARRY](https://github.com/yonidavidson/quarry), and [Airena](https://github.com/boozybatsMain/airena).

## Apply the gate

- Require a primary product page or repository that describes AI-assisted creation of a **playable game**; exclude art, sprites, ideas, and design documents.
- Separate prompt-to-playable platforms from AI assistance inside a conventional editor.
- Classify Genex as an asset-generation and publishing service, not as a game engine or complete-game generator; let the connected coding agent create the game logic.
- Label pre-launch and unclear-access products explicitly.
- Treat every capability above as a vendor or project claim, not an independent build or playtest. Recheck availability, exports, pricing, and licensing before recommending a tool for production.
- Keep [Ludo.ai](https://ludo.ai/docs) out of the playable-game generator table: its current FAQ says it does not create playable games or prototypes, despite older marketing for a Playable Generator.

Check each vendor's access, pricing, licensing, and export limits before recommending it for production. Do not present advertised capability as an independent playtest. Check the existing product comparison on **2026-09-26** and the three added open-source projects on **2026-10-04**. Do not claim that a new account was used, that a generated game was created during this review, or that an export was independently tested.

## Related indexes

- [awesome-opus-5.5-games](https://github.com/AgentsLoop/awesome-opus-5.5-games) collects source-verified playable games with model attribution.
- [awesome-gpt-astra-games](https://github.com/AgentsLoop/awesome-gpt-astra-games) collects the same catalog for GPT-6 Astra.
