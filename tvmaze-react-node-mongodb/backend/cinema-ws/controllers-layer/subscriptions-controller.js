const logic = require("../business-logic-layer/subscriptions-logic");

export const getAllSubscriptions = async (req, res)=>{
    try{
        const subscriptions = await logic.getAllSubscriptionsAsync();
        res.json(subscriptions);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

export const getSubscriptionById = async (req, res) => {
    try {
        const _id = req.params._id;
        let data = await  logic.getSubscriptionByIdAsync(_id);
        if(!data) return res.json("No subscription were found.");
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const updateSubscriptionById = async (req, res) => {
    try {
        let _id = req.params._id
        let subscriptionToUpdate = req.body;
        let data = await logic.updateSubscriptionByIdAsync(_id, subscriptionToUpdate);
        return res.json(data)
    } catch (err) {
        return res.status(500).send("Subscription update failed.");
    }
};

export const deleteSubscriptionById = async (req, res) => {
    try {
        const _id = req.params._id
        let status = await logic.deleteSubscriptionByIdAsync(_id);
        return res.json(status);
    } catch (err) {
        return  res.status(500).send(err.message);
    }
};

export const addSubscription = async (req, res) => {
    try {
        let newSubscriptionToAdd = req.body
        let data = await logic.addSubscriptionAsync(newSubscriptionToAdd)
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


export const addMovieToSubscription = async (req, res) => {
    try {
        const {_id} = req.params;
        const {movieId, date} = req.body;

        if(date === null){
            let nowDate = new Date();
            nowDate = nowDate.toISOString();
            date = nowDate;
        }
        
        const movieToAdd = {
            movieId,
            date
        }
        let data = await logic.addMovieToSubscriptionAsync(_id,movieToAdd)
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const removeMovieToSubscription = async (req, res) => {
    try {
        const {_id} = req.params;
        const {movieId} = req.body;
        let data = await logic.removeMovieFromSubscriptionAsync(_id,movieId)
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const removeMovieFromAllSubscription = async (req, res) => {
    try {
        const {movieId} = req.body;
        let data = await logic.removeMovieFromAllSubscriptionAsync(movieId)
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const getSubscriptionsWithMovieById = async (req, res) => {
    try {
        const {_id} = req.params;
        let data = await logic.findAllMembersFromSubscriptionsForMovieByIdAsync(_id)
        return res.json(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

export const getListOfWatchedMoviesByMemberId = async (req, res) =>{
    try{
        const {_id} = req.params;
        console.log(_id);
        let data = await logic.findAllWatchedMoviesForSubscriptionByMemberAsync(_id)
        if(!data){
            return res.status(500).send("Error Occurred.");
        }
        return res.json(data)
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err.message);
    }
}


export const getSubscriberByMemberId = async (req,res) =>{
    try{
        const {_id} = req.params;
        let data = await logic.findSubscriberByMemberIdAsync(_id)
        if(data === []){
            return res.status(422).send("Subscriber not found.");
        }
        return res.json(data);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

