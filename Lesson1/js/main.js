'use strict';
// товары
const goods = [
    { title: "Робот-пылесос Xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
    { title: "Смартфон Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
    { title: "Стиральная машина Hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
    { title: "Умные часы Apple Watch", price: 26000, img: 'https://via.placeholder.com/150' },
];
// разметка товара
const renderGoodsItem = (item = {title:'none', price: 0, img : ''}) => {
    return `<div class="goods-item">
        <img src="${item.img}" alt="alt">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
    </div>`
};
// все товары в список и в контейнер
const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
};

renderGoodsList(goods);