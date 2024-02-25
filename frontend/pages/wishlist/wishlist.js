let wishlistData=[ {
    "id": 18,
    "title": "favorite Veranera Dress",
    "original_src": "https://www.fwrd.com/product-maygel-coronel-veranera-dress-in-white/MAYF-WD8/?d=Womens&itrownum=6&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/MAYF-WD8_V1.jpg",
    "brand": "Maygel Coronel",
    "description": "Veranera Dress",
    "price": 42392,
    "price_sale": "",
    "gender": "female",
    "category": "clothing"
  },{
    "id": 52,
    "title": "favorite Ballerina Flat",
    "original_src": "https://www.fwrd.com/product-alaa-ballerina-flat-in-laque/ALIA-WZ148/?d=Womens&itrownum=1&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/ALIA-WZ148_V1.jpg",
    "brand": "ALAÏA",
    "description": "Ballerina Flat",
    "price": 103902,
    "price_sale": "",
    "gender": "female",
    "category": "shoes"
  },{
    "id": 27,
    "title": "favorite Ayla Baggy Cuffed Crop",
    "original_src": "https://www.fwrd.com/product-citizens-of-humanity-ayla-baggy-cuffed-crop-in-voila/CITI-WJ1803/?d=Womens&itrownum=9&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/CITI-WJ1803_V1.jpg",
    "brand": "Citizens of Humanity",
    "description": "Ayla Baggy Cuffed Crop",
    "price": 22276,
    "price_sale": "",
    "gender": "female",
    "category": "clothing"
  }, {
    "id": 105,
    "title": "favorite Fantaisie Hobo Bag",
    "original_src": "https://www.fwrd.com/product-saint-laurent-fantaisie-hobo-bag-in-naturale-brick/SLAU-WY1955/?d=Womens&itrownum=3&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/45s/SLAU-WY1955_V1.jpg",
    "brand": "Saint Laurent",
    "description": "Fantaisie Hobo Bag",
    "price": 157099,
    "price_sale": "",
    "gender": "female",
    "category": "bags"
  }, {
    "id": 303,
    "title": "favorite Fleece Pant Relaxed",
    "original_src": "https://www.fwrd.com/product-polo-ralph-lauren-fleece-pant-relaxed-in-polo-black/PLAU-MP7/?d=Mens&itrownum=11&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/PLAU-MP7_V1.jpg",
    "brand": "Polo Ralph Lauren",
    "description": "Fleece Pant Relaxed",
    "price": 10390,
    "price_sale": "",
    "gender": "male",
    "category": "clothing"
  },
  {
    "id": 304,
    "title": "favorite Fleece Full-Zip Hoodie",
    "original_src": "https://www.fwrd.com/product-polo-ralph-lauren-fleece-fullzip-hoodie-in-polo-black/PLAU-MK28/?d=Mens&itrownum=12&itcurrpage=1&itview=05",
    "image": "https://is4.fwrdassets.com/images/p/fw/p/PLAU-MK28M_V1.jpg",
    "brand": "Polo Ralph Lauren",
    "description": "Fleece Full-Zip Hoodie",
    "price": 10390,
    "price_sale": "",
    "gender": "male",
    "category": "clothing"
  },
  ];

  const wishlistDataString = JSON.stringify(wishlistData);
  localStorage.setItem('wishlistData', wishlistDataString);

  let wishlistContainer = document.getElementById("wishlistContainer");

  function appendData() {
    let wishlistData = JSON.parse(localStorage.getItem('wishlistData')) || [];

    wishlistContainer.innerHTML = "";

    wishlistData.forEach(item => {
      let wishlistItemDiv = document.createElement('div');
      wishlistItemDiv.className = 'wishlist-item';

      let titleElement = document.createElement('h2');
      titleElement.className="productname";
      titleElement.textContent = item.title.charAt(0).toUpperCase() + item.title.slice(1);
      
      let image = document.createElement("div");
      image.className="imagediv";

      let imageElement = document.createElement('img');
      imageElement.src = item.image;
      imageElement.alt = item.title;

      image.append(imageElement);

      let priceElement = document.createElement('h2');
      priceElement.textContent = `Price: ₹${item.price}`;

      wishlistItemDiv.appendChild(image);
      wishlistItemDiv.appendChild(titleElement);
      wishlistItemDiv.appendChild(priceElement);

      wishlistContainer.appendChild(wishlistItemDiv);
    });
  }

  appendData();
