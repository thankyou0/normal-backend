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

const History = mongoose.model("History", historyschema);
export {History};