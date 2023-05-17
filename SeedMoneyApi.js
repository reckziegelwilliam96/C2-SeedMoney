class SeedMoneyApi {
    // ...similar to the JoblyApi class
  
    /** Register a new user. */
    static async registerUser({ username, password, firstName, lastName, email }) {
      // ...
    }
  
    /** Get a user by username. */
    static async getUser(username) {
      // ...
    }
  
    /** Log in a user. */
    static async logInUser({ username, password }) {
      // ...
    }
  
    /** Update a user's information. */
    static async updateUser({ username, updatedData }) {
      // ...
    }
  
    /** Get a farm by id. */
    static async getFarm(id) {
      // ...
    }
  
    /** Get a list of farms. */
    static async getFarms(params = {}) {
      // ...
    }
  
    /** Get a grant by id. */
    static async getGrant(id) {
      // ...
    }
  
    /** Get a list of grants. */
    static async getGrants(params = {}) {
      // ...
    }
  
    /** Apply for a grant. */
    static async applyForGrant(userId, grantId) {
      // ...
    }
  
    /** Track the status of a grant application. */
    static async getApplicationStatus(userId, grantId) {
      // ...
    }
  }
  
  export default SeedMoneyApi;
  