export default {
    getUserName() {
        return localStorage.getItem('userName');
    },
    setUserName(targetUserName) {
        localStorage.setItem('userName', targetUserName);
    },

    setTodo(targetUserName, targetTodos) {
        localStorage.setItem(targetUserName, targetTodos);
    },

    getTodoAll(targetUserName) {
        return localStorage.getItem(targetUserName) ? localStorage.getItem(targetUserName) : '[]';
    }
}