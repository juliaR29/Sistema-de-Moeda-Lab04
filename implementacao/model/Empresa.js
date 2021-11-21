const pool = require("../lib/db");

class Empresa {
    /** @type {number} */
    id;
    /** @type {string} */
    nome;
    /** @type {string} */
    email;
    /** @type {string} */
    cnpj;
    /** @type {string} */
    rua;
    /** @type {string} */
    complemento;
    /** @type {string} */
    bairro;


    constructor(dados) {
        this.id = dados.id;
        this.nome = dados.nome;
        this.email = dados.email;
        this.rua = dados.rua;
        this.cnpj = dados.cnpj;
        this.complemento = dados.complemento;
        this.bairro = dados.bairro;
    }

    /**
    * criar empresa
    * @param {Object} empresa 
    * @returns {Promise<Empresa>} 
    */
    static async create(dados) {
        const { nome, email, cnpj, rua, complemento, bairro } = dados;
        const result = await pool.query('INSERT INTO empresa (nome, email, cnpj, rua, complemento, bairro) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nome, email, cnpj, rua, complemento, bairro]);
        return new Empresa(result.rows[0]);
    }

    /**
    * obtem uma empresa por id
    * @param {number} id id da empresa
    * @returns {Promise<Empresa | null>} 
    */
    static async get(id) {
        const result = await pool.query('SELECT * FROM empresa WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return new Empresa(result.rows[0]);
    }

    /**
     * update empresa
     * @param {number} id
     * @param {Object} dados 
     * @returns {Promise<void>} 
     */
    static async update(id, dados) {
        const { nome, email, cnpj, rua, complemento, bairro } = dados;
        await pool.query('UPDATE empresa SET nome = $1, email = $2, cnpj = $3, rua = $4, complemento = $5, bairro = $6 WHERE id = $7', [nome, email, cnpj, rua, complemento, bairro, id]);
    }

    /**
     * delete empresa por id
     * @param {number} id 
     * @returns {Promise<void>} 
     */
    static async delete(id) {
        await pool.query('DELETE FROM empresa WHERE id = $1', [id]);

    }

}

exports.Empresa = Empresa;

