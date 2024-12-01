const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const historyschema = new Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    historyData: [
        {
            title: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                rrequired: true,
            },
            time: {
                type: Date,
                default: Date.now,
                required: true
            }
        }
    ]
});

const history_model = mongoose.model("History", historyschema);

export { history_model };