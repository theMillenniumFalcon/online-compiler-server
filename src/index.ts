import 'dotenv-safe/config';
import cors from "cors";
import express from "express";
import { CustomRequest, CustomResponse } from "./types/types";
import axios from 'axios';

const PORT = parseInt(process.env.PORT)

const main = async () => {

    const app = express()
    app.use(express.json())
    app.get('/:githubId', async (req: CustomRequest, res: CustomResponse) => {
        const { githubId } = req.params
        res.header("Content-Type", "application/json")
        const { data: userData } = await axios.get(
            `https://api.github.com/users/${githubId}`
        )

        const { blog, location, bio, public_repos } = userData
        return res.json({
            blog,
            location,
            bio,
            publicRepos: public_repos
        })
    })

    app.set("trust proxy", 1)

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))

    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

    app.get('/', (_: any, res: any) => {
        res.send("Server is working fine!")
    })

    process.on('unhandledRejection', (err, _) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})