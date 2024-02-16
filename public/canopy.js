let productURL = null
let canopyData = null

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

    postData(query).then(() => {
        renderResults(canopyData)
    });
}

const renderResults = (data) => {
    document.getElementById('ProductImage').setAttribute('src', data.mainImageUrl)
    document.getElementById('ProductTitle').innerHTML = `<span>${data.title}</span>`
    document.getElementById('Brand').innerHTML = `<span>${data.brand}</span>`
    document.getElementById('ProductPrice').innerHTML = `<span>${data.price.display}</span>`
    document.getElementById('IsPrime').innerHTML = `Prime: <span>${data.isPrime}</span>`
    document.getElementById('AvailablityMsg').innerHTML = `<span>${data.stockEstimate.availabilityMessage}</span>`
    document.getElementById('InStock').innerHTML = data.stockEstimate.inStock ? `<span>In stock</span>` : `<span>Out of stock</span>`
    document.getElementById('StockLevel').innerHTML = `Stock Level: <span>${data.stockEstimate.stockLevel}</span>`
}

const getData = async (data = {}) => {
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
    canopyData = amazonProduct
    return amazonProduct
};