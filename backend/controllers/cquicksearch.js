// const quickSearch_model = require("../models/mquicksearch");

import { quickSearch_model } from "../models/mquicksearch.js";

const getQuickSearch = async (req, res) => {

  // console.log("getQuickSearch");

  // try {

  const user_id = req.user.id;

  if (!user_id) {
    return res.status(210).json({ success: false, message: "User id is required" });
  }

  const quickSearchUser = await quickSearch_model.findOne({ user_id });

  // console.log("quickSearchUser", quickSearchUser);

  if (!quickSearchUser) {
    return res.status(210).json({ success: false, message: "No quick search found for the user" });
  }

  // console.log("quickSearchUser.quickSearchText", quickSearchUser.quickSearchText);


  res.status(202).json({ success: true, quickSearchText: quickSearchUser.quickSearchText });

  // } catch (error) {
  //   res.status(210).json({ message: error.message });
  // }
}



const addQuickSearch = async (req, res) => {
  try {
    const user_id = req.user.id; // Extract user ID from the request (e.g., via middleware)

    // Validate the user_id
    if (!user_id) {
      return res.status(210).json({ success: false, message: "User ID is required." });
    }

    const { quickSearchTextFromFrontend } = req.body;

    // Validate quickSearchTextFromFrontend
    if (!quickSearchTextFromFrontend) {
      return res.status(210).json({ success: false, message: "Quick Search Text is required." });
    }

    // Check if the user already has a quick search entry
    let quickSearchUser = await quickSearch_model.findOne({ user_id });

    if (!quickSearchUser) {
      // If no quickSearch record exists, create a new one
      const newQuickSearch = new quickSearch_model({
        user_id,
        quickSearchText: [quickSearchTextFromFrontend], // Add the new quick search text
      });

      await newQuickSearch.save();

      return res
        .status(202)
        .json({ success: true, message: "Quick Search added successfully." });
    }

    // If quickSearchUser exists, append the new text to the existing array
    quickSearchUser.quickSearchText.push(quickSearchTextFromFrontend);

    await quickSearchUser.save();

    return res
      .status(202)
      .json({ success: true, message: "Quick Search updated successfully." });
  } catch (error) {
    // Catch any errors and return a response
    return res.status(210).json({ success: false, message: error.message });
  }
};



const deleteQuickSearch = async (req, res) => {
  try {
    const user_id = req.user.id; // Extract user ID from the request (e.g., via middleware)

    // Validate the user_id
    if (!user_id) {
      return res.status(210).json({ success: false, message: "User ID is required." });
    }

    const { quickSearchTextFromFrontend } = req.body;

    // Validate quickSearchTextFromFrontend
    if (!quickSearchTextFromFrontend) {
      return res.status(210).json({ success: false, message: "Quick Search Text is required." });
    }

    // Find the user's quick search record
    const quickSearchUser = await quickSearch_model.findOne({ user_id });

    if (!quickSearchUser) {
      // If no record exists, return an error response
      return res
        .status(210)
        .json({ success: false, message: "No quick search found for the user." });
    }

    // Filter out the quick search text to be deleted
    const updatedQuickSearchText = quickSearchUser.quickSearchText.filter(
      (text) => text !== quickSearchTextFromFrontend
    );

    // Check if the quick search text existed in the user's list
    if (updatedQuickSearchText.length === quickSearchUser.quickSearchText.length) {
      return res.status(210).json({
        success: false,
        message: "The specified quick search text was not found.",
      });
    }

    // Update the quick search text array
    quickSearchUser.quickSearchText = updatedQuickSearchText;

    // Save the updated record
    await quickSearchUser.save();

    return res
      .status(202)
      .json({ success: true, message: "Quick Search deleted successfully." });
  } catch (error) {
    // Catch any errors and return a response
    return res.status(210).json({ success: false, message: error.message });
  }
};




// module.exports = { addQuickSearch, deleteQuickSearch, getQuickSearch };

export { addQuickSearch, deleteQuickSearch, getQuickSearch };
// const temp = { addQuickSearch, deleteQuickSearch, getQuickSearch };

// export default temp;
