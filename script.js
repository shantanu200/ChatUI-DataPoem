const commentCard = document.querySelector(".comment-container");

var fdata;

let jsonData;

var currId = -1;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => localStorage.setItem("data", JSON.stringify(data)));

const data = JSON.parse(localStorage.getItem("data"));

commentCard.innerHTML = data.comments.map((val, id) => {
  return `<div class="comment-card" id=${val.id} data-clicked="false">
  <div class="counter">
            <div class="add-count" onclick=increase(${id})>
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
            <div class="count"><p>${val.score}</p></div>
            <div class="minus-count" onclick=decrease(${id})>
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
          </div>
          <div class="comment-info">
            <div class="top">
              <div class="top-left">
                <div class="profile-img">
                  <img src=${val.user.image.png} alt="" />
                </div>
                <div class="name"><p></p></div>
                <div class="time-stamp"><p>${val.createdAt}</p></div>
              </div>
              <div class="top-right">
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>
                <a class="reply" oncLick=handleReply(${val.id}) >Reply</a>
              </div>
            </div>
            <div class="mid">
              <p>
                ${val.content}
              </p>
            </div>
          </div>
        </div>
        
        <div class="reply-comment-card">
        
        ${
          val.replies &&
          val.replies.map((r, id) => {
            return `<div class="comment-card">
          <div class="counter">
            <div class="add-count" onclick=increase(${id})>
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
            <div class="count"><p>${r.score}</p></div>
            <div class="minus-count" onclick=decrease(${id})>
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
          </div>
          <div class="comment-info">
            <div class="top">
              <div class="top-left">
                <div class="profile-img">
                  <img src=${r.user.image.png} alt="" />
                </div>
                <div class="name">${
                  data.currentUser.username === r.user.username
                    ? `<p>${r.user.username}<span class="youloggedIn">You</span></p>`
                    : `<p>${r.user.username}</p>`
                }</div>
                <div class="time-stamp"><p>${r.createdAt}</p></div>
              </div>
              <div class="top-right">
                ${
                  data.currentUser.username === r.user.username
                    ? `<div class="action"><div class="delete" onclick='handleDelete(${val.id})'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg><a>Delete</a></div> <div class="edit"><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>Edit</div></div>`
                    : `<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>
                <a class="reply">Reply</a>`
                }
              </div>
            </div>
            <div class="mid">
              
              <p>
              <span class="replyingTo">@ ${r.replyingTo}</span>
                ${r.content}
              </p>
            </div>
          </div>
        </div>`;
          })
        }
        </div>
        `;
});

const deletePopUp = document.querySelector(".overlay");

const handleDelete = (id) => {
  deletePopUp.style.display = "flex";
};

const handleReply = (e) => {
  console.log(e);
  const reply = document.getElementById(e);
  if (reply.dataset.clicked == "true") {
    console.log("404");
  } else {
    const ele = document.createElement("div");
    ele.className = "comment-card reply-card";
    ele.innerHTML = `
              <div class="profile-img">
                <img src=${data.currentUser.image.png} alt='' />
              </div>
              <div class="input-box">
                <textarea name="comment" id="comment" rows="5"></textarea>
                <!-- <input type="text" name="comment" id="comment"> -->
              </div>
              <button>Reply</button>
        `;
    reply.after(ele);
    reply.dataset.clicked = "true";
  }
};

function increase(uid) {
  let filterData = data.comments[uid];

  filterData.score += 1;

  data.comments[uid] = filterData;

  localStorage.setItem("data", JSON.stringify(data));

  window.location.reload(0);
}

function decrease(uid) {
  let filterData = data.comments[uid];

  filterData.score -= 1;

  data.comments[uid] = filterData;

  localStorage.setItem("data", JSON.stringify(data));

  window.location.reload(0);
}

