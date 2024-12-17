(function() {
  const container = document.getElementById('tasks-container');

  container.innerHTML = `
    <h2>Your Tasks</h2>
    <div class="task-input-section">
      <input type="text" id="task-input" placeholder="Add a new task..." />
      <button id="add-task-btn">Add</button>
    </div>
    <ul class="task-list" id="task-list"></ul>
    <div class="clear-completed-section">
      <button id="clear-completed-btn">Clear Completed Tasks</button>
    </div>
  `;

  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');

  let tasks = JSON.parse(localStorage.getItem('taskList')) || [];

  function saveTasks() {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) li.classList.add('completed');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const span = document.createElement('span');
      span.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '✕';
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text === '') return;
    tasks.push({ text: text, completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
  });

  // Initial render
  renderTasks();
})();
