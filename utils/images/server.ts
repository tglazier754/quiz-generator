import { createWorker } from 'tesseract.js';

//extract text from an image using tesseract
export const extractImageText = async (imageUrl: string) => {
    console.log(imageUrl);
    //TODO: validate url
    const worker = await createWorker('eng');
    const ret = await worker.recognize(imageUrl);
    console.log(ret.data.text);
    await worker.terminate();
    return ret.data.text;
}
