import { computed } from "vue"

export default function name() {

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
        formatingPrice,
        totalPayments
    }
}