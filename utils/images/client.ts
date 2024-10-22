import { createWorker } from 'tesseract.js';

//extract text from an image using tesseract
export const extractImageText = async (file: File) => {
    console.log(file);
    //TODO: validate url
    return new Promise<string>(async (resolve, reject) => {
        const worker = await createWorker('eng');
        const ret = await worker.recognize(file);
        console.log(ret.data.text);
        await worker.terminate();

        if (ret.data.text) {
            resolve(ret.data.text);
        }
        else {
            reject("Unable to process image");
        }
    })
}

export const convertImageToDataUrl = (blob: Blob | File) => {

    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            console.log(fileReader.result);
            resolve(fileReader.result);

        }
        fileReader.onerror = () => { reject("unable to read file") };
        fileReader.readAsDataURL(blob);
    })

}