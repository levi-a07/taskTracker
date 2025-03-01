let fileHandle = null;

async function saveTasksToFile(tasks) {
    if (tasks.length === 0) {
        alert("No tasks to save!");
        return;
    }

    const newContent = await generateTodoContent(tasks);

    if (!fileHandle) {
        fileHandle = await window.showSaveFilePicker({
            suggestedName: "Todo_List.txt",
            types: [{ description: "Text File", accept: { "text/plain": [".txt"] } }]
        });
    }

    await appendToFile(newContent);
}

async function appendToFile(newContent) {
    if (!fileHandle) return;

    const file = await fileHandle.getFile();
    const existingContent = await file.text(); 

    const writable = await fileHandle.createWritable();
    await writable.write(existingContent + "\n" + newContent); 
    await writable.close();

    alert("Todo list updated successfully!");
}


async function generateTodoContent(tasks) {
    const now = new Date();
    const timestamp = now.toLocaleString();
    let content = `\n--- Saved on ${timestamp} --- [( ${progressText.innerHTML} )]\n`;

    tasks.forEach((task, index) => {
        content += `${index + 1}. [${
            task.done ? " Done" : "Pending"
        }] -  ${task.text}\n`;
    });

    return content;
}
