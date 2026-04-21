const fs = require('fs');
const path = require('path');

const fileMap = {
  // Public Pages
  'src/pages/public/LandingPage.tsx': 'LandingPage',
  'src/pages/public/TeamPage.tsx': 'TeamPage',
  'src/pages/public/RobotPage.tsx': 'RobotPage',
  'src/pages/public/OutreachPage.tsx': 'OutreachPage',
  'src/pages/public/MatchesPage.tsx': 'MatchesPage',
  'src/pages/public/SponsorsPage.tsx': 'SponsorsPage',
  'src/pages/public/ContactPage.tsx': 'ContactPage',

  // Portal Pages
  'src/pages/portal/PortalLogin.tsx': 'PortalLogin',
  'src/pages/portal/PortalDashboard.tsx': 'PortalDashboard',
  'src/pages/portal/PortalTasks.tsx': 'PortalTasks',
  'src/pages/portal/PortalCalendar.tsx': 'PortalCalendar',
  'src/pages/portal/PortalInventory.tsx': 'PortalInventory',
  'src/pages/portal/PortalScouting.tsx': 'PortalScouting',
  'src/pages/portal/PortalUpdates.tsx': 'PortalUpdates',
  'src/pages/portal/PortalAdmin.tsx': 'PortalAdmin',
};

for (const [relPath, componentName] of Object.entries(fileMap)) {
  const absolutePath = path.join('/Users/Mithu/electrolightsTeamSite', relPath);
  // Ensure directory exists
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  // Write stub
  const content = `export default function ${componentName}() {\n  return (\n    <div className="flex h-screen items-center justify-center text-white">\n      <h1 className="text-2xl">${componentName} Stub</h1>\n    </div>\n  )\n}\n`;
  fs.writeFileSync(absolutePath, content);
}
console.log('Successfully populated all page stubs!');
