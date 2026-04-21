import os

fileMap = {
  "src/pages/public/LandingPage.tsx": "LandingPage",
  "src/pages/public/TeamPage.tsx": "TeamPage",
  "src/pages/public/RobotPage.tsx": "RobotPage",
  "src/pages/public/OutreachPage.tsx": "OutreachPage",
  "src/pages/public/MatchesPage.tsx": "MatchesPage",
  "src/pages/public/SponsorsPage.tsx": "SponsorsPage",
  "src/pages/public/ContactPage.tsx": "ContactPage",
  "src/pages/portal/PortalLogin.tsx": "PortalLogin",
  "src/pages/portal/PortalDashboard.tsx": "PortalDashboard",
  "src/pages/portal/PortalTasks.tsx": "PortalTasks",
  "src/pages/portal/PortalCalendar.tsx": "PortalCalendar",
  "src/pages/portal/PortalInventory.tsx": "PortalInventory",
  "src/pages/portal/PortalScouting.tsx": "PortalScouting",
  "src/pages/portal/PortalUpdates.tsx": "PortalUpdates",
  "src/pages/portal/PortalAdmin.tsx": "PortalAdmin"
}

for path, comp in fileMap.items():
  os.makedirs(os.path.dirname(path), exist_ok=True)
  with open(path, "w") as f:
    f.write(f'export default function {comp}() {{\n  return (\n    <div className="flex h-screen items-center justify-center text-white">\n      <h1 className="text-2xl">{comp} Stub</h1>\n    </div>\n  )\n}}\n')
