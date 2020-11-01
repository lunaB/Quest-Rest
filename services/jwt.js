const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { NotExtended } = require('http-errors');
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const expiresIn = 60 * 60;

module.exports = {
    signToken (user_id) {
        console.log(JWT_SECRET_KEY)
        return jwt.sign(
            {user_id}, 
            JWT_SECRET_KEY, 
            {expiresIn})
    },
    authCheck (req, res) {
        const token = req.headers['authorization'];
        if (!token) {
            res.status(401).json({error: '인증토큰이 누락된 요청입니다.'})
            throw Error("인증토큰 누락")
        }else {
            try {
                const jwt_raw = jwt.verify(token.split(' ')[1], JWT_SECRET_KEY)
                return jwt_raw.user_id
            } catch(err) {
                res.status(401).json({error: '유효하지 않은 인증토큰 입니다.'})
                throw Error("유효하지 않은 인증토큰"+err)
            }
        }
        next(req,res)
    }
}