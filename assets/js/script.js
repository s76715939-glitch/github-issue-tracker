const fetchAllIssue = async () => {
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data;
  displayIssues(array);
  hideLoader();
};
const fetchOpenIssue = async () => {
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data.filter((item) => item.status === "open");
  displayOpenIssue(array);
  hideLoader();
};
const fetchClosedIssue = async () => {
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
const getLabels = (labels) => {
  const issueLabels = labels
    .map(
      (e) =>
        `<div class="label ${e === "bug" ? "label-bug" : e === "enhancement" ? "label-enhance" : "label-help"}">${e}</div>`,
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
};
const displayIssues = (array) => {
  clearActiveTabs();
  activeTab("all");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.innerHTML = "";
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  array.forEach((data) => {
    const html = `
        <div class="card ${data.status === "open" ? "card-open" : "card-close"}">
        <div class="card-header">
          <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="" width="24px" height="24px" />
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
          <p class="card-paragraph reporter">#1 by ${data.author}</p>
          <p class="card-paragraph report-date">${new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
        `;
    cardContainer.innerHTML += html;
  });
};
const displayOpenIssue = (array) => {
  clearActiveTabs();
  activeTab("open");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.innerHTML = "";
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  array.forEach((data) => {
    const html = `
        <div class="card ${data.status === "open" ? "card-open" : "card-close"}">
        <div class="card-header">
          <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="" width="24px" height="24px" />
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
          <p class="card-paragraph reporter">#1 by ${data.author}</p>
          <p class="card-paragraph report-date">${new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
        `;
    cardContainer.innerHTML += html;
  });
};
const displayClosedIssue = (array) => {
  clearActiveTabs();
  activeTab("closed");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.innerHTML = "";
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  array.forEach((data) => {
    const html = `
        <div class="card ${data.status === "open" ? "card-open" : "card-close"}">
        <div class="card-header">
          <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="" width="24px" height="24px" />
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
          <p class="card-paragraph reporter">#1 by ${data.author}</p>
          <p class="card-paragraph report-date">${new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
        `;
    cardContainer.innerHTML += html;
  });
};
const displaySearchIssue = (array) => {
  clearActiveTabs();
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.innerHTML = "";
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  array.forEach((data) => {
    const html = `
        <div class="card ${data.status === "open" ? "card-open" : "card-close"}">
        <div class="card-header">
          <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="" width="24px" height="24px" />
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
          <p class="card-paragraph reporter">#1 by ${data.author}</p>
          <p class="card-paragraph report-date">${new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
        `;
    cardContainer.innerHTML += html;
  });
};
const showLoader = () => {
  const loader = document.querySelector(".loader");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.classList.add("hide");
  loader.classList.remove("hide");
};
const hideLoader = () => {
  const loader = document.querySelector(".loader");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.classList.remove("hide");
  loader.classList.add("hide");
};
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
  const searchInput = document.querySelector("#search-input").value;
  fetchSearchIssue(searchInput);
});
fetchAllIssue();
