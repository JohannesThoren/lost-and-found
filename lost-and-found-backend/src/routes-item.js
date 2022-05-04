
module.exports = (app) => {

    // add a new item to the database
    // the token is the user specific token which is assigned to a specific user
    app.post("/item/:token", (req,res) => {});

    // all items contains an id, this id is used to get the information.
    // when a request is made this function will return contact information belonging to the owner of the lost item
    app.get('/item/:id', (req, res) => {});


}