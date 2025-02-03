// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add Task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
        taskInput.value = '';
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