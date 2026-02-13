# Contributing Research to the Public Library

The Research Hub supports community contributions — share your research dashboards so others can learn from them.

## How It Works

When you run the **research-visualizer** skill, you'll be asked during setup if you'd like to contribute your research to the public library. If you agree:

1. Your agent automatically pushes completed research to the `agent-contributions` branch of this repo
2. A GitHub Action validates the project structure and runs a build test
3. The maintainer reviews and merges contributions into `main`

## What Gets Shared

Only the **project-level files** for the specific research you agree to share:

- `src/projects/<your-project>/App.jsx` — project layout
- `src/projects/<your-project>/components/` — visualization components
- `src/projects/<your-project>/data/` — research data files
- Updated `src/projects/index.js` — registry entry for your project

**What is NOT shared:**
- Your local config.json (contains machine-specific paths)
- Any personal information beyond what's in the research content itself

**Note:** When opted in, all research projects you build are automatically shared. If you want to stop sharing, update your config.json `library.enabled` to `false`.

## Project Structure Requirements

Each contributed project must follow this structure:

```
src/projects/<slug>/
├── App.jsx                    # Project App with internal sidebar nav
├── components/
│   ├── Overview.jsx           # At minimum: Overview section
│   ├── Sources.jsx            # At minimum: Sources section
│   └── [OtherSections].jsx    # Additional sections
└── data/
    └── *.js                   # Research data as ES module exports
```

## Contribution Flow (Agent-Side)

The skill handles this automatically. When opted in:

1. Agent adds the library as a push remote (if not already configured)
2. After each build, agent commits and pushes to `agent-contributions` branch
3. The push uses a scoped PAT provided during setup

## Manual Contribution

If you want to share research manually:

```bash
cd ~/research-hub
git remote add library https://github.com/mrshaun13/research-hub.git
git push library main:agent-contributions
```

## License

By contributing, you agree that your research dashboards may be used by others for learning and reference purposes.
