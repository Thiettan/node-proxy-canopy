let productURL = null


document.getElementById('SubmitLink').addEventListener('click', (e) => {
    handleSubmit(e)
})


const handleSubmit = (e) => {
    e.preventDefault()
    productURL = document.getElementById('ProductLinkInput').value

    let query = `query amazonProduct {
        amazonProduct(input: {urlLookup: {url: "${productURL}"}}) {
          title
          brand
          mainImageUrl
          price {
            display
          }
          isPrime
          stockEstimate {
            availabilityMessage
            stockLevel
            inStock
          }
        }
      }
    `

    console.log(`${productURL} \n ${query}`)

    postData(query);
}


async function getData(data = {}) {
    const response = await fetch("/api", { //update path as needed
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const postData = async (query) => {
    const {
        data,
        error,
        errors
    } = await getData({
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