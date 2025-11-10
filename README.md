# 🕹️ Nesteria Monorepo

Welcome to **Nesteria**, a modern **NES emulator** project written in **TypeScript** — built for accuracy, modularity, and web-friendly development.

This repository is organized as a **monorepo**, containing multiple packages such as the emulator core, demo app, and tools.  
Each package includes its own documentation, build setup, and GitHub workflow.

## 📦 Packages

| Package | Description |
|----------|--------------|
| [`machine`](./packages/machine/README.md) | NES emulator core — implements CPU, PPU, and memory mappers. |
| [`showoff`](./packages/showoff/README.md) | Minimal web demo to load and run NROM `.nes` games in the browser. |

> 👉 To learn more, open the **README** inside the specific package folder.

## 🚀 Getting Started

Clone the repo and open the demo:

```bash
git clone https://github.com/aliaksandarpratashchyk/nesteria.git
cd nesteria
npm ci
npm run build --workspace machine
npm run build --workspace showoff
npm run start --workspae showoff

```
