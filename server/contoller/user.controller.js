const db = require('../db')
class UserContoller {
    async createUser(req, res){
        const {username, password} = req.body
        try{
            const response = await db.query(`INSERT INTO users (username, password) values ('${username}', '${password}');`)
            res.json({"success": true})
        }catch(e){
            res.json({"success": false})
        } 
    }
    async checkUser(req, res){
        const {username, password} = req.body
        const response = await db.query(`SELECT * FROM users WHERE username='${username}';`)
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
        console.log(wallet_id, wallet)
        try{
            const response_wallet = await db.query(`UPDATE wallets SET wallet='${JSON.stringify(wallet)}' WHERE id=${wallet_id};`)
            res.json({"update": true})
        }catch(e){
            res.json({"update": false})
        }
    }
}
module.exports = new UserContoller()