const pool = require('./database');
const crypto = require('crypto');


module.exports = {
    async login(email, pass) {
        const hash = crypto.createHash('sha512').update(pass).digest('base64');
        const conn = await pool.getConnection(async conn => conn)
        const [rows, fields] = await conn.query('SELECT * FROM user WHERE email=? AND pass=?', [email, hash])
        conn.release()
        return rows
    },
    async selectUserById(user_id) {
        const conn = await pool.getConnection(async conn => conn)
        const [rows, fields] = await conn.query('SELECT * FROM user WHERE user_id=?', [user_id])
        conn.release()
        return rows
    },
    async register(email, pass, name) {
        const hash = crypto.createHash('sha512').update(pass).digest('base64');
        const conn = await pool.getConnection(async conn => conn)

        try {
            const insert_user = await conn.query('INSERT INTO user SET email=?, pass=?, name=?', [email, hash, name])   
            conn.release()
            return true
        }catch(err) {
            conn.release()
            return null
        }
    }
};