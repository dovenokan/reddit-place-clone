import { ref, onValue, set, get } from 'firebase/database'

function ListenData(db, path) {
    const dbRef = ref(db,path)
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        return data
    });
}

function ReadOnce(db,path) {
    const dbRef = ref(db,path)
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        }else{
            return new Error("no data")
        }
    })
}

function WriteData(db,path,data) {
    set(ref(db,path),data)
}

export {
    ListenData,
    ReadOnce,
    WriteData
}