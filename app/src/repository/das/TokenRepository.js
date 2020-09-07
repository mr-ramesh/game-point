const jwt = require("jsonwebtoken");
const private_key_id = "d28d5a80f1fd6095848765970a08906c25390620";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+MDSb2GCQQDEo\nILs/LRF1hF20uPmvxEV9vB35394A5+acfllPyPSGOywAyG82vAlZ9CTNcaNpNiUU\nLbxykjjIsyTW0xFq6/kl2LWKico3eM7Ud4tlCF7UU4Djr2zbkE3dCCIpbkAAq4f3\n9ZS2Ap/Nfk9dj5h9sUbm2sTXhAak138SuF0r/hgtSQ4AABUwVUPryMHHOkO1V+zH\nRtc6ZlhPLpyk9gZnpk5LSKFz84yOLWDDHQX1ZW5fYVn2xOe3MEE6+zKUSotEiklr\nwoJJF44jpf1VssTn/frPHR9VkWnAubBM6HuckHVHlpDR9JEWTrNgwOrMXDLhDSYa\ncl7+xw9FAgMBAAECggEAESB6sFkfMwZQ1u4BproKgzRxEtQAijNI1b6RzX17OsYn\nZorbRJvSZ18fQo/KMhnjVrIteUHFRzV8x9EpkgC4c9xsEhtuS1xmMqIOESSA7Rdo\nOspsJ2RGU+UUK4zR5wDa/i9cEjKPOXA4/ZukMXLRjLoV8BU9FH6ZJbNoPAcz6Pam\nPTOGgZA0BYoAjxXRY+MuIfJOag/QhVpHbLA0UT5OTQikR1H80Rq3lgVwKyPMG+gr\nTdxkFH5XwPSEsyc6Mc/FRej0g1GxEVqbjJpGoZZgJlDbjCoY046LIab/jqKo6JI1\naRmt2+yZKMRI4xYqmSOqHiiyN7hZQLRksRGh/9gO0QKBgQDnsIJPoLffK4ZAsaNP\nzQeHAiWFJvetVAhCfi0SbWyZdqcdosgxRHHwzTDOED2pnU7rOzHOhVT9D4mIzl9U\ngh8xYfc/ooKJWAQevvPuEr/vDlitTeTFs55px6P3lxDCDji4ACwpVRw919nyb8A7\nxRccVa4nPz7miaZ9MOg+ufT+lQKBgQDSJOs6v/UX3gGmpIDntjzEDbKIgkbVtAdl\n4ammX789J9i3f3CubjDly1itSlCUYx9oLiycIayvwwTNlSVfdPZho1OXqtymJapm\nyVAt3skbYefIrrwSXtsYkBgfa7rarUhaWc9VR0sMViLO4nfBNwyoSEwPMYVncx+X\nVdwEz+2R8QKBgFaIQRM2ZpYublTpQ6KBZAdTkOnbNPQCh5c2AuV4AvCKNT5HVte3\nxYp3SHwd6rnXq+sFT8PfXm+phueWlFo+wyGxgiO9MV3Uhq1pCjfnvtGtHQeVKRWB\n0W+WhbHqNPMVVq+6OMQzKnoajScT/8sTAF+vzHySDY8S6CCnzIXo9AzFAoGARGNf\nai8uRCYrw1+l08Kq4+LRRzuecc202qMl4s8mHXDqRk1jDmEt6JrUsRCOSLw5bF4a\nhnUvDcQZvA3dq8MUq5HLkoA4bpmzat/5B/SI3jBujhDPg+r6wnOiZhdZJ/Fcqoqv\nvsEE227sxQdOkcKoi9t7ZTZog9IjZcy7XZWNawECgYEAjyKvFcL49T4u4eoudEAS\nYbGf5p1xxQ65p1UehsECXQTww7K6yU3FMl4ndT3gyQlU+C3AYCShMfZ/Thahfh2Z\noR3LJQtXTKnaG8bE0fxApnsuJb4jpc3mjK3hoxvyL3Z/XiIkby49tQWsY8n8DoCA\nl3A7OTOnStsw6ovI8NC9I4o=\n-----END PRIVATE KEY-----\n";

class TokenRepository {
  constructor() {}

  static async generateToken(user) {
    return new Promise((resolve, reject) => {
      try {
        let token = jwt.sign(user, private_key_id);
        console.debug("[TokenRepository] [generateToken] token created successfully : ", token)
        resolve(token);
      } catch (error) {
        console.debug("[TokenRepository] [generateToken] Unable to generate the token: ", error);
        reject(null);
      }
    });
  }

  static async validateToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, private_key_id, (err, user) => {
        if (err) {
          console.debug("[TokenRepository] [validateToken] Unable to process this token: ", err);
          reject(null);
        }
        console.debug("[TokenRepository] [validateToken] Token validation successfull !");
        resolve(user);
      });
    });
  }
}

module.exports = TokenRepository;
