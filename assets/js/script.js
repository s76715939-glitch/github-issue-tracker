let flag = 0;
const fetchAllIssue = async () => {
  const tab = document.querySelector("#all");
  if (flag === 1) {
    if (tab.classList.contains("btn-active")) {
      return
    }
  }
  clearActiveTabs();
  activeTab("all");
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data;
  displayIssues(array);
  hideLoader();
  flag = 1;
};
const fetchOpenIssue = async () => {
  const tab = document.querySelector("#open");
  if (tab.classList.contains("btn-active")) {
    return
  }
  clearActiveTabs();
  activeTab("open");
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data.filter((item) => item.status === "open");
  displayOpenIssue(array);
  hideLoader();
};
const fetchClosedIssue = async () => {
  const tab = document.querySelector("#closed");
  if (tab.classList.contains("btn-active")) {
    return
  }
  clearActiveTabs();
  activeTab("closed");
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data.filter((item) => item.status === "closed");
  displayClosedIssue(array);
  hideLoader();
};
const fetchSearchIssue = async (query) => {
  showLoader();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data;
  displaySearchIssue(array);
  hideLoader();
};
const modalContainer = document.querySelector(".modal-container");
const fetchModal = async (id) => {
  modalContainer.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center;"><span class="loader" id="modal-loader" style="margin: 0 auto"></span><div/>`;
  modalContainer.classList.remove("hide");
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const object = data.data;
  openModal(object);
};
const renderIssueCard = (data) => {
  return `
    <div class="card ${data.status === "open" ? "card-open" : "card-close"}" onclick="fetchModal(${data.id})">
      <div class="card-header">
        <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" width="24px" height="24px" />
        <div class="issue-level ${data.priority === "high" ? "high-issue" : data.priority === "medium" ? "medium-issue" : "low-issue"}">${data.priority}</div>
      </div>
      <div class="card-body">
        <h3 class="card-heading">${data.title}</h3>
        <p class="card-paragraph">${data.description}</p>
        <div class="issue-labels">
          ${getLabels(data.labels)}
        </div>
      </div>
      <div class="line"></div>
      <div class="card-footer">
        <p class="card-paragraph reporter">#${data.id} by ${data.author}</p>
        <p class="card-paragraph report-date">${new Date(data.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  `;
};
const noIssue = `
    <div class="no-issue">
      <h2>No Issue Found</h2>
    </div>
`;
const displayIssues = (array) => {
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }
  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const displayOpenIssue = (array) => {

  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }
  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const displayClosedIssue = (array) => {

  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }

  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const displaySearchIssue = (array) => {
  clearActiveTabs();
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }
  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const openModal = (data) => {
  const html = `
    <h2 class="modal-heading">${data.title}</h2>
    <div class="modal-opener">
      <div class="label ${data.status === "open" ? "label-open" : "label-close"}" style="text-transform: capitalize;">${data.status === "open" ? "Opened" : "Closed"}</div>
      <p class="card-paragraph" style="margin-bottom: 0; font-size: 0.9rem; display: flex; align-items: center; gap: 5px;"><span style="font-size: 1.5rem">&bull;</span>Opened by ${data.author}<span style="font-size: 1.5rem">&bull;</span>${new Date(data.updatedAt).toLocaleDateString()}</p>
    </div>
    <div class="issue-labels">${getLabels(data.labels)}</div>
    <p class="modal-description">${data.description}</p>
    <div class="modal-footer">
      <div class="assignee">
        <p class="modal-description">Assignee:</p>
        <h3 class="assignee-name">
          ${data.assignee}
        </h3>
      </div>
      <div class="priority">
        <p class="modal-description">Priority:</p>
        <div class="issue-level ${data.priority === "high" ? "modal-high-issue" : data.priority === "medium" ? "modal-medium-issue" : "modal-low-issue"}">
          ${data.priority}
        </div>
      </div>
    </div>
    <button class="btn btn-active" onclick="closeModal()" style="width: 76px; float: right;">
      close
    </button>
    `;
  modalContainer.innerHTML = html;
};
const closeModal = () => {
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.classList.add("hide");
};
const getLabels = (labels) => {
  const issueLabels = labels
    .map(
      (e) =>
      `<div class="label ${e === "bug" ? "label-bug" : e === "enhancement" ? "label-enhance" : "label-help"}">
      <img src="./assets/${e === "bug" ? "BugDroid" : e === "enhancement" ? "Sparkle" : "Lifebuoy"}.png" />
        ${e}
      </div>`,
    )
    .join("");
  return issueLabels;
};
const clearActiveTabs = () => {
  const allTabs = document.querySelectorAll(".tab-item");
  allTabs.forEach((e) => {
    e.classList.remove("btn-active");
  });
};
const activeTab = (id) => {
  const tab = document.querySelector(`#${id}`);
  tab.classList.add("btn-active");
  return id;
};
const showLoader = () => {
  const loader = document.querySelector("#data-loader");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.classList.add("hide");
  loader.classList.remove("hide");
};
const hideLoader = () => {
  const loader = document.querySelector("#data-loader");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.classList.remove("hide");
  loader.classList.add("hide");
};
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
  const searchInput = document.querySelector("#search-input").value;
  if (searchInput === "") {
    fetchAllIssue();
    return;
  }
  fetchSearchIssue(searchInput);
});

fetchAllIssue();