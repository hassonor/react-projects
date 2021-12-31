require("../data-access-layer/dal");
const Subscription = require("../models/subscription-model");

const getAllSubscriptionsAsync = () => {
    return new Promise((resolve, reject) => {
        Subscription.find({}, async (err, subscriptions) => {
            if (err) {
                reject(err);
            } else {
                resolve(subscriptions)
            }
        })
    })
}

const getSubscriptionByIdAsync = (_id) => {
    return new Promise((resolve, reject) => {
        Subscription.findById({_id}, (err, subscription) => {
            if (err) {
                reject(err);
            } else {
                resolve(subscription);
            }
        });
    })
}

const updateSubscriptionByIdAsync = (_id, subscriptionToUpdate) => {
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndUpdate(_id,
            {
                memberId: subscriptionToUpdate.memberId,
                movies: subscriptionToUpdate.movies,
            }, (err) => {
                if (err)
                    reject(err)
                else
                    resolve("Subscription was Successfully Updated");
            })
    })
}

const deleteSubscriptionByIdAsync = (id) => {
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Subscription were deleted successfully!");
            }
        })
    })
}

const addSubscriptionAsync = (subscriptionToAdd) => {
    let newSubscriptionToAdd = new Subscription({
        memberId: subscriptionToAdd.memberId,
        movies: subscriptionToAdd.movies,
    });
    return newSubscriptionToAdd.save();
}

const addMovieToSubscriptionAsync = (_id, movieWithDateToAdd) =>{
        return Subscription.findByIdAndUpdate(_id, {
            $push: {movies: movieWithDateToAdd},
        }, {new : true}).exec();
}

const removeMovieFromSubscriptionAsync = (_id, movieId) =>{
    return Subscription.findByIdAndUpdate(_id, {
        $pull: {movies: {movieId}},
    }, {new : true}).exec();
}


const removeMovieFromAllSubscriptionAsync = (_id) =>{
    return Subscription.updateMany({},{
        $pull: {movies: {movieId: {$in: _id}}},
    }, { multi: true, upsert: true ,new : true}).exec();
}

const findAllMembersFromSubscriptionsForMovieByIdAsync = (_id) =>{
    return Subscription.find({"movies.movieId": _id}).exec();
}

const findAllWatchedMoviesForSubscriptionByMemberAsync = (_id) =>{
    return Subscription.find({"memberId": _id}).select("movies.movieId movies.date _id").exec();
}


const findSubscriberByMemberIdAsync = (_id) =>{
    return Subscription.find({"memberId": _id}).exec();
}


module.exports = {
    getAllSubscriptionsAsync,
    getSubscriptionByIdAsync,
    updateSubscriptionByIdAsync,
    deleteSubscriptionByIdAsync,
    addSubscriptionAsync,
    addMovieToSubscriptionAsync,
    removeMovieFromSubscriptionAsync,
    removeMovieFromAllSubscriptionAsync,
    findAllMembersFromSubscriptionsForMovieByIdAsync,
    findAllWatchedMoviesForSubscriptionByMemberAsync,
    findSubscriberByMemberIdAsync
};
