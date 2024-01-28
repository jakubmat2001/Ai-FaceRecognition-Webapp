const clarifai = require('clarifai');
const app = new clarifai.App({
    apiKey: "6f5095d9e98d4dc69ee3dbf2e0fec352"
})

const handleImageURL = (req, res) => {
    app.models.predict("face-detection", req.body.input)
     .then(data => {
         res.json(data);
     }).catch(err => {
         res.status(400).json("Failed to work with API.");
     });
 }


// Get the loged-in user, and increase their entry count by 1 for every face detection
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id).increment(
        'entries', 1
    )
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        }).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleImageURL: handleImageURL
}