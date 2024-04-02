const Redis = require('../redis/index');

class Film {
    async getAllFilm(req, res) {
        try {
            const film = await Redis.get('film')
            if (film.success) {
                return res.status(200).json({ success: true, data: film.val });
            } else {
                global.db.query('select * from film', (err, result) => {
                    if (err && Object.keys(err).length) {
                        return res.status(400).json({ success: false, err })
                    } else {
                        Redis.setEx('film', 3600, result).then(() => {
                            res.status(200).json({ success: true, result });
                        }).catch((err) => {
                            res.status(400).json({ success: false, err });
                        })
                    }
                })
            }
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
}

const instance = new Film();
module.exports = instance;