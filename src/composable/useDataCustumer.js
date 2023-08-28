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
        custumer,
        formatingPrice,
        totalPayments,
        docRef
    }
}