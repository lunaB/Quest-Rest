module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
    DB_HOST:'192.168.64.2',
    DB_PORT:3306,
    DB_USER:'lunab',
    DB_PASSWORD:'lunab',
    DB_NAME:'quest_luna',
    DB_CONNECTION_LIMIT:5,
    JWT_SECRET_KEY:'publicLuna'
};
  