const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await db("accounts").select())
	} catch (err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		res.json(await db("accounts").where("id", req.params.id))
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
    const account = {
        name: req.body.name,
        budget: req.body.budget
    }
    try {
        await db("accounts").insert(account)
        res.json(await db("accounts").where("name", req.body.name).first())
    } catch (err) {
        next(err)
    }
})

router.put("/edit/:id", async (req, res, next) => {
    const updatedAccount = {
        name: req.body.name,
        budget: req.body.budget
    }
    console.log(updatedAccount)
    try {
        await db("accounts").where("id", req.params.id).update(updatedAccount)
        res.json(await db("accounts").where("id", req.params.id).first())
    } catch (err) {
        next(err)
    }
})

router.delete('/remove/:id', async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})



module.exports = router;