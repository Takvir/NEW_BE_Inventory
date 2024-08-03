const pool = require('../db/pool');

const getAllBranches = async () => {
    const [rows] = await pool.query('SELECT * FROM branch');
    return rows;
};

const getBranchById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM branch WHERE branch_id = ?', [id]);
    return rows[0];
};

const createBranch = async (branch) => {
    const { branch_name, number_of_employees } = branch;
    const [result] = await pool.execute('INSERT INTO branch (branch_name, number_of_employees) VALUES (?, ?)', [branch_name, number_of_employees]);
    return { id: result.insertId, ...branch };
};

const updateBranch = async (id, branch) => {
    const { branch_name, number_of_employees } = branch;
    await pool.execute('UPDATE branch SET branch_name = ?, number_of_employees = ? WHERE branch_id = ?', [branch_name, number_of_employees, id]);
};

const deleteBranch = async (id) => {
    await pool.execute('DELETE FROM branch WHERE branch_id = ?', [id]);
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
