export default {
    getUserName() {
        return localStorage.getItem('userName');
    },
    setUserName(targetUserName) {
        localStorage.setItem('userName', targetUserName);
    },

    setTodo(description) {

    },

    getTodoAll(targetUserName) {

    }
}