export const getRecommendedApplications = (applications, farmData) => {
  if (!farmData) {
    return [];
  }

  // Convert farm data to an array of keywords
  const farmKeywords = Object.values(farmData)
    .filter(value => typeof value !== 'number') // Exclude IDs and other numeric values
    .map(String); // Convert all elements to strings

  // Calculate scores for each application based on farm data variables and grant requirements
  const scoredApplications = applications.map((application) => {
    let score = 0;

    // Check if any farm keyword is found in the application data
    for (const keyword of farmKeywords) {
      for (const value of Object.values(application)) {
        if (String(value).includes(keyword)) {
          score += 1;
          break; // Stop checking this application's values once a match is found
        }
      }
    }

    return {
      application,
      score,
    };
  });

  // Sort applications based on score in descending order
  scoredApplications.sort((a, b) => b.score - a.score);

  // Extract recommended applications with non-zero scores
  const recommendedApplications = scoredApplications
    .filter((scoredApplication) => scoredApplication.score > 0)
    .map((scoredApplication) => scoredApplication.application);

  return recommendedApplications;
};
