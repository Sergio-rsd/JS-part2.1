'use strict';
class GoodsItem {
    constructor(id, title = 'none', price = 0, img = '') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `
            <div class="goods-item" data-id="${this.id}">
                <img src="${this.img}" alt="Picture">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="js-add-to-cart">В корзину</button>
            </div>
        `;
    }
}

class CartItem extends GoodsItem {
    // единицы товара в корзине
    constructor(...rest) {
        super(rest);
        this.quantity = 0;
    }
    // отрисовка одного товара в корзине
    render() {

    }
}
class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {}

    findGood(id) {
        return this.goods.find(good => good.id === id);
    }

    fetchGoods() {}

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id, good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}

class GoodsMain extends GoodsList {
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.js-add-to-cart')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        // console.log(good);
    }
    fetchGoods() {
        this.goods = [
            {id: 1, title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/250'},
            {id: 2, title: "Смартфон Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/250'},
            {id: 3, title: "Стиральная машина Hotpoint", price: 32000, img: 'https://via.placeholder.com/250'},
            {id: 4, title: "Умные часы Apple watch", price: 29000, img: 'https://via.placeholder.com/250'},
            {id: 5, title: "Посудомоечная машина Bosh", price: 26000, img: 'https://via.placeholder.com/250'},
        ]
    }
}

class Cart extends GoodsList {
    // корзина
    // метод - удалить один товар из корзины
    removeCartItem(goodId) {

    }

    //пересчитать корзину по кол-ву и суммам на каждый товар и всего
    _updateCart(goodsId, goods) {

    }
    // сумма товаров в корзине
    totalSummGoods() {

    }
    //отрисовка всей корзины
    render() {

    }
    // метод - очистка всей корзины
    cleanCart() {

    }
}

const list = new GoodsMain('.goods-list');
list.fetchGoods();
list.render();