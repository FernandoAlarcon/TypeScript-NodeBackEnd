import { Request, Response } from 'express';


import pool from '../database';

class UserController {

    public async list(req: Request, res: Response): Promise<void> {
        const { data } = req.params;
        let users;
        if(data){
            users = await pool.query(` SELECT * FROM users WHERE name LIKE %?% OR
                                                                 lastname LIKE %?%  OR
                                                                 email LIKE %?% ORDER_BY id_ DESC`,[data, data, data]);
        }else{
            users = await pool.query(`SELECT * FROM users ORDER BY id_ DESC `);
        }
 
        res.json(users);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        console.log(users.length);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: "The User doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'User Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id_} = req.params;
        const oldUser = req.body;
        await pool.query('UPDATE users set ? WHERE id_ = ?', [oldUser, id_]);
        res.json({ message: "The user was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        let rest = await pool.query('DELETE FROM users WHERE id_ = ?', [id]);
         
        res.json({ message: rest });
    }
}

const userController = new UserController;
export default userController;