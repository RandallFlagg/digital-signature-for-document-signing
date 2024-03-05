import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default async function sign() {
    console.log(process.cwd());
    console.log(import.meta.url);
    console.log(fileURLToPath(import.meta.url));
    console.log(path.dirname(fileURLToPath(import.meta.url)));
    const doc2 = await fs.promises.readFile('./sample-doc.txt');
    const doc1 = fs.readFileSync('sample-doc.txt');
    // See keys/README.md on how to generate this key
    const private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');

    // File/Document to be signed
    const doc = fs.readFileSync('sample-doc.txt');

    // Signing
    const signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();

    // Returns the signature in output_format which can be 'binary', 'hex' or 'base64'
    const signature = signer.sign(private_key, 'base64')

    console.log('Digital Signature: ', signature);

    // Write signature to the file `signature.txt`
    fs.writeFileSync('signature.txt', signature);
}