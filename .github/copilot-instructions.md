# Project context

This is a mobile-first university ERP + campus platform prototype for DSI.

It is not a social media app.
It is not a generic productivity app.
It is an official-feeling campus utility and communication system.

## Product structure
- Home = dashboard with urgent actions, today view, quick access, latest update, campus preview
- Academics = official records + moderated academic support
- Updates = official university communications and circulars
- Campus = events, clubs, notices, lost & found, dining
- More = services and utilities

## Design goals
- Mobile-first
- Minimal and easy to scan
- Compact headers
- Low vertical waste
- Prefer grouped lists with dividers over many oversized standalone cards
- Only one dominant block per screen
- Keep the UI institutional, calm, and readable
- Make layouts denser without feeling cramped

## Important UX rules
- Do not create oversized hero sections
- Do not turn simple navigation items into large cards
- Do not stack too many filters, chips, and controls before content
- Keep first useful content above the fold where possible
- Keep primary actions visible without scrolling
- Use chips sparingly
- Use one or two chips max where needed
- Prefer metadata lines over excessive badges

## Things to avoid
- Do not reintroduce social media mechanics
- Do not add community feed behavior
- Do not add flashy gradients or startup-style visuals
- Do not add unnecessary subtitles or helper text
- Do not make layouts decorative if they can be simpler
- Do not change routes or product architecture unless explicitly asked

## Code preferences
- Prefer small reusable React components
- Avoid deeply nested JSX
- Reuse shared list rows, grouped containers, headers, cards, and utility row patterns
- Keep prop names and component names consistent
- Prefer refactoring repeated layout patterns into reusable components

## Context about current codebase
- A lot of the existing UI was generated or heavily shaped by Antigravity
- Before making large changes, first understand the current structure
- When editing, preserve working flows and improve layout efficiency rather than rewriting blindly
- Prefer incremental refactors over random large rewrites

## When modifying screens
Prioritize:
1. scanability
2. mobile efficiency
3. clarity of main action
4. consistency with nearby screens
5. institutional tone

## Before finishing any task
- check consistency with nearby screens
- reduce wasted vertical space
- keep tap targets comfortable
- make sure the result is easier to understand than before