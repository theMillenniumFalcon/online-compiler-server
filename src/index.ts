import 'dotenv-safe/config';
import cors from "cors";
import express from "express";
import { CustomRequest, CustomResponse, JdoodleStruct } from "./types/types";
import detectHandwritingOCR from './utils/detectHandwritingOCR';
import getOutputFromCode from './utils/getOutputFromCode';

const PORT = parseInt(process.env.PORT)

const uploadHelper = (upload: any) => {
    upload.single("file")
}

const main = async () => {

    const app = express()
    app.use(express.json())
    app.get("/", async (req: CustomRequest, res: CustomResponse) => {
        res.json(req.body)
    })
    app.post("/getText", uploadHelper, async (req: CustomRequest, res: CustomResponse) => {
        try {
            const text = await detectHandwritingOCR(req.file.buffer)
            return res.json({ text })
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({ message: "Something went wrong." })
        }
    })
    app.post("/getOutput", async (req: CustomRequest, res: CustomResponse) => {
        try {
            const program: JdoodleStruct = {
                clientId: process.env.JDOODLE_CLIENT_ID,
                clientSecret: process.env.JDOODLE_CLIENT_SECRET,
                language: req.body.lang_code,
                script: req.body.code,
                stdin: req.body.stdin ? req.body.stdin : "",
                versionIndex: req.body.lang_ver,
            }

            const output = await getOutputFromCode(program)
            return res.json({ output })
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({ message: "Something went wrong." })
        }
    })

    app.set("trust proxy", 1)

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))

    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

    process.on('unhandledRejection', (err, _) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})