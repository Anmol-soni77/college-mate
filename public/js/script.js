
let plusingridient = document.getElementById('ingridientbtn')
let ingridientslist = document.querySelector('.ingridientslist')
let ingridientsdiv = document.querySelectorAll('.ingridientsdiv')[0]

plusingridient.addEventListener('click',function(){
    let newingridient = ingridientsdiv.cloneNode(true)
    let input = newingridient.getElementsByTagName('select')[0]
    input.value = ''
    ingridientslist.appendChild(newingridient)
})

//  ----------------------------

let plusingridient1 = document.getElementById('ingridientbtn1')
let ingridientslist1 = document.querySelector('.ingridientslist1')
let ingridientsdiv1 = document.querySelectorAll('.ingridientsdiv1')[0]

plusingridient1.addEventListener('click',function(){
    let newingridient1 = ingridientsdiv1.cloneNode(true)
    let input1 = newingridient1.getElementsByTagName('select')[0]
    input1.value = ''
    ingridientslist1.appendChild(newingridient1)
})
//  ----------------------------

let plusingridient2 = document.getElementById('ingridientbtn2')
let ingridientslist2 = document.querySelector('.ingridientslist2')
let ingridientsdiv2 = document.querySelectorAll('.ingridientsdiv2')[0]

plusingridient2.addEventListener('click',function(){
    let newingridient2 = ingridientsdiv2.cloneNode(true)
    let input2 = newingridient2.getElementsByTagName('select')[0]
    input2.value = ''
    ingridientslist2.appendChild(newingridient2)
})
//  ----------------------------

let plusingridient3 = document.getElementById('ingridientbtn3')
let ingridientslist3 = document.querySelector('.ingridientslist3')
let ingridientsdiv3 = document.querySelectorAll('.ingridientsdiv3')[0]

plusingridient3.addEventListener('click',function(){
    let newingridient3 = ingridientsdiv3.cloneNode(true)
    let input3 = newingridient3.getElementsByTagName('select')[0]
    input3.value = ''
    ingridientslist3.appendChild(newingridient3)
})


