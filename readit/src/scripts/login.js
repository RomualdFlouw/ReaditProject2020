export default {
  getQueryVariable(variable) {
    var code;

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        code = pair[1];
        return code;
      }
    }
    return (false);
  },

  async getToken(code) {
    const data = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:5000/`
    let clientID = "BniURRuNGAryzQ";
    let clientSecret = "67X-3QmjnzruZxjT2BEGGlB9SNY";

    await fetch("https://www.reddit.com/api/v1/access_token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": `Basic ${btoa(`${clientID}:${clientSecret}`)}`
        },
        body: data
      })
      .then((response) => response.json())
      .then((data) => {
        window.localStorage.setItem("bearerToken", data.access_token);
        window.localStorage.setItem("auth_type", data.token_type);
        return data;
      }).catch(function (err) {
        // Log any errors
        console.log('something went wrong', err);

      });
  },

  async getUserData(tokenType, token) {
    await fetch('https://oauth.reddit.com/api/v1/me', {
      headers: {
        'Authorization': tokenType + ' ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (resp) {
      // Return the API response as JSON
      return resp.json();
    }).then(function (data) {
      // Log the pet data
      console.log(data);
      window.localStorage.setItem("username", data.name);
      window.localStorage.setItem("userId", data.id);
      return data;
    }).catch(function (err) {
      // Log any errors
      console.log('something went wrong', err);
    });
  }
}