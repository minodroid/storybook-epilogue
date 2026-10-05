function toEmbedUrl(url){
  if(!url) return "";
  try{
    const u = new URL(url);
    if(u.hostname.includes("drive.google.com") && u.pathname.includes("/file/d/")){
      const match = u.pathname.match(/\/file\/d\/([^/]+)/);
      if(match && match[1]) return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    if(u.hostname.includes("youtu.be")){
      const id = u.pathname.replace("/","");
      return `https://www.youtube.com/embed/${id}`;
    }
    if(u.hostname.includes("youtube.com")){
      if(u.pathname.includes("/embed/")) return url;
      const id = u.searchParams.get("v");
      if(id) return `https://www.youtube.com/embed/${id}`;
    }
  }catch(e){}
  return url;
}

function setupVideos(){
  document.querySelectorAll("[data-video]").forEach(frame=>{
    const key = frame.dataset.video;
    const url = SITE_CONTENT.videos[key];
    if(!url) return;
    const embed = toEmbedUrl(url);
    frame.classList.remove("placeholder");
    frame.innerHTML = `<iframe src="${embed}" title="${key} movie" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
}

function renderAnswers(){
  const root = document.getElementById("answersList");
  SITE_CONTENT.answers.forEach(item=>{
    const el = document.createElement("article");
    el.className = "answer-card";
    el.innerHTML = `
      <p class="card-kicker">Lost Piece ${item.no}</p>
      <p class="answer-q">${item.question}</p>
      <h3 class="answer-a">${item.answer}</h3>
      <p class="answer-story">${item.story}</p>
    `;
    root.appendChild(el);
  });
}

function renderPages(){
  const root = document.getElementById("pagesGrid");
  SITE_CONTENT.pages.forEach((item, idx)=>{
    const el = document.createElement("article");
    el.className = "page-card";
    el.tabIndex = 0;
    el.setAttribute("role","button");
    el.setAttribute("aria-label",`${item.title}を読む`);
    el.innerHTML = `
      <div class="page-thumb-wrap">
        <img class="page-thumb" src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="page-card-copy">
        <p class="card-kicker">${item.no}</p>
        <h3>${item.title}</h3>
        <p>${item.subtitle}</p>
        <span class="read-link">ページを開く →</span>
      </div>
    `;
    el.addEventListener("click",()=>openPage(idx));
    el.addEventListener("keydown",e=>{
      if(e.key==="Enter" || e.key===" "){
        e.preventDefault();
        openPage(idx);
      }
    });
    root.appendChild(el);
  });
}

const modal = document.getElementById("pageModal");
function openPage(idx){
  const item = SITE_CONTENT.pages[idx];
  document.getElementById("modalKicker").textContent = item.no;
  document.getElementById("modalTitle").textContent = item.title;
  const image = document.getElementById("modalPageImage");
  image.src = item.image;
  image.alt = `${item.title} - ${item.no}`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}

function closePage(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closePage));
document.addEventListener("keydown",e=>{if(e.key==="Escape") closePage();});

setupVideos();
renderAnswers();
renderPages();
