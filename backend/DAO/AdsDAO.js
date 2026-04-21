import pool from '../config/db.js';

export default class AdsDAO {
    //afficher toutes les annonces
    static async getAll() {
        const [rows] = await pool.query(`
    SELECT ads.*, 
    (SELECT image_url FROM ad_images WHERE ad_id = ads.id LIMIT 1) AS image
    FROM ads`);
        return rows;
    }

    //afficher une annonce par id
    static async getById(id) {
        const [rows] = await pool.query(`
    SELECT ads.*, 
    (SELECT image_url FROM ad_images WHERE ad_id = ads.id LIMIT 1) AS image
    FROM ads WHERE ads.id = ?`, [id]);
        return rows[0] || null;
    }

    
    //créer une nouvelle annonce
    static async create(annonce) {
        const { title, description, price, user_id, category_id } = annonce;
        const [result] = await pool.query(
            'INSERT INTO ads (title, description, price, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
            [title, description, price, category_id, user_id]
        );
        return result.insertId;
    }

    //ajouter une image

    static async addImage(ad_id, image_url) {
        await pool.query(
            'INSERT INTO ad_images (ad_id, image_url) VALUES (?, ?)',
            [ad_id, image_url]
        );
    }

    // Supprimer une annonce
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM ads WHERE id = ?', [id]);
        // result.affectedRows contient le nombre de lignes supprimées (0 ou 1)
        return result.affectedRows > 0;
    }

    // Mettre à jour une annonce (PUT / PATCH)
    static async update(id, data) {
        const fields = [];
        const values = [];

        if (data.title !== undefined) {
            fields.push("title = ?");
            values.push(data.title);
        }

        if (data.description !== undefined) {
            fields.push("description = ?");
            values.push(data.description);
        }

        if (fields.length === 0) return null;

        values.push(id);

        // On met à jour les champs fournis
        const [result] = await pool.query(
            `UPDATE ads SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) return null;

        // 👉 On récupère l'objet mis à jour
        return await this.getById(id);
    }

    // Recherche avec filtres dynamiques
    static async search({ q, category_id, town_id, min_price, max_price }) {
        console.log('params reçus:', { q, category_id, town_id, min_price, max_price });
        const conditions = [];
        const values = [];

        if (q) {
            conditions.push('ads.title LIKE ?');
            values.push(`%${q}%`);
        }
        if (category_id) {
            conditions.push('ads.category_id = ?');
            values.push(category_id);
        }
        if (town_id) {
            conditions.push('users.town_id = ?');
            values.push(town_id);
        }
        if (min_price) {
            conditions.push('ads.price >= ?');
            values.push(min_price);
        }
        if (max_price) {
            conditions.push('ads.price <= ?');
            values.push(max_price);
        }

        const where = conditions.length > 0
            ? `WHERE ${conditions.join(' AND ')}`
            : '';

        const [rows] = await pool.query(
            `SELECT ads.* FROM ads 
            JOIN users ON ads.user_id = users.id
            ${where} 
            ORDER BY ads.created_at DESC`,
            values
        );

        return rows;
    }
};
