import { Request, Response } from "express"

export class Routes {
    public routes(app: any): void {
        app.route("/").get(async (req: Request, res: Response) => {
            res.json(req.body)
        })
    }
}