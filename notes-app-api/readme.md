## notes API


## body schema for requests

userRegister = {
    "username": "",
    "email": "",
    "password": ""
}

userLogin = {
    "email": "",
    "password": ""
}


## End points

/api/notes POST  -add new note
/api/notes GET  -get all notes

/api/notes/:id PUT  -update a note
/api/notes/:id DELETE  -delete a note

/api/user/register POST  -register new user
/api/user/login POST  -login for a user
/api/user/current GET  -current user info
