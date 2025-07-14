console.log("This is js")

const cust = new CustomEvent("custom-event", {
    detail: {msg: 'this is generated from custom event', status: true},
    bubbles: true,
    composed: true
})


const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    // dispatch the custom event
    console.log("Btn clicked")
    btn.dispatchEvent(cust)
})

btn.addEventListener('custom-event', (e) => {
    console.log("Recieved data from custom event")
    console.log("Data-",e.detail)
})