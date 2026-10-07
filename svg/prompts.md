# Poster generation prompts

Recorded 2026-10-07. Masters live in masters/, encoded derivatives in assets/. Regenerate a layer only when the art itself changes.

## Background plate (masters/bg-plate.png, 1672x941, opaque)

Cinematic wide illustration of a game-maker's workshop at night, empty of people and characters. A dark navy studio interior: a long empty workbench across the lower third with a glowing holographic grid projector casting cyan light, tall industrial windows behind it showing a neon city skyline in violet and magenta, floating wireframe cubes and soft dust motes in the air, faint volumetric light beams from above, a subtle cyan-and-magenta gradient haze. Painterly semi-realistic 3D render style, deep blues and violets, strong cyan and magenta rim light, high contrast, darkened vignette at the edges. Keep the middle and upper-left areas calm and uncluttered for compositing foreground elements. No people, no characters, no creatures, no text, no lettering, no logos, no user interface, no watermark. Wide 16:9 composition.

## Robot maker (masters/subject-robot.png, 1024x1536 RGBA, transparent)

Full-body friendly robot maker mascot standing in a confident pose, holding a glowing cyan stylus in one hand and a small game controller in the other, rounded white and deep-blue armor panels with glowing cyan seams, single wide visor face with a cheerful glow, complete silhouette with a small margin around it, isolated on a fully transparent background, no scenery, no floor, no shadow on the ground, no text, no lettering, no logos, crisp clean cut-out edges with soft cyan rim light, high quality 3D game-art render.

## Holographic game diorama (masters/subject-diorama.png, 1536x1024 RGBA, transparent)

A floating holographic game diorama: a small glowing platform with a tiny stylized low-poly runner character and colorful blocks on it, surrounded by semi-transparent cyan and magenta hologram panels showing abstract geometric game interface shapes without any readable text, floating pixel cubes and sparkles around it, isolated on a fully transparent background, no scenery, no floor, no ground shadow, no text, no lettering, no logos, crisp clean cut-out edges, glowing cyan rim light, high quality 3D game-art render.

## Maker tools (masters/subject-tools.png, 1536x1024 RGBA, transparent)

A floating cluster of game-making tools: a retro arcade joystick, a modern game controller, a pair of dice, a paintbrush with glowing pixel blocks, and a small stack of pixel cubes, stylized 3D game assets arranged as one compact group, isolated on a fully transparent background, no scenery, no floor, no ground shadow, no text, no lettering, no logos, crisp clean cut-out edges, cyan and magenta rim light, high quality 3D game-art render.

## Processing

Run python3 prepare-assets.py from this directory to rebuild the encoded assets from the raw masters. It crops each subject to its alpha bounding box plus a 3 percent margin, downscales it to twice the displayed width (robot 760x1166, diorama 1120x808, tools 940x544), encodes the opaque plate as JPEG quality 80 and the alpha subjects as WebP quality 80 with alpha_q 85, and writes assets/.

Then build the deliverable with node embed-assets.mjs poster.template.svg assets.json poster.svg. The script deletes nothing; the intermediate crop and retina PNGs stay out of Git because prepare-assets.py regenerates them byte-for-byte.
