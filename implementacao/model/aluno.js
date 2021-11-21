const pool = require("../lib/db");

class Aluno {
    /** @type {number} */
    id;
    /** @type {string} */
    nome;
    /** @type {string} */
    email;
    /** @type {string} */
    cpf;
    /** @type {string} */
    rg;
    /** @type {string} */
    rua;
    /** @type {string} */
    complemento;
    /** @type {string} */
    bairro;
    /** @type {string} */
    instituicao;
    /** @type {string} */
    curso;


    constructor(dados) {
        this.id = dados.id;
        this.nome = dados.nome;
        this.email = dados.email;
        this.cpf = dados.cpf;
        this.rg = dados.rg;
        this.rua = dados.rua;
        this.complemento = dados.complemento;
        this.bairro = dados.bairro;
        this.instituicao = dados.instituicao;
        this.curso = dados.curso;
    }

    /**
     * criar aluno
    * @param {Object} aluno 
    * @returns {Promise<Aluno>} 
    */
    static async create(dados) {
        const { nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso } = dados;
        const result = await pool.query('INSERT INTO aluno (nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso]);
        return new Aluno(result.rows[0]);
    }

    /**
     * obtem um aluno por id
     * @param {number} id id do aluno
     * @returns {Promise<Aluno | null>} 
     */
    static async get(id) {
        const result = await pool.query('SELECT * FROM aluno WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return new Aluno(result.rows[0]);
    }

    /**
     * update aluno
     * @param {number} id
     * @param {Object} dados 
     * @returns {Promise<void>} 
     */
    static async update(id, dados) {
        const { nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso } = dados;
        await pool.query('UPDATE aluno SET nome = $1, email = $2, cpf = $3, rg = $4, rua = $5, complemento = $6, bairro = $7, instituicao = $8, curso = $9 WHERE id = $10', [nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso, id]);
    }

    /**
     * delete aluno por id
     * @param {number} id 
     * @returns {Promise<void>} 
     */
    static async delete(id) {
        await pool.query('DELETE FROM aluno WHERE id = $1', [id]);

    }

}

exports.Aluno = Aluno;
