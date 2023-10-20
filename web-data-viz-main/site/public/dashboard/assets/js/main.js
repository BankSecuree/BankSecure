if (sessionStorage.GERENTE_USUARIO == 'null') {//Interno

  //Botão Dash
  var btnDash = document.getElementById("aDash");
  btnDash.href="index.html"

  // Botão Usuários
  var barraLateral = document.getElementById("sidebar-nav");

  var li = document.createElement("li");
  var a = document.createElement("a");
  var i = document.createElement("i");
  var span = document.createElement("span");

  li.setAttribute("class", "nav-item");
  a.setAttribute("class", "nav-link collapsed");
  a.setAttribute("href", "conta_usuarios.html");
  i.setAttribute("class", "bi bi-card-list");

  li.appendChild(a);
  a.appendChild(i);
  a.appendChild(span);
  barraLateral.appendChild(li);

  span.innerHTML = "Usuários";

  // Botão Sair

  var barraLateral = document.getElementById("sidebar-nav");

  var li = document.createElement("li");
  var a = document.createElement("a");
  var i = document.createElement("i");
  var span = document.createElement("span");

  li.setAttribute("class", "nav-item");
  a.setAttribute("class", "nav-link collapsed");
  a.setAttribute("id", "btnNav");
  a.setAttribute("onclick", "confirmarSair()");
  i.setAttribute("class", "bi bi-box-arrow-right");

  li.appendChild(a);
  a.appendChild(i);
  a.appendChild(span);
  barraLateral.appendChild(li);

  span.innerHTML = "Sair";


} else if (sessionStorage.GERENTE_USUARIO == 1) {//Gerente de TI

  //Botão Gerentes Dashboard
  var btnDash = document.getElementById("aDash");
  btnDash.href="indexGerente.html"

  // Botão Usuários
  var barraLateral = document.getElementById("sidebar-nav");

  var li = document.createElement("li");
  var a = document.createElement("a");
  var i = document.createElement("i");
  var span = document.createElement("span");

  li.setAttribute("class", "nav-item");
  a.setAttribute("class", "nav-link collapsed");
  a.setAttribute("href", "conta_usuarios.html");
  i.setAttribute("class", "bi bi-card-list");

  li.appendChild(a);
  a.appendChild(i);
  a.appendChild(span);
  barraLateral.appendChild(li);

  span.innerHTML = "Usuários";
  
  // Botão Máquinas

  var barraLateral = document.getElementById("sidebar-nav");

  var li = document.createElement("li");
  var a = document.createElement("a");
  var i = document.createElement("i");
  var span = document.createElement("span");

  li.setAttribute("class", "nav-item");
  a.setAttribute("class", "nav-link collapsed");
  a.setAttribute("href", "conta_maquinas.html");
  i.setAttribute("class", "bi bi-card-list");

  li.appendChild(a);
  a.appendChild(i);
  a.appendChild(span);
  barraLateral.appendChild(li);

  span.innerHTML = "Máquinas";

  // Botão Sair

  var barraLateral = document.getElementById("sidebar-nav");

  var li = document.createElement("li");
  var a = document.createElement("a");
  var i = document.createElement("i");
  var span = document.createElement("span");

  li.setAttribute("class", "nav-item");
  a.setAttribute("class", "nav-link collapsed");
  a.setAttribute("id", "btnNav");
  a.setAttribute("onclick", "confirmarSair()");
  i.setAttribute("class", "bi bi-box-arrow-right");

  li.appendChild(a);
  a.appendChild(i);
  a.appendChild(span);
  barraLateral.appendChild(li);

  span.innerHTML = "Sair";

} else {//Analista

  //Botão Dashboard
  var btnDash = document.getElementById("aDash");
  btnDash.href="indexAnalista.html"

  // Botão Sair

  var barraLateral = document.getElementById("sidebar-nav");

  var li = document.createElement("li");
  var a = document.createElement("a");
  var i = document.createElement("i");
  var span = document.createElement("span");

  li.setAttribute("class", "nav-item");
  a.setAttribute("class", "nav-link collapsed");
  a.setAttribute("id", "btnNav");
  a.setAttribute("onclick", "confirmarSair()");
  i.setAttribute("class", "bi bi-box-arrow-right");

  li.appendChild(a);
  a.appendChild(i);
  a.appendChild(span);
  barraLateral.appendChild(li);

  span.innerHTML = "Sair";

}

function exibirInfos() {
  if (sessionStorage.ID_USUARIO == undefined) {
    window.location = "../login.html";
  } else {
    var scrFoto = "profile.png"
    if (sessionStorage.FOTO_USUARIO != "null" && sessionStorage.FOTO_USUARIO != "undefined") {
      scrFoto = sessionStorage.FOTO_USUARIO;
    }
    let fotoPerfil = document.getElementById("foto-usuario");
    fotoPerfil.setAttribute("src", `assets/img/usuario/${scrFoto}`);
    let nome = document.getElementById("nome-usuario");
    nome.innerHTML = sessionStorage.NOME_USUARIO;
  }
}

function confirmarSair() {
  sessionStorage.clear();
  setTimeout(function () {
    window.location = "../index.html";
  }, 2000);
}

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      select('body  ').classList.toggle('toggle-sidebar')
    })
  }

  function teste(){
    select('body ').classList.add('toggle-sidebar')
  }

  teste()

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
            color: []
          },
          {
            background: []
          }
          ],
          [{
            script: "super"
          },
          {
            script: "sub"
          }
          ],
          [{
            list: "ordered"
          },
          {
            list: "bullet"
          },
          {
            indent: "-1"
          },
          {
            indent: "+1"
          }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }


  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
  //  * Initiate Datatables
  //  */
  // const datatables = select('.datatable', true)
  // datatables.forEach(datatable => {
  //   new simpleDatatables.DataTable(datatable);
  // })

  // /**
  //  * Autoresize echart charts
  //  */
  // const mainContainer = select('#main');
  // if (mainContainer) {
  //   setTimeout(() => {
  //     new ResizeObserver(function() {
  //       select('.echart', true).forEach(getEchart => {
  //         echarts.getInstanceByDom(getEchart).resize();
  //       })
  //     }).observe(mainContainer);
  //   }, 200);
  // }

})();