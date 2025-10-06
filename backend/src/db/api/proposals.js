
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProposalsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const proposals = await db.proposals.create(
            {
                id: data.id || undefined,

        proposal_title: data.proposal_title
        ||
        null
            ,

        status: data.status
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return proposals;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const proposalsData = data.map((item, index) => ({
                id: item.id || undefined,

                proposal_title: item.proposal_title
            ||
            null
            ,

                status: item.status
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const proposals = await db.proposals.bulkCreate(proposalsData, { transaction });

        return proposals;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const proposals = await db.proposals.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.proposal_title !== undefined) updatePayload.proposal_title = data.proposal_title;

        if (data.status !== undefined) updatePayload.status = data.status;

        updatePayload.updatedById = currentUser.id;

        await proposals.update(updatePayload, {transaction});

        return proposals;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const proposals = await db.proposals.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of proposals) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of proposals) {
                await record.destroy({transaction});
            }
        });

        return proposals;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const proposals = await db.proposals.findByPk(id, options);

        await proposals.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await proposals.destroy({
            transaction
        });

        return proposals;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const proposals = await db.proposals.findOne(
            { where },
            { transaction },
        );

        if (!proposals) {
            return proposals;
        }

        const output = proposals.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.proposal_title) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'proposals',
                            'proposal_title',
                            filter.proposal_title,
                        ),
                    };
                }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.status) {
                where = {
                    ...where,
                status: filter.status,
            };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.proposals.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'proposals',
                        'proposal_title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.proposals.findAll({
            attributes: [ 'id', 'proposal_title' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['proposal_title', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.proposal_title,
        }));
    }

};

