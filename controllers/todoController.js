const moment = require("moment/moment");
const client = require("../db_config");

const createTodo = async (req, res, next) => {
    const {todo} = req.body;

    if(!todo){
        return res.send('Check your credentials and try again')
    }

    try {
        const created_on = moment(new Date());
        await client.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        await client.query('INSERT INTO todos(todo, created_on) values($1, $2)', [todo, created_on]);

        res.status(201).json({
            message: 'User created successfully!'
        });
 
      } catch (error) {
        next(error);
    }
};


const getTodo = async (req, res) => {
    try {
        await client.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        let queryResult;

        if(!req.params.id) {
            const request = await client.query(`SELECT * from todos`);
            queryResult = request.rows;
        } else {
            const request = await client.query(`SELECT * from todos WHERE id = $1`, [req.params.id]);
            if(request.rows.length) {
                queryResult = request.rows;
            } else {
                return res.status(400).json({
                    msg: `No item found with id : ${req.params.id}`
                });
            }
            
        }

        return res.status(200).json({
            data: queryResult
        });
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res) => {
    try {
        await client.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        await client.query(`UPDATE todos SET todo = $1 WHERE id = $2`, [req.body.todo, req.params.id]);

        return res.status(200).json({
            message: `Updated a todo successfully`
        });
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res) => {
    try {
        await client.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        await client.query('DELETE from todos WHERE id = $1', [req.params.id]);

        return res.status(200).json({
            message: `Deleted successfully`
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {createTodo, getTodo, updateTodo, deleteTodo}