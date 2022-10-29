import vision from "@google-cloud/vision"

export default function detectHandwritingOCR(fileBuffer: Buffer): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const client = new vision.ImageAnnotatorClient()

        const request = {
            feature: {
                languageHints: ["en-t-i0-handwrit"],
            },
            image: {
                content: fileBuffer,
            },
        }

        try {
            const results = await client.documentTextDetection(request)
            const { fullTextAnnotation } = results[0]
            resolve(fullTextAnnotation.text)
        } catch (error) {
            console.error("[ERROR]: ", error)
            reject(error)
        }
    })
}