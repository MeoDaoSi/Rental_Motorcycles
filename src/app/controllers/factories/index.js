class BaseController {
    // [POST] - Method
    createOne(Model){
        return async (req, res) => {
            const data = new Model(req.body);
            try {
                await data.save();
                res.redirect('./')
            } catch (error) {
                res.redirect('./')
            }
        }
    }
    // [GET] - Method
    getAll(Model){
        return async (req, res) => {
            try {
                const data = await Model.find();
                if(!data){
                    res.redirect('/')
                }
                res.render(Model.modelName,{
                    locations: data
                });
            } catch (error) {
                res.redirect('/')
            }
        }
    }
    // [GET] - Method
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
    // [PATCH] - Method
    edit(Model){
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
    // [DELETE] - Method
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

module.exports = new BaseController