# Product Image Task — Amber Parfemi

## Goal
Sort perfume bottle PNGs (transparent bg) into 3 folders by base width,
so each group gets a matching drop-shadow treatment.

## Buckets
- narrow/ — slim, tall bottles (roller-style, thin columns)
- medium/ — standard rectangular flacons (default; put ambiguous here)
- wide/   — chunky broad-based flacons (e.g. Armaf Club de Nuit)

Judge by base width relative to height. When unsure → medium, and list it.

## Shadow recipe (if compositing in code)
Three stacked shadows under the bottle, climbing opacity = natural falloff.
Light from upper-left → shadows offset slightly RIGHT. Contact stays centered.
- contact: narrower than base, ~35% opacity, blur 6-12 (dark seam at join)
- mid:     ~1.3× base width, ~15%, blur 20, offset right
- ambient: ~2.2× base width, ~6%,  blur 50, offset right
- Shadow color: #26282A (not pure black). Contact MUST be narrower than base.

## Background (if compositing)
Cool gradient: #F8F8F7 → #EFEFEE. Never warm/cream (clashes with white bottles).

## Cutout prep
Crop all bottles uniformly — base at bottom, even padding — so baseline aligns.