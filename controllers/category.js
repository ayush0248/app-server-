import category from "../models/category.js";

const getAllCategories = async (req, res) => {
    try {
        const categories = await category.find();
        res.status(200).json({
            success: true,
             categories,
        });

    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: "Error fetching categories", error: error.message,
            error: err.message,
        });
    }
  };

  export { getAllCategories };