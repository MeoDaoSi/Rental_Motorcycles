class ControllerMethod {
    // create one data in model
    createOne(Model){
        return async (req, res) => {
            const data = await new Model(req.body);
            try {
                console.log(data);
                if(!data){
                    res.status(500).json('error');
                }
                await data.save();
                res.status(201).json(data);
            } catch (error) {
                res.status(400).json(error);
            }
        }
    }
    // get all data from the model
    getAll(Model){
        return async (req, res) => {
            try {
                const data = await Model.find();
                if(!data){
                    res.status(500).json('error');
                }
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json('error');
            }
        }
    }
    getOne(Model){
        return async (req, res) => {
            const _id = req.params.id;
            try {
                const data = await Model.findById(_id);
                if(!data){
                    return res.status(400).json('error');
                }
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json('error');
            }
        }
    }
    // edit data from model
    editOne(Model){
        return async (req, res) => {
            const _id = req.params.id
            const updates = Object.keys(req.body);
            try {
                const data = await Model.findById(_id);
                updates.forEach((update) => {
                    data[update] = req.body[update];
                })
                await data.save();
                res.status(201).json(data);
            } catch (error) {
                res.status(500).json('error');
            }
        }
    }
    // delete data in model
    deleteOne(Model){
        return async (req, res) => {
            const _id = req.params.id;
            try {
                const user = await Model.findOneAndDelete({ _id });
                res.status(200).json('delete successfully!');
            } catch (error) {
                res.status(500).json('error');
            }
        }
    }

}

module.exports = new ControllerMethod