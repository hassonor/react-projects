const express = require("express");
const {getAllSubscriptions, getSubscriptionById, updateSubscriptionById,
    deleteSubscriptionById, addSubscription,
    addMovieToSubscription, removeMovieToSubscription,
    removeMovieFromAllSubscription,getListOfWatchedMoviesByMemberId, getSubscriptionsWithMovieById,getSubscriberByMemberId
}
    = require("../controller/subscriptions-controller");

const router = express.Router();

router.get("/subscriptions", getAllSubscriptions);
router.get("/subscriptions/:_id", getSubscriptionById);
router.get("/subscriptions/by-movie/:_id",getSubscriptionsWithMovieById)
router.get("/subscriptions/by-member/:_id",getListOfWatchedMoviesByMemberId)
router.get("/subscriptions/get-subscriber-by-id/:_id",getSubscriberByMemberId)
router.post("/subscriptions",addSubscription);
router.delete("/subscriptions/:_id", deleteSubscriptionById);
router.put("/subscriptions/:_id", updateSubscriptionById);
router.put("/add/movie/subscriptions/:_id", addMovieToSubscription);
router.put("/remove/movie/subscriptions/:_id", removeMovieToSubscription);
router.put('/remove/movie/all/subscriptions',removeMovieFromAllSubscription)

module.exports = router;
