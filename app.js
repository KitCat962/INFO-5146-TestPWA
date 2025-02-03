// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import log from "loglevel";
// Set the log level (trace, debug, info, warn, error)
log.setLevel("info");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLWcM4xIapAEgIbpK_93JSXK139XRErt4",
    authDomain: "info-5146-todo.firebaseapp.com",
    projectId: "info-5146-todo",
    storageBucket: "info-5146-todo.firebasestorage.app",
    messagingSenderId: "438512065808",
    appId: "1:438512065808:web:15f274f08b066c9ef4d995"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sw = new URL('service-worker.js', import.meta.url)
if ('serviceWorker' in navigator) {
    const s = navigator.serviceWorker;
    s.register(sw.href, {
        scope: '/INFO-5146-TestPWA/'
    })
        .then(_ => console.log('Service Worker Registered for scope:', sw.href,
            'with', import.meta.url))
        .catch(err => console.error('Service Worker Error:', err));
}

async function renderTasks() {
    var tasks = await getTasksFromFirestore();
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (!task.data().completed) {
            const taskItem = document.createElement("li");
            taskItem.id = task.id;
            taskItem.textContent = task.data().text;
            taskList.appendChild(taskItem);
        }
    });
}

async function addTaskToFirestore(taskText) {
    await addDoc(collection(db, "todos"), {
        text: taskText,
        completed: false
    });
}
async function getTasksFromFirestore() {
    var data = await getDocs(collection(db, "todos"));
    let userData = [];
    data.forEach((doc) => {
        userData.push(doc);
    });
    return userData;
}

function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
}

// function addTask(task) {
//     try {
//         // Log user action
//         log.info(`Task added: ${task}`);
//         // Add task to the list
//         tasks.push(task);
//         renderTasks();
//     } catch (error) {
//         // Log error
//         log.error("Error adding task", error);
//     }
// }

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add Task
addTaskBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    if (task) {
        const taskText = sanitizeInput(task)
        await addTaskToFirestore(taskText);
        renderTasks();
        taskInput.value = "";
    }
});

// Remove Task on Click
taskList.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
});

window.addEventListener('error', function (event) {
    console.error('Error occurred: ', event.message);
});