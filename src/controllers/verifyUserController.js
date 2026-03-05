const verifyUser = require("../services/verifyUser")

const verifyUserController = async (req, res) => {
    const { token } = req.query

    try {
        await verifyUser(token)

        return res.redirect(
            "https://mini-bank-project-fe.vercel.app/login?verified=true"
        )

    } catch (err) {

        return res.redirect(
            "https://mini-bank-project-fe.vercel.app/login?verified=false"
        )
    }
}

module.exports = verifyUserController