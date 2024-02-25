let cartData=[ {
    "id": 316,
    "title": "favorite Smoke Shirt",
    "original_src": "https://www.fwrd.com/product-amiri-smoke-shirt-in-white/AMIF-MS320/?d=Mens&itrownum=16&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/AMIF-MS320_V1.jpg",
    "brand": "Amiri",
    "description": "Smoke Shirt",
    "price": 60678,
    "price_sale": "",
    "gender": "male",
    "category": "clothing",
    "quantity":3
  },
  {
    "id": 317,
    "title": "favorite Carpenter Jean",
    "original_src": "https://www.fwrd.com/product-amiri-carpenter-jean-in-storm-grey/AMIF-MJ361/?d=Mens&itrownum=16&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/AMIF-MJ361_V1.jpg",
    "brand": "Amiri",
    "description": "Carpenter Jean",
    "price": 90602,
    "price_sale": 40812,
    "gender": "male",
    "category": "clothing",
    "quantity":1
  },
  {
    "id": 318,
    "title": "favorite Bones Jacket",
    "original_src": "https://www.fwrd.com/product-amiri-bones-jacket-in-rain-forest/AMIF-MO157/?d=Mens&itrownum=16&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/AMIF-MO157_V1.jpg",
    "brand": "Amiri",
    "description": "Bones Jacket",
    "price": 140475,
    "price_sale": "",
    "gender": "male",
    "category": "clothing",
    "quantity":2
  },
  {
    "id": 319,
    "title": "favorite Zip Up Hoodie",
    "original_src": "https://www.fwrd.com/product-thom-browne-zip-up-hoodie-in-black/TMBX-MK187/?d=Mens&itrownum=17&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/TMBX-MK187_V1.jpg",
    "brand": "Thom Browne",
    "description": "Zip Up Hoodie",
    "price": 98914,
    "price_sale": "",
    "gender": "male",
    "category": "clothing",
    "quantity":1
  },
  {
    "id": 320,
    "title": "favorite Hairy Light Polo",
    "original_src": "https://www.fwrd.com/product-ami-hairy-light-polo-in-taupe/AMI-MK14/?d=Mens&itrownum=17&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/AMI-MK14_V1.jpg",
    "brand": "ami",
    "description": "Hairy Light Polo",
    "price": 49872,
    "price_sale": "",
    "gender": "male",
    "category": "clothing",
    "quantity":2
  }
  ];

  const cartDataString = JSON.stringify(cartData);
  localStorage.setItem('cartData', cartDataString);

  let cartContainer = document.getElementById("cartContainer");

  function appendData() {
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    cartContainer.innerHTML = "";

    cartData.forEach(item => {
      let cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item';

      let image = document.createElement("div");
      image.className="imagediv";

      let imageElement = document.createElement('img');
      imageElement.src = item.image;
      imageElement.alt = item.title;

      image.append(imageElement);

      let content = document.createElement("div");
      
      let titleElement = document.createElement('h1');
      titleElement.className="productname";
      titleElement.textContent = item.title.charAt(0).toUpperCase() + item.title.slice(1);
      
      let priceElement = document.createElement('h3');
      priceElement.textContent = `Price: ₹${item.price}`;
        
      let quantity = document.createElement('h3');
      quantity.textContent = `Quantity: ${item.quantity}`;

      let total = document.createElement('h2');
      total.textContent = `Total: ₹${item.price*item.quantity}`;
        
      content.append(titleElement,priceElement, quantity,total);

      cartItemDiv.append(image,content);
     
      cartContainer.append(cartItemDiv);
    });
  }

  appendData();
