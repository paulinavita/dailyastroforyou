let baseURL = 'http://localhost:3001'

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
      url: `${baseURL}/users/signinGoogle`,
      type: 'POST',
      data:{
        id_token
      }
    })
    .done((result) => {
      console.log(result)
    })
    .fail((err) => {
      console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }