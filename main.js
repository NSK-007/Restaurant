const crudURL = `https://crudcrud.com/api/79eb42049fa140a8b904aa7d61905274`;

window.addEventListener("DOMContentLoaded", loadAllOrders);

let form = document.forms['form-body'];
form.addEventListener('submit', addDish);

let t1 = document.querySelector('#t1');
let t2 = document.querySelector('#t2');
let t3 = document.querySelector('#t3');

t1.addEventListener('click', removeDish);
t2.addEventListener('click', removeDish);
t3.addEventListener('click', removeDish);

function loadAllOrders() {
    try {
        let y = async () => {
            let pr1 = await axios.get(`${crudURL}/bookOrder`)
            console.log(pr1.data);
            for (let i = 0; i < pr1.data.length; i++) {
                addTableRow(pr1.data[i]._id, pr1.data[i].table, pr1.data[i].price, pr1.data[i].dish)
            }
           
            // pr1.then(response => {
            //     for (let i = 0; i < response.data.length; i++) {
            //         addTableRow(response.data[i]._id, response.data[i].table, response.data[i].price, response.data[i].dish)
            //     }
            // })
            // .catch(err => console.log(err))
        }
        y();
    }
    catch (err) {
        console.log(err)
    }
}


function addTableRow(t_id, table, price, dish) {
    try {
        console.log(table);
        let table_element = document.querySelector(`#${table}`);
        let t_body = table_element.childNodes[3];

        // console.log(t_id, table, price, dish)

        let row = document.createElement('tr');

        let pr = document.createElement('td');
        pr.appendChild(document.createTextNode(price));

        let tb = document.createElement('td');
        tb.appendChild(document.createTextNode(table));

        let ds = document.createElement('td');
        ds.appendChild(document.createTextNode(dish));

        let dl = document.createElement('td');

        let delete_btn = document.createElement('button');
        delete_btn.className = 'btn btn-sm btn-danger';
        delete_btn.id = t_id;
        delete_btn.appendChild(document.createTextNode('delete order'));
        dl.appendChild(delete_btn);

        row.appendChild(pr);
        row.appendChild(tb);
        row.appendChild(ds);
        row.appendChild(document.createTextNode(' '));
        row.appendChild(dl);

        // table_element.appendChild(t_body);
        t_body.appendChild(row);
    }
    catch (err) {
        console.log(err)
    }
}


function addDish(e) {
    try {
        e.preventDefault();
        let order = {
            price: form['price'].value,
            dish: form['dish'].value,
            table: form['tables'].value
        }
        // console.log(price, dish, table);

        if (order.price == null || order.price == '' || order.price == '-' || parseInt(order.price) <= 0 || order.dish == null || order.dish == '' || order.table == null || order.table == '') {
            // console.log('Empty fields');
            let err_div = document.querySelector('#error');
            err_div.className = 'alert alert-danger';

            if (parseInt(order.price) <= 0)
                err_div.innerHTML = 'Please appropriate price';
            else
                err_div.innerHTML = 'Please Enter all fields';

            setTimeout(function () {
                err_div.className = '';
                err_div.innerHTML = '';
            }, 3000);
            return;
        }


        let y = async () => {
            let pr1 = await axios.post(`${crudURL}/bookOrder`, order)
                console.log(pr1.data);
            addTableRow(pr1.data._id, order.table, order.price, order.dish)
            document.forms['form-body'].reset();
            // pr1.then(response => {
            //     // console.log(response.data);
            //     addTableRow(response.data._id, order.table, order.price, order.dish)
            //     document.forms['form-body'].reset();
            // })
            // .catch(err => console.log(err))
        }
        y()
    }
    catch (err) {
        console.log(err)
    }

}

function removeDish(e) {
    // console.log(e.target)
    try {
        if (e.target.classList.contains('btn-danger')) {
            let td = e.target.parentElement.parentElement;
            let tb = e.target.parentElement.parentElement.parentElement;
            let del_promise = async () => {
                let pr1 = await axios.delete(`${crudURL}/bookOrder/${e.target.id}`)
                console.log(pr1.data)
                tb.removeChild(td);
                // pr1.then(response => {
                //     tb.removeChild(td);
                // })
                // .catch(err => console.log(err))
            }
            del_promise();
        }
    }
    catch (err) {
        console.log(err)
    }
}