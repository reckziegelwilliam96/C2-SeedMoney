export const getRecommendedApplications = (applications, farmData) => {
    if (!farmData) {
      return [];
    }
  
    // Extract relevant farm data variables
    const {
      size,
      years_of_experience,
      types_of_crops,
      organic_certification,
      sustainability_practices,
      annual_farm_revenue,
      profitability,
    } = farmData;
  
    // Calculate scores for each application based on farm data variables and grant requirements
    const scoredApplications = applications.map((application) => {
      const {
        size_requirement,
        years_of_experience_requirement,
        crops_requirement,
        organic_certification_requirement,
        sustainability_practices_requirement,
        annual_revenue_requirement,
        profitability_requirement,
      } = application.criteria;
  
      // Calculate score based on matching farm data variables and grant requirements
      let score = 0;
  
      if (size_requirement <= size) {
        score += 1;
      }
  
      if (years_of_experience_requirement <= years_of_experience) {
        score += 1;
      }
  
      if (checkCropsRequirement(types_of_crops, crops_requirement)) {
        score += 1;
      }
  
      if (organic_certification_requirement && organic_certification) {
        score += 1;
      }
  
      if (sustainability_practices_requirement && sustainability_practices) {
        score += 1;
      }
  
      if (annual_revenue_requirement <= annual_farm_revenue) {
        score += 1;
      }
  
      if (profitability_requirement <= profitability) {
        score += 1;
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
  
  // Helper function to check if the farm's types of crops match the grant's requirement
  const checkCropsRequirement = (farmCrops, grantCrops) => {
    if (grantCrops.length === 0) {
      return true; // Grant does not have specific crop requirements
    }
  
    // Check if any of the farm's crops match the grant's required crops
    const matchingCrops = farmCrops.filter((crop) => grantCrops.includes(crop));
    return matchingCrops.length > 0;
  };
  