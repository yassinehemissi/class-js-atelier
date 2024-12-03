const yup = require("yup");


const validateUser = (schema) => async (req, res, next) => {

    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (err) {
        if (req.url.includes('create')) {
            return res.render('users/user-create', { createError: err.message, error: true });

        } else if (req.url.includes('update')) {

            return res.render('users/user-update', { updateError: err.message, error: true });
        }
        return res.status(400).json({ type: err.name, message: err.message });
    }
}


const userSchema = yup.object({
    body: yup.object({
        username: yup.string().required().min(2).max(5),
        password: yup.string().required(),
        birthday: yup.date().max(new Date()).optional()
    })
});


module.exports = { validateUser, userSchema };
