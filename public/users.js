const url = '/api'
//POST with fetch()

fetch(
        url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Tom'
            })
        }
    ).then((res) => {
        console.log(res)
        if (res.ok) {
            return res.json()
        } else {
            alert(res.ok)
        }
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))