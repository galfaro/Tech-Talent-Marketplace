import { AddSchema } from "./Schemas/add";
import mongoose from "mongoose";

const Add = mongoose.model("Add", AddSchema);

//Updates the add info that are edited. Ignores the other key & values with the $set operator
export const EditAdd = async (req, res) => {
  const updatedAddInfo = req.body;
  const { id } = req.params;
  try {
    const updatedAdd = await Add.findByIdAndUpdate(
      id,
      { $set: updatedAddInfo },
      { new: true }
    );
    if (updatedAdd) {
      res.status(200).json({ response: updatedAdd, success: true });
    } else {
      res.status(404).json({ response: "Add not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export const GetSingleAdd = async (req, res) => {
  const { id } = req.params;

  try {
    const singleAdd = await Add.findById(id).populate("user", {
      username: 1,
      email: 1,
    });
    if (singleAdd) {
      res.status(200).json({ response: singleAdd, success: true });
    } else {
      res.status(404).json({ response: "Add not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid add ID", success: false });
  }
};

export const DeleteAdd = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAdd = await Add.findByIdAndDelete(id);
    res.status(200).json({ response: deleteAdd, success: true });
  } catch (error) {
    res.status(400).json({ error: "Add id not found!", success: false });
  }
};

//RegExp to search for queries in frontend
export const GetAllAdds = async (req, res) => {
  const { title, description } = req.query;
  let today = new Date();
  let last30days = new Date(today.setDate(today.getDate() + 30));
  try {
    const allAdds = await Add.find({
      title: new RegExp(title, "i"),
      description: new RegExp(description, "i"),
      // createdAt: createdAt + 30 < today,
      createdAt: { $lt: today, $lt: last30days },
    })
      .sort({ createdAt: "desc" }) //sorterar
      .populate("user", {
        username: 1,
        email: 1,
      });
    res.status(201).json({ response: allAdds, success: true });
  } catch (error) {
    res.status(400).json({ error: "No adds found!", success: false });
  }
};
