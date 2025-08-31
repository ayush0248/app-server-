import Product from '../models/Product.js'; // Adjust the path as necessary

const getProductsByCategoryId = async (req, res) => {
      const { categoryId } = req.params;

        try {
            // Assuming you have a Product model to fetch products from the database
            const products = await Product.find({ category: categoryId });

            if (!products || products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found for this category",
                });
            }
            res.status(200).json({
                success: true,
                products,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch products",
                error: err.message,
            });
        }
    }

    export { getProductsByCategoryId };