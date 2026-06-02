Make all of the following changes across the app in one go. Read every instruction carefully before making any changes:

1. HOME SCREEN — Scrolling announcement ticker
Replace the static "🎉 Cultural Fest auditions Friday!" text on the right side of the combined banner with an auto-scrolling marquee/ticker that smoothly loops through these 4 announcements continuously from right to left: "🎉 Cultural Fest auditions this Friday!", "💻 Hackathon 2026 — Register before March 12!", "🍽️ March Mess Menu now posted on the board!", "📢 IEEE Club open house — All branches welcome!". The scrolling should be smooth and continuous using a CSS keyframe animation. The green "247 online" on the left stays static. The ticker only affects the right half of the banner after the vertical divider.

2. CLUBS SCREEN — Replace all clubs with real DSU clubs
Replace ALL existing club data with these 4 real clubs from Dayananda Sagar University:
Club 1: EOL Club (English & Oratory League) — color #1E3A8A blue — use a MicIcon or RecordVoiceOverIcon — members: 189 — description: "Public speaking, debates, MUNs & oratory events. We turn introverts into confident speakers." — recruiting: true — pinned post: "Inter-college debate registrations open! Sign up by March 14 🎤" — IMPORTANT: Add a note in a comment in the code saying // TODO: Replace Avatar with actual EOL Club image — attach image in Figma Make
Club 2: CHEMFUN Club — color #16A34A green — use a ScienceIcon or BiotechIcon — members: 134 — description: "Fun experiments, chemistry quizzes & lab demos. Making science exciting beyond the syllabus." — recruiting: false
Club 3: MUNSOC (Model United Nations Society) — color #7C3AED purple — use a PublicIcon or GavelIcon — members: 210 — description: "Diplomacy, global affairs & debate. Represent nations, draft resolutions, change the world." — recruiting: true — pinned post: "MUNSOC Spring Conference 2026 — delegate registrations now open! 🌍"
Club 4: IEEE Club — color #EA580C orange — use a MemoryIcon or ElectricBoltIcon — members: 167 — description: "Tech talks, workshops, paper presentations & networking with industry professionals." — recruiting: false
Update the header subtitle to show the correct total member count. Keep the "Apply to Join →" / "⏳ Application Sent" button logic exactly as is.
COMPACT DESCRIPTIONS FOR CLUBS: Each club description should be truncated to 2 lines maximum using CSS -webkit-line-clamp: 2 by default. Add a tappable "Read more" text in the club's own color below the truncated text. When tapped, it expands to show the full description and the text changes to "Show less". This must actually work using React useState — each club card tracks its own expanded/collapsed state independently.

3. STUDY GROUPS SCREEN — Fix compact descriptions
The "Read more..." button currently does nothing. Fix it properly: truncate each group description to 2 lines using CSS display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden when collapsed. When "Read more" is tapped, remove the clamp and show full text, change button to "Show less". Each card must track its own expanded state independently using the existing expandedDesc state set. Make sure this actually works visually — the text must visually truncate, not just have a button that does nothing.

4. PROFILE SCREEN — Full visual redesign
Completely redesign the Profile screen to look premium and beautiful while keeping all the same data. Here's the exact layout:
Header section: Make the top banner taller — 110px instead of 60px. Add 3–4 subtle translucent white circles of varying sizes positioned in the top-right corner of the banner for visual depth (like the Login screen decoration). Place the avatar overlapping the banner bottom edge as before. Make the avatar 84px, with a 4px white border and a soft blue glow shadow 0 0 0 3px #1E3A8A40. Below the avatar: name "Prathik Sharan" in 21px bold, then "Computer Science & Engineering" in 13px slate, then "1st Year · 2025 Batch" in 12px muted, then "Dayananda Sagar University, Bangalore" in 12px muted, then the verified email badge.
Stats section: Instead of plain grey boxes, give each stat a colored left border — Events gets orange #EA580C, Questions gets purple #7C3AED, Groups gets green #16A34A. Make the stat numbers all #1E3A8A blue (consistent color, not 3 different colors). Add a thin horizontal progress-bar style indicator below each number showing relative activity level (Events = 40%, Questions = 90%, Groups = 25%) in the respective border color. This makes the stats section look dynamic and visual.
My Clubs section: Update clubs to show EOL Club (blue chip with MicIcon) and MUNSOC (purple chip with PublicIcon) instead of Coding Club and Cultural Club.
Menu section: Add a small right-pointing chevron icon > on the far right of each menu item row (My Events, My Questions, Applications, Settings) to indicate they are tappable. This is standard mobile UI. Make each menu row have a subtle hover/tap background of #F8FAFC.

5. OVERALL APP BEAUTIFICATION — Apply to every screen
Make these polish changes everywhere simultaneously:

Every screen's AppBar/header that uses the gradient must use exactly linear-gradient(135deg, #0f2460 0%, #2d5be3 100%) — verify this is consistent across Home, Clubs, Study Groups, Ask Seniors, Academics, Internships, Lost & Found, Create Post, Profile, Groups.
Every Card across the entire app should have elevation={0} with border: '1px solid #E2E8F0' and borderRadius: '16px' — remove any cards that use shadow elevation instead of border.
Every primary action button (Apply to Join, Join Group, Contact Reporter, Apply Now, Ask a Question FAB, Create Group FAB) should use borderRadius: '12px' consistently.
Add a subtle box-shadow: 0 1px 3px rgba(0,0,0,0.06) to all Cards for a very gentle lift effect that makes them feel less flat.
The bottom navigation bar: make the active tab show a small #DBEAFE rounded pill background (height 28px, width 56px) behind the active icon only. The active icon and label should be #1E3A8A bold. Inactive icons and labels stay #94A3B8 grey.