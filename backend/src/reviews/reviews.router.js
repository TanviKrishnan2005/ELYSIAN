const express = require('express')
const Reviews = require('./review.model')
const router = express.Router();
const Products = require('../products/products.model')

//post a new reviw
router.post("/post-review", async (req, res) => {
    try {
        const { Comment, rating, productId, userId } = req.body;

        if (!Comment || !rating || !productId || !userId) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const existingReview = await Reviews.findOne({ productId, userId });

        if (existingReview) {
            //update review
            existingReview.Comment = Comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            //create
            const newReview = new Reviews({
                Comment, rating, productId, userId
            })
            await newReview.save();
        }

        //calculate avg rating
        const reviews = await Reviews.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const product = await Products.findById(productId);

            if (product) {
                product.rating = averageRating;
                await product.save({ validateBeforeSave: false });
            } else {
                return res.status(404).send({ message: 'Product not found' })
            }
        }
        res.status(200).send({
            message: 'Review processed successfully',
            reviews: reviews
        })

    } catch (error) {
        console.error("Error posting review", error);
        res.status(500).send({ message: "Failed to post review" });
    }
});

//total review count
router.get("/total-review", async (req, res) => {
    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({ totalReviews })
    } catch (error) {
        console.error("Error gettting total review", error);
        res.status(500).send({ message: "Failed to get total review" });
    }
})

//get reviews by user
router.get("/userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).send({ message: "User ID is required" });
    }
    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({totalReviews})
    } catch (error) {
        console.error("Error fetching review by user", error);
        res.status(500).send({ message: "Failed to fetch reviews by user" });

    }
})


module.exports = router