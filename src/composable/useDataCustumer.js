import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useDocument } from 'vuefire';
import { computed, watch, } from "vue"
import { useDataCustumerStore } from '../stores/dataCustumer';


export default function dataCustumer() {
    let dataCustumer;

    //Obterner al custumer
    const db = useFirestore();
    const docRef = doc(db, "custumer-data", "koVnsbCCh5aKHbUWHbfr");
    const custumer = useDocument(docRef)

    watch(custumer, (newCustumer) => dataCustumer = newCustumer)


    //Store dta custumer
    const dataCustumerStore = useDataCustumerStore()


    //Modificacion del custumer
    const modificationCustumer = async () => {
        const { apto, ...dataDb } = dataCustumer
        const data = {
            ...dataDb,
            apto: dataCustumerStore.urlImage
        }
        await updateDoc(docRef, data)
    }

    const uploadModificationsCustumer = async (fieldName, newValue) => {
        const { modification, ...dataDb } = dataCustumer
        const newModification = [
            ...modification,
            {
                person: 'andrea',
                modificationDate: new Date,
                modification: newValue,
                fieldName
            }
        ]
        const data = {
            ...dataDb,
            modification: newModification
        }
        await updateDoc(docRef, data)
    }

    const uploadAptoAprouval = async ({ aptoCaducidad, check }) => {
        const { checkapto, ...dataDb } = dataCustumer
        const data = {
            ...dataDb,
            checkapto: check,
            validityAptoDate: aptoCaducidad
        }
        await updateDoc(docRef, data)
    }

    //helpers
    const formatingPrice = computed(() => {
        return (value) =>
            Number(value).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
    })

    const totalPayments = computed(() => {
        return (payment) =>
            payment.map(e => e.mount).reduce((total, payment) => { return +payment + total }, 0);
    })



    return {
        modificationCustumer,
        uploadModificationsCustumer,
        custumer,
        formatingPrice,
        uploadAptoAprouval,
        totalPayments,
        docRef
    }
}