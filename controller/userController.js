import User from '../model/userModel.js';

export const create = async (req, res) => {
    try{

        const userData = new User(req.body);
        const {email} = userData;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message : "User already exists."});
        }
        const savedUser = await userData.save();
        res.status(200).json([{message: "Created new user successful."}, {"data": savedUser}]);

    }catch(error) {
        res.status(500).json({error : "Internal server error."});
    }
}

export const fetch = async (req, res) => {
    try{
         
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({message : "User not found."});
        }
        res.status(200).json(users);

    }catch(error) {
        res.status(500).json({error : "Internal server error."});
    }
}

export const update = async (req, res) => {
    try{
         
        const id = req.params.id;
        const userExist = await User.find({_id: id});
        if(!userExist){
            return res.status(404).json({message : "User not found."});
        }
        const updateUser = await User.findOneAndUpdate(id, req.body, {new:true});
        res.status(201).json([{message: "user updated successful."}, {"data": updateUser}]);

    }catch(error) {
        res.status(500).json({error : "Internal server error."});
    }
}

export const deleteUser = async (req, res) => {
    try{
         
        const id = req.params.id;
        const userExist = await User.find({_id: id});
        if(!userExist){
            return res.status(404).json({message : "User not found."});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message : "User delete successful."});

    }catch(error) {
        res.status(500).json({error : "Internal server error."});
    }
}