export default function swDev() {

    function urlBase64ToUnit8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4)
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/')

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; i++) {
            outputArray[i] = rawData.charCodeAt(i)

        }
        return outputArray
    }

    function determineAppServerKey() {
        var vapidPublicKey = 'BJ8zP3VW6CquEToHRDVP6LRIGEtEXzJM1Qb63MUWHnJnd-0trcuxhRI6wHwnVxTkHr65J1RaFwc5q_gpMsPOpzQ'
        return urlBase64ToUnit8Array(vapidPublicKey)
    }

    let swURL = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swURL).then(res => {
        console.log("res", res)
        res.pushManager.getSubscription().then(subscription => {
            return res.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: determineAppServerKey()
            })
        })
    }).catch(err => {
        console.error(err)
    })
}