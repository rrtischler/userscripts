// ==UserScript==
// @name         TFSCodeSearchShortcuts
// @include      */tfs/*
// @version      1.0
// @description  Atalhos para usar no CodeSearch do TFS
// @author       Rafael Tischler
// @grant        none
// @updateURL    https://raw.githubusercontent.com/rrtischler/userscripts/main/TFSCodeSearchShortcuts.js
// @downloadURL  https://raw.githubusercontent.com/rrtischler/userscripts/main/TFSCodeSearchShortcuts.js
// ==/UserScript==

// ATALHOS:
// CTRL + m => adiciona "path:*trunk " no início do campo de busca
// CTRL + i => adiciona "path:*integration " no início do campo de busca
// CTRL + . => adiciona NumeroSAC:" no início do campo de busca


console.log("Script CodeSearch");
document.addEventListener('keyup', onKeyUpTFS);

var trunk = 'trunk';
var integration = 'integration';
var numeroSac = 'NumeroSAC:'
var searchInputBox = () => document.querySelector("#searchbox");
var searchInputMulti = () => document.querySelector("#multi-entity-search-box");
function onKeyUpTFS(e){
    if(e.ctrlKey)
    {
        switch( e.keyCode){
            case 77: // m
                adicionaTrunk();
                break;
            case 73: // i
                adicionaIntegration();
                break;
            case 190: // ponto
                codigoSac();
                break;
            default:
                break;
        }
    }
}

//------------------

function codigoSac(){
    includeBeginCodigoSac(searchInputMulti(), numeroSac);
    includeBeginCodigoSac(searchInputBox(), numeroSac);
    goWiLink();
}
function includeBeginCodigoSac(searchInput, codigoSac){
    if (searchInput != null) {
        if (!searchInput.value.includes(codigoSac) && searchInput.ariaLabel.includes('work item')){
            searchInput.value = codigoSac + searchInput.value ;
        }
        searchInput.focus();
    }
}

//------------------

function adicionaTrunk(){
    addPath(searchInputMulti(), integration, trunk);
    addPath(searchInputBox(), integration, trunk);
    goCodeLink();
}
function adicionaIntegration(){
    addPath(searchInputMulti(), trunk, integration);
    addPath(searchInputBox(), trunk, integration);
    goCodeLink();
}
function addPath(searchInput, antigo, novo){
    if (searchInput != null){
        if (searchInput.value.includes(antigo) && searchInput.ariaLabel.includes('code')){
            searchInput.value = searchInput.value.replace(antigo, novo);
        }
        else{
            var path = 'path:*' + novo;
            if (!searchInput.value.includes(path)){
                searchInput.value = path + ' ' + searchInput.value ;
            }
        }
        searchInput.focus();
    }
}

//------------------

function goCodeLink(){
    // goLink('code');
}
function goWiLink(){
    // goLink('work item');
}
function goLink(ariaLabel){ // tem q refazer o seletor, não está pegando certo
    var link = document.querySelector(".search-entity-choice");
    var linkSelected = document.querySelector(".search-entity-choice .selected");
    if (linkSelected != null && link != null && !linkSelected.ariaLabel.includes(ariaLabel)){
        link.click(); //se o selecionado não for o desejado, clica no outro
    }
}
