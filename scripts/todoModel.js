import { Utils } from './utils.js';

export default class TodoModel {
    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = {};
    }

    subscribe(evtname, cb) {
        if(this.onChanges[evtname]) {
            return this.onChanges[evtname].push(cb);
        }
        this.onChanges[evtname] = [];
        this.onChanges[evtname].push(cb);
    }

    inform(evtname) {
        Utils.store(this.key, this.todos);
        let listeners = this.getEventListeners(evtname);
        listeners.forEach(listener => listener());
    }

    getEventListeners(evtname) {
        return this.onChanges[evtname] ? this.onChanges[evtname] : [];
    }

    addTodo(title) {
        const id = +new Date;
        this.todos = this.todos.concat({
            id,
            title,
            completed: false
        });

        this.inform('add');
    }

    update(todotoupdate, text) {
        this.todos = this.todos.map(todo => todotoupdate !== todo ? todo : Object.assign({}, todo, {title:text}));

        this.inform('change');
    }

    destroy(todotodelete) {
        this.todos = this.todos.filter(todo => todo !== todotodelete);

        this.inform('destroy');
    }

    toggle(todototoggle) {
        this.todos = this.todos.map(todo => todo !== todototoggle ? todo : Object.assign({}, todo, {completed: !todo.completed}));

        this.inform('change');
    }

    toggleAll(toggletostate) {
     this.todos = this.todos.map(todo => Object.assign({}, todo, {completed: toggletostate}));

     this.inform('change');
    }

    clearAllCompleted() {
     this.todos = this.todos.filter(todo => !todo.completed);

     this.inform('destroy');
    }
}