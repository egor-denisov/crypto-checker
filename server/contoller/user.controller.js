const db = require('../db')
class UserContoller {
    async createUser(req, res){
        const {login, email, password} = req.body
        try{
            const wallet = await db.query(`INSERT INTO wallets (wallet) values ('{}') RETURNING *;`)
            const washlist = await db.query(`INSERT INTO washlists (washlist) values ('[]') RETURNING *;`)
            const data = await db.query(
                `INSERT INTO users (username, password, email, washlist_id, wallet_id) values 
                ('${login}', '${password}', '${email}', ${washlist.rows[0].id}, ${wallet.rows[0].id})
                RETURNING *;`
            )
            res.json(
                {   
                    error: false,
                    id: data.rows[0].id,
                    username: data.rows[0].username, 
                    password: data.rows[0].password, 
                    washlist_id: washlist.rows[0].id,
                    washlist: [],
                    wallet_id: wallet.rows[0].id,
                    wallet: {},
                    wallet_keys: []
                }
            )
        }catch(e){
            console.log(e)
            res.json({error: true})
        } 
    }
    async checkUser(req, res){
        const {login, password} = req.body
        const response = await db.query(`SELECT * FROM users WHERE username='${login}';`)
        if(response.rows[0] !== undefined){
            if(response.rows[0].password === password){
                res.json(response.rows[0])
            }else{
                res.json({"correct_username": true})
            }
        }else{
            res.json({"correct_username": false})
        }
    }
    async updateUser(req, res){

    }
    async deleteUser(req, res){

    }
    async getWashlistAndWallet(req, res){
        const {washlist_id, wallet_id} = req.body
        const response_washlist = await db.query(`SELECT washlist FROM washlists WHERE id=${washlist_id};`)
        const response_wallet = await db.query(`SELECT wallet FROM wallets WHERE id=${wallet_id};`)
        res.json({"washlist": response_washlist.rows[0].washlist, "wallet": response_wallet.rows[0].wallet})
    }
    async changeWashlist(req, res){
        const {washlist_id, washlist} = req.body
        try{
            const response_washlist = await db.query(`UPDATE washlists SET washlist='${JSON.stringify(washlist)}' WHERE id=${washlist_id};`)
            res.json({"update": true})
        }catch(e){
            res.json({"update": false})
        }
    }
    async changeWallet(req, res){
        const {wallet_id, wallet} = req.body
        try{
            const response_wallet = await db.query(`UPDATE wallets SET wallet='${JSON.stringify(wallet)}' WHERE id=${wallet_id};`)
            res.json({"update": true})
        }catch(e){
            res.json({"update": false})
        }
    }
}
module.exports = new UserContoller()