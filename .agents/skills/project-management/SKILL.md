---
name: project-management
description: Use when creating or initializing a new project to ensure correct naming and style separation.
---

# Project Management

This skill governs the initial setup and metadata of projects within the Madumtv ecosystem.

## Core Principle
**"The Archivist" is a DESIGN SYSTEM, not a project name.**
- **Project Name:** Must be unique and descriptive of the project's purpose (e.g., "Minecraft-Mod-Scanner", "Portfolio-V2").
- **Design System:** "The Archivist" is used to define the visual identity of the project.

## Instructions
1. **Always ask the user for a project name.** NEVER default to "The Archivist".
2. **Clarify the distinction:** If a user mentions "Archivist", ask if they mean the design system or if they want to name the project that (and advise against it if it's the latter).
3. **Project Identity:** All new projects should (by default) use "The Archivist" design tokens but have their own unique identifier in the project metadata.

## Workflow for New Projects
1. Run `./init-workspace.ps1`.
2. When prompted for a name, if the user doesn't specify one, DO NOT provide "The Archivist" as a suggestion.
3. Ensure the `README.md` reflects the specific project name, not the design system.
