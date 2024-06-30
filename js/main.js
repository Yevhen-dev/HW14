// Create a web page with a text box and a button. When the button is clicked, save the user's input to sessionStorage. Add another button that, when clicked, will display the saved data on the web page.
let userText = document.querySelector( ".taks__one__input" );
let btnSave = document.querySelector( ".taks__one__save-btn" );
let btnShow = document.querySelector( ".taks__one__show-btn" );
let textArea = document.querySelector( ".taks__one__show__save-text" );

btnSave.addEventListener( "click", function() {
    if( userText.value === "" ) {
        alert( "You are forgot wrote text" );
        return;
    } else {
        window.sessionStorage.setItem( 'user-text', userText.value );
        userText.value = "";
    }
} ); 

btnShow.addEventListener( "click", function() {
    if( !window.sessionStorage.getItem( "user-text" ) ) {
        alert( "Don`t have any save information" );
        return;
    } else {
        textArea.innerHTML = window.sessionStorage.getItem( "user-text" )
    }
} );


//  Modify our ToDo list. Store the list in localStorage so tasks remain available after page reload.
let taskTwoTask = document.querySelector( "#task" );
let taskTwoBtnAdd = document.querySelector( "#todo-btn" );
let taskTwoToDoList = document.querySelector( ".taks__two__todo__list" );
let listArr = [];
let objArr = [];

if (localStorage.todo) {
    for( let li of JSON.parse( localStorage.todo ) ) {
        createLi( li.task )
    }
} 

function createLi ( value ) {
    let li = document.createElement( "li" );
    li.classList.add( "taks__two__todo__list__item" );
    let div = document.createElement( "div" );
    let iconWrap = document.createElement( "div" );
    iconWrap.classList.add( "taks__two__todo__list__item__icon-wrap" );
    let deleteIcon = document.createElement( "img" );
    let editIcon = document.createElement( "img" );
    editIcon.src = "../images/icon_edit.svg";
    editIcon.alt = "edit icon";
    editIcon.classList.add( "taks__two__todo__list__item__icon-wrap__edit" );
    deleteIcon.src = "../images/icon_del.svg";
    deleteIcon.alt = "delete icon";
    deleteIcon.classList.add( "taks__two__todo__list__item__icon-wrap__delete" );
    iconWrap.appendChild( editIcon );
    iconWrap.appendChild( deleteIcon );

    div.innerHTML = taskTwoTask.value || value ;
    let obj = { task : taskTwoTask.value || value};

    taskTwoToDoList.appendChild( li );
    li.appendChild( div );
    li.appendChild( iconWrap );
    taskTwoTask.value = "";
    
    listArr.push( li );
    objArr.push( obj );
    localStorage.todo = JSON.stringify( objArr );

    li.addEventListener( "click", function (e) {
        if( e.target.classList.value === "taks__two__todo__list__item__icon-wrap__edit" && !this.classList.contains( "active" ) ) {
            this.classList.add( "active" );
            let input = document.createElement( "input" );
            let done = document.createElement( "img" );
            done.src = "../images/icon_done.svg";
            done.alt = "done icon";
            done.classList.add( "taks__two__todo__list__item__icon-wrap__done" );
            input.type = "text";
            input.value = div.innerHTML;
            div.classList.toggle( "hide" );
            this.prepend( input );
            iconWrap.prepend( done );
            done.addEventListener( "click", function() {
                div.innerHTML = input.value;
                input.remove();
                div.classList.toggle( "hide" );
                done.remove();
                li.classList.remove( "active" );
                objArr[ listArr.indexOf( li ) ].task = div.innerHTML;
                localStorage.todo = JSON.stringify( objArr );
            } );
        } else if( e.target.classList.value === "taks__two__todo__list__item__icon-wrap__delete" ) {
            this.remove();
            objArr.splice( listArr.indexOf( this ), 1 );
            listArr.splice( listArr.indexOf( this ), 1 );
            localStorage.todo = JSON.stringify( objArr );
            if( !objArr.length ) {
                localStorage.removeItem( "todo" );
            }
        }
    } );
}

taskTwoBtnAdd.addEventListener( "click", createLi );



// Create a simple form with a few settings (eg page background color) and store the user's choices in localStorage. The next time you open the page, apply these settings. A more difficult option is to modify your theme editor with css changes
let settings = document.querySelector( ".taks__three__settings>form" );

let colorHeader = document.querySelector( "#colorHeader" );
let colorMain = document.querySelector( "#colorMain" );
let colorMainSection = document.querySelector( "#colorMainSection" );
let colorFooter = document.querySelector( "#colorFooter" );

let taskThreeHeader = document.querySelector( ".taks__three__page__header" );
let taskThreeMain = document.querySelector( ".taks__three__page__main" );
let taskThreeSection = document.querySelector( ".taks__three__page__main__section" );
let taskThreeFooter = document.querySelector( ".taks__three__page__footer" );

colorHeader.value = getComputedStyle(taskThreeHeader).getPropertyValue("--bg-header");
colorMain.value = getComputedStyle(taskThreeMain).getPropertyValue("--bg-main");
colorMainSection.value = getComputedStyle(taskThreeSection).getPropertyValue("--bg-section");
colorFooter.value = getComputedStyle(taskThreeFooter).getPropertyValue("--bg-footer");

let tagsValueArr = [ colorHeader.value, colorMain.value, colorMainSection.value, colorFooter.value ];

let colorArr = [];

function setUpColorTheme() {
    colorHeader.value = colorArr[0].color;
    taskThreeHeader.style.setProperty( "--bg-header", colorHeader.value );
    colorMain.value = colorArr[1].color;
    taskThreeMain.style.setProperty( "--bg-main", colorMain.value );
    colorMainSection.value = colorArr[2].color;
    taskThreeSection.style.setProperty( "--bg-section", colorMainSection.value );
    colorFooter.value = colorArr[3].color;
    taskThreeFooter.style.setProperty( "--bg-footer", colorFooter.value );
}

if (localStorage.color) {
    colorArr = JSON.parse( localStorage.color );
    setUpColorTheme();
} else {
    for( let tag of tagsValueArr ) {
        colorArr.push( { color: tag } );
    }
}

settings.addEventListener( "change", function(e) {
    if( e.target.id === "colorHeader" ) {
        taskThreeHeader.style.setProperty( "--bg-header", e.target.value );
        colorArr[0].color = e.target.value;
        localStorage.color = JSON.stringify( colorArr );
    } else if( e.target.id === "colorMain" ) {
        taskThreeMain.style.setProperty( "--bg-main", e.target.value );
        colorArr[1].color = e.target.value;
        localStorage.color = JSON.stringify( colorArr );
    } else if ( e.target.id === "colorMainSection" ) {
        taskThreeSection.style.setProperty( "--bg-section", e.target.value );
        colorArr[2].color = e.target.value;
        localStorage.color = JSON.stringify( colorArr );
    } else if ( e.target.id === "colorFooter" ) {
        taskThreeFooter.style.setProperty( "--bg-footer", e.target.value );
        colorArr[3].color = e.target.value;
        localStorage.color = JSON.stringify( colorArr );
    }
} );


// Create a mathOperations.js file that declares functions for basic math operations (addition, subtraction, multiplication, division). Export these functions using named export. Create an index.js file where you import and use these functions to perform math operations.

import { plus, minus, multi, divide } from "./mathOperations.js";
console.log( plus(10, 12) );
console.log( minus( 15, 5 ) );
console.log( multi( 3, 9 ) );
console.log( divide( 60, 12 ) );




import { toUpperCase } from "./stringUtilities.js";
console.log( toUpperCase( "cat" ) );

import { showReverse } from "./stringUtilities.js";
console.log( showReverse( "Natamoto" ) );