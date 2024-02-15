const asin = 'B0CGXZQ4CD'

const query = `
  query amazonProduct {
    amazonProduct(input: {asin: "${asin}"}) {
      title
      mainImageUrl
      rating
      price {
        display
      }
    }
  }
`

async function getExampleData(data = {}) {
    const response = await fetch("/api", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const runExample = async () => {
    const {
        data,
        error,
        errors
    } = await getExampleData({
        query
    });
    if (errors) {
        errors.forEach((e) => console.log(e.message));
    }
    if (!data && !error) {
        const warning = `Replace <YOUR_API_KEY> with your API key from the Canopy Dashboard`;
        document.getElementById("app").innerHTML = warning;
        console.warn(warning);
        return;
    }
    const {
        amazonProduct
    } = data;
    console.log(amazonProduct);
};

console.log("running");
runExample();

/* const postData = () => {
    fetch(
            "/api", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
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
}
postData() */