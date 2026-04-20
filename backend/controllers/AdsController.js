import AdsDAO from "../DAO/AdsDAO.js";

export const getAll = async (req, res) => {
    try {
        const ads = await AdsDAO.getAll();
        res.json(ads);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }

};


export const getById = async (req, res) => {
    try {
        const ads = await AdsDAO.getById(Number(req.params.id));
        if (!ads) return res.status(404).json({ error: "Introuvable" });
        res.json(ads);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const create = async (req, res) => {
    try {
        console.log('req.file:', req.file);
        const adId = await AdsDAO.create({
            ...req.body,
            user_id: req.user.id,
        });

        if (req.file) {
            const image_url = `/uploads/${req.file.filename}`;
            await AdsDAO.addImage(adId, image_url);
        }

        res.status(201).json({ id: adId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur création" });
    }
};

export const update = async (req, res) => {
    try {
        const ad = await AdsDAO.update(Number(req.params.id), req.body);

        if (!ad) {
            return res.status(404).json({ error: "Introuvable" });
        }

        res.json(ad);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur update" });
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await AdsDAO.delete(Number(req.params.id));
        if (!deleted) return res.status(404).json({ error: "Introuvable" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// Recherche

export const search = async (req, res) => {
    try {
        const { q, category_id, town_id, min_price, max_price } = req.query;

        const results = await AdsDAO.search({
            q,
            category_id: category_id ? Number(category_id) : undefined,
            town_id: town_id ? Number(town_id) : undefined,
            min_price: min_price ? Number(min_price) : undefined,
            max_price: max_price ? Number(max_price) : undefined,
        });

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur search' });
    }
};

