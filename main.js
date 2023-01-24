let form = document.forms['form-body'];
form.addEventListener('submit', addDish);


function addTableRow(table, price, dish){
    let table_element
    if(table==='Table_1')
        table_element = document.querySelector('#t1');
    else if(table==='Table_2')
        table_element = document.querySelector('#t2');
    else
        table_element = document.querySelector('#t3');

    // console.log(table_element.childNodes[3]);
    let t_body = table_element.childNodes[3];

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
    delete_btn.id='';
    delete_btn.appendChild(document.createTextNode('delete order'));
    dl.appendChild(delete_btn);

    row.appendChild(pr);
    row.appendChild(tb);
    row.appendChild(ds);
    row.appendChild(document.createTextNode(' '));
    row.appendChild(dl);

    table_element.appendChild(row);
}


function addDish(e){
    e.preventDefault();
    let price = form['price'].value;
    let dish = form['dish'].value;
    let table = form['tables'].value;
    // console.log(price, dish, table);
    addTableRow(table, price, dish)
    
}