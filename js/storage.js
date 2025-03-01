 function loadTasks() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["tasks"], (data) => {
            resolve(data.tasks || []);
        });
    });
}

 function saveTasks(tasks) {
    chrome.storage.local.set({ tasks });
}
