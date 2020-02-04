'use strict';
// 1 задание
const words = "Lorem arnt ipsum dolor sit 'amet consectetur Dont adipisicing' elit. A, aliquam maiores? 'Sapiente delectus ducimus', accusamus nostrum!";
const regexp1 = new RegExp("'", 'gim');

const wreplace = '"';
console.log(words.replace(regexp1, wreplace));

//2 задание
const words2 = "Lorem arn't ipsum dolor sit 'amet consectetur Don't adipisicing' elit. A, aliquam maiores? 'Sapiente delectus ducimus', accusamus nostrum!";
console.log(words2.replace(/\B'|'\B/g, '"'));

// 3 задание
class Validator {
    constructor (form) {
        this.samples = {
            name: /^[a-zа-яё]+$/i,
            phone : /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
            email : /^[\w\.-]+@\w+\.[a-z]{2,4}$/i,
        };
        this.errors = {
            name : 'Имя содержит одно слово и только буквы',
            phone : 'Телефон имеет вид +7(000)000-0000',
            email : 'E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.',
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validatedForm();
    }
    _validatedForm() {
        const errors = [...document.querySelector(this.form).querySelectorAll(`.${this.errorClass}`)];
        errors.forEach(error => error.remove());
        // for (let error of errors) {
        //     error.remove();
        // }
        const formFields = [...document.querySelector(this.form).getElementsByTagName('input')];
        for (let field of formFields) {
            this._validated(field);
        }
        // проверка ошибок перед SEND
        if (![...document.querySelector(this.form).querySelectorAll(`.invalid`)].length) {
            this.valid = true;
        }
    }
    _validated(field) {
        if (this.samples[field.name]) {
            if (!this.samples[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._seeField(field);
            }
        }
    }
    _addErrorMsg(field) {
        const error = `<div class = "${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _seeField(field) {
        field.addEventListener('input', () => {
            const error = field.parentNode.querySelector(`.${this.errorClass}`);
            if (this.samples[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._addErrorMsg(field);
                }
            }
        })
    }
}

window.onload = () => {
    document.getElementById('myform').addEventListener('submit', ev => {
            const valid = new Validator('#myform');
            if (!valid.valid) {
                ev.preventDefault();
            }
        }
    )
}
