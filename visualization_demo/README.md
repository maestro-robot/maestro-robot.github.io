# Maestro – Interactive Visualization Demo

An interactive web dashboard that visualizes a real robot manipulation trial executed by the **Maestro** system. The dashboard synchronizes the robot video with live code execution highlights, perception outputs (segmentation & pointing), subtask progression, and reasoning & planning from the VLM.

## Contents

| File / Folder | Description |
|---|---|
| `index.html` | Self-contained dashboard (HTML + CSS + JS) |
| `data.json` | Parsed trial data: keyframes, code blocks, subtasks, reasoning |
| `video_web.mp4` | H.264 robot video (1280×720, ~53 MB) |
| `images/` | Perception output images (segmentation & pointing results) |

## Usage

### GitHub Pages (production)

If hosted under `maestro-robot.github.io`, the demo is accessible at:

```
https://maestro-robot.github.io/visualization_demo/
```

### Local preview

```bash
cd visualization_demo
python3 -m http.server 8000
# open http://localhost:8000
```

## Features

- **Synchronized playback** – code highlight, subtask title, perception output, and reasoning all follow the video timeline.
- **Scrollable code panel** – auto-centers on the current highlight; manual scroll pauses auto-follow for 2.5 s then snaps back (lyrics-style).
- **Speed controls** – 1×, 2×, 5×, 10× playback.
- **Analog clock** – real-time clock synced to the trial timestamp.
- **Perception callbacks** – segmentation and pointing images update contextually during execution.

## Regeneration

To regenerate from raw trial data:

```bash
cd /path/to/Maestro_visualization
conda activate maestro_vis
python codes/generate_website.py \
  "Perfect_trial/2026-03-01_19-28-40_Erase_the_color_order_on_the_whiteboard_then_follo" \
  -o "Perfect_trial/website"
```

Then copy the output to this folder (excluding `video.mp4` and `serve.py`).
