export const FTCSCOUT_GRAPHQL_URL = 'https://api.ftcscout.org/graphql';
export const TEAM_NUMBER = 30686;

/**
 * Executes a GraphQL query against the FTCScout API.
 */
export async function fetchFTCScout<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(FTCSCOUT_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`FTCScout API error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`GraphQL Error: ${json.errors[0].message}`);
  }

  return json.data;
}

// ==========================================
// PRE-BUILT QUERIES
// ==========================================

export const TEAM_STATS_QUERY = `
  query GetTeamStats($teamNumber: Int!) {
    teamByNumber(number: $teamNumber) {
      name
      rookieYear
      quickStats {
        totep
        opr
        autoOpr
        teleopOpr
        endgameOpr
      }
    }
  }
`;

/**
 * Fetches core OPR and stats for Team 30686
 */
export async function getTeamQuickStats() {
  return fetchFTCScout(TEAM_STATS_QUERY, { teamNumber: TEAM_NUMBER });
}
