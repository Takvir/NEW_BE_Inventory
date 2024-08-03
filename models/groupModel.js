const pool = require('../db/pool');

const getAllGroups = async () => {
    const [rows] = await pool.query('SELECT * FROM `group`');
    return rows;
};

const getGroupById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM `group` WHERE group_id = ?', [id]);
    return rows[0];
};

const createGroup = async (group) => {
    const { group_name, branch_id } = group;
    const [result] = await pool.execute('INSERT INTO `group` (group_name, branch_id) VALUES (?, ?)', [group_name, branch_id]);
    return { id: result.insertId, ...group };
};

const updateGroup = async (id, group) => {
    const { group_name, branch_id } = group;
    await pool.execute('UPDATE `group` SET group_name = ?, branch_id = ? WHERE group_id = ?', [group_name, branch_id, id]);
};

const deleteGroup = async (id) => {
    await pool.execute('DELETE FROM `group` WHERE group_id = ?', [id]);
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};
