var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let userEmail = userDoc.data().email;
                            let userName = userDoc.data().name;
                            // let userPassword = userDoc.data().password;

                            //if the data fields are not empty, then write them in to the form.
                            if (userEmail != null) {
                                document.getElementById("userEmail").value = userEmail;
                            }
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
                            // if (userPassword != null) {
                            //     document.getElementById("cityInput").value = userPassword;
                            // }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

function saveUserInfo() {
    //a) get user entered values
    document.getElementById("userEmail").value = user.email;
    document.getElementById("nameInput").value = user.displayName;
    
    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        email: userEmail,
    })
    .then(() => {
        console.log("Document succesfully updated!");
    })
    
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}