import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';
import service_account from '../service_account.json' assert { type: 'json' }

export async function getSecrets(req,res) {
    //first check if they are sending a token
    if(!req.headers && !req.headers.authorization){
        res.status(403).send({ message: 'Forbidden' })
        return
    }
    //connect to firebase
initializeApp({
    credential: cert(service_account)
})
    //validate token
const decoded = await getAuth().verifyIdToken(req.headers.authorization)
if(!decoded) {
    res.status(403).send({ message: 'Forbidden' })
    return
}

res.send({ message: 'This is top secret!'})
}