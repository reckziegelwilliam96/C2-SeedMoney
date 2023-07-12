import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class SeedMoneyApi {
  static token; // This class variable will store the token

  // This unified method will be used to make all API calls
  static async request(endpoint, data = {}, method = "get") {
    console.log("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;

    // Add token to headers if it exists
    const headers = SeedMoneyApi.token ? { Authorization: `Bearer ${SeedMoneyApi.token}` } : {};

    // For 'get' method, the data will be sent as parameters
    // For other methods like 'post', 'patch', 'delete' the data will be sent in the body
    const params = (method === "get") ? data : {};

    try {
      // axios call
      const res = await axios({ url, method, data: (method !== "get" ? data : {}), params, headers });
      
      // In case of success, return data
      return res.data;
    } catch (e) {
      // In case of error, log it and throw it
      console.error("API Error:", e.response);
      let message = e.response?.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Register User
  static async registerUser({email, password, firstName, lastName}) {
    // Prepare the data object
    let data = { 
      "email": email, 
      "password": password, 
      "first_name": firstName, 
      "last_name": lastName 
    };
    try {
    // Make the POST request using our unified request function
    let res = await this.request(`auth/register`, data, "post");

    // After successful registration, store the token in our class variable 'token'
    SeedMoneyApi.token = res.token;
    
    // Return the response
    return res;
    } catch (err) {
      console.error(`Error in registerUser: ${err}`);
    }
  }

  // Login User
  static async logInUser({email, password}) {
    // Prepare the data object
    const data = { email, password };

    // Make the POST request using our unified request function
    let res = await this.request(`auth/token`, data, "post");

    // After successful login, store the token in our class variable 'token'
    SeedMoneyApi.token = res.token;

    // Return the response
    return res;
  }

  // Get User
  static async getUser(id) {
    // Make the GET request using our unified request function
    let res = await this.request(`users/${id}`);
    // Return the user data
    return res.user;
  }

  // Update User
  static async updateUser(id, updatedData) {
    // Make the PATCH request using our unified request function
    let res = await this.request(`users/${id}`, updatedData, 'patch');
    // Return the updated user data
    return res.user;
  }

  // Get all businesses for a user
  static async getUserBusinesses(userId) {
    // Make the GET request using our unified request function
    let res = await this.request(`users/${userId}/businesses`);
    // Return the data
    return res.businesses;
  }

  // // Get a specific business for a user
  static async getUserBusiness(userId) {
    // Make the GET request using our unified request function
    let res = await this.request(`users/${userId}/businesses`);
    // Return the data
    return res.data;
  }

  // Get all farms for a user
  static async getUserFarms(userId) {
    // Make the GET request using our unified request function
    let res = await this.request(`users/${userId}/farms`);
    // Return the data
    return res.farms;
  }

  // // Get a specific farm for a user
  // static async getUserFarm(userId, farmId) {
  //   // Make the GET request using our unified request function
  //   let res = await this.request(`users/${userId}/farms/${farmId}`);
  //   // Return the data
  //   return res.data;
  // }

  // Register Business
  static async registerBusiness({ businessName, businessAddress, taxId, userId }) {
    // Prepare the data object
    let data = {
      "business_name": businessName,
      "business_address": businessAddress,
      "tax_id": taxId,
      "user_id": userId
    };
  
    // Prepare the headers object
    let headers = {
      "Authorization": `Bearer ${SeedMoneyApi.token}`
    };
  
    // Make the POST request using our unified request function
    let res = await this.request(`businesses/register`, data, "post", headers);
    // Return the response
    return res;
  }
  //Update Business
  static async updateBusiness(id, data) {
    // Make the PATCH request using our unified request function
    let res = await this.request(`businesses/${id}`, data, 'patch');
    // Return the updated user data
    return res.business;
  }

  // Register Farm
  static async registerFarm({ 
    size, 
    yearsOfExperience, 
    typesOfCrops, 
    organicCertification, 
    sustainabilityPractices, 
    annualFarmRevenue, 
    profitability, 
    farmAddress, 
    farmCity, 
    farmState, 
    farmZipCode, 
    filingStatus, 
    taxFormsFiled, 
    previousApplication, 
    grantOutcome, 
    businessId 
  }) {
    // Prepare the data object
    let data = {
      "size": size, 
      "years_of_experience": yearsOfExperience, 
      "types_of_crops": typesOfCrops, 
      "organic_certification": organicCertification, 
      "sustainability_practices": sustainabilityPractices, 
      "annual_farm_revenue": annualFarmRevenue, 
      "profitability": profitability, 
      "farm_address": farmAddress, 
      "farm_city": farmCity, 
      "farm_state": farmState, 
      "farm_zip_code": farmZipCode, 
      "filing_status": filingStatus, 
      "tax_forms_filed": taxFormsFiled, 
      "previous_application": previousApplication, 
      "grant_outcome": grantOutcome, 
      "business_id": businessId
    };

    // Make the POST request using our unified request function
    let res = await this.request(`farms/register`, data, "post");
    // Return the response
    return res;
  }

  //Update Farm
  static async updateFarm(id, data) {
    // Make the PATCH request using our unified request function
    let res = await this.request(`farms/${id}`, data, 'patch');
    // Return the updated user data
    return res.farm;
  }

  // Get all programs
  static async getPrograms(params = {}) {
    // Make the GET request using our unified request function
    let res = await this.request(`programs`, params);
    // Return the programs data
    return res.programs;
  }

  // Get Grant
  static async getGrant(id) {
    // Make the GET request using our unified request function
    let res = await this.request(`grants/${id}`);
    // Return the grant data
    return res.grant;
  }

  // Get Grants
  static async getGrants(params = {}) {
    // Make the GET request using our unified request function
    let res = await this.request(`grants`, params);
    // Return the grants data
    return res.grants;
  }

  // Create Application
  static async createApplication({ 
    userId, 
    grantId, 
    farmName, 
    farmSize, 
    farmLocation, 
    cropsGrown, 
    animalsRaised, 
    farmRevenue, 
    appProposal 
}) {
    let data = {
      "user_id": userId,
      "grant_id": grantId,
      "farm_name": farmName,
      "farm_size": farmSize,
      "farm_location": farmLocation,
      "crops_grown": cropsGrown,
      "animals_raised": animalsRaised,
      "farm_revenue": farmRevenue,
      "app_proposal": appProposal
    };

    // Make the POST request using our unified request function
    let res = await this.request(`applications/`, data, "post");
    // Return

    return res;
  }

  // Get an application by id
  static async getApplication(id) {
    // Make the GET request using our unified request function
    let res = await this.request(`applications/${id}`);
    // Return the application data
    return res.application;
  }

  //Get All Applications
  static async getUserApplications(id) {

    let res = await this.request(`users/${id}/applications`);
    
    return res.applications;
  }


  // Update an application
  static async updateApplication({ applicationId, updatedData }) {
    // Make the PATCH request using our unified request function
    let res = await this.request(`applications/${applicationId}`, updatedData, 'patch');
    // Return the updated application data
    return res.application;
  }

  // Delete an application
  static async deleteApplication(applicationId) {
    // Make the DELETE request using our unified request function
    let res = await this.request(`applications/${applicationId}`, {}, 'delete');
    // Return the response
    return res;
  }
}

export default SeedMoneyApi;
