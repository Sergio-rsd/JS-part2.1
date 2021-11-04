'use strict';
const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
function makeGetRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            // xhr = new window.XMLHttpRequest(); // зачем window?
            xhr = new XMLHttpRequest();
        } else  {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject(xhr.responseText);
                }
                const body = JSON.parse(xhr.responseText);
                resolve(body);    
            }
        };
        xhr.onerror = function(err) {
            reject(err)
        };

        xhr.open('GET', url);
        xhr.send(); 
    });
}

class GoodsItem {
    constructor(id_product, product_name = 'Без названия', price = 0, img = 'https://via.placeholder.com/250') {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }
    render() {
        return `
            <div class="goods-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="alt">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="js-add-to-cart">Добавить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {}
    findGood(id) {
         return this.goods.find(good => good.id_product === id);
    }
    fetchGoods() {}
    totalSum() {
        let sum = 0;
        for (const goodSum of this.goods) { // зачем еще раз обьявлена const good ?
            if (goodSum.price) {
                sum += goodSum.price;
            }
        }
        return sum;
    }
    render() {
        let listHtml = '';
        // console.log(good);
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}

class GoodsPage extends GoodsList {
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.js-add-to-cart')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                // console.log(+goodId);
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    fetchGoods() {
        return makeGetRequest(`${API_URL}/catalogData.json`)
        .then ((goods) => {
            this.goods = goods});
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        // console.log(this.totalSum());
    }
}

class Cart extends GoodsList {
    removeFromCart(goodId) {

    }
    cleanCart() {

    }
    updateCartItem(goodId, goods) {

    }
}

class CartItem extends GoodsItem {
    constructor(...attrs) {
        super(attrs);
        this.count = 0;
    }
    incCount() {

    }
    decCount() {

    }
}

const list = new GoodsPage('.goods-list');
list.fetchGoods().then(() =>
    list.render()
)

// console.log(list.totalSum());
