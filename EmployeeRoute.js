import express, { query } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router();

// Employee login route
router.post('/employee_login', (req, res) => {
    const sql = "SELECT * FROM employee WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });

        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Error comparing passwords" });

                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: "employee", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' });

                    res.cookie('token', token);
                    return res.json({ loginStatus: true, id: result[0].id });
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong password" });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

// Employee detail route
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        return res.json(result);
    });
});

// Employee logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

// Add leave route
router.post('/add_leave', (req, res) => {
    const { name, email , role } = req.body;

    // Validate input
    if (!name || !email) {
        return res.status(400).json({ Status: false, Error: "All fields are required" });
    }
    const sql = "INSERT INTO `leave` (name, email, role) VALUES (?, ?, ?)";
    const values = [name, email, role, ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ Status: false, Error: "Query error" });

        }

        return res.json({ Status: true });
    }
);
});
router.get('/replay_records', (req,res) => {
    const sql = "select * from `replay` "
    con.query(sql,(err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
})
})
router.delete('/delete_replay/:id', (req, res) => {
    const id = req.params.id;
    const sql ="delete FROM `replay` Where id =?";
    con.query(sql,[id],(err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
    })
        
})

export { router as EmployeeRouter };
