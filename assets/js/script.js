const fetchAllIssue = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const array = data.data;
    displayAllIssues(array);
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
const getLabels = (labels) => {
    const issueLabels = labels
        .map((e) => `<div class="label label-bug">${e}</div>`)
        .join("");
    return issueLabels;
}
const displayAllIssues = (array) => {
    const cardContainer = document.querySelector(".cards-container");
    array.forEach(data => {
        const html = `
        <div class="card ${data.status=== "open"? "card-open": "card-close"}">
        <div class="card-header">
          <img src="./assets/${data.status=== "open"? "Open-Status.png": "Closed-Status.png"}" alt="" width="24px" height="24px" />
          <div class="issue-level ${data.priority === "high" ? "high-issue" : data.priority === "medium" ? "medium-issue" :"low-issue"}">${data.priority}</div>
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

}
fetchAllIssue();