
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DocumentsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const documents = await db.documents.create(
            {
                id: data.id || undefined,

        document_title: data.document_title
        ||
        null
            ,

        created_date: data.created_date
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return documents;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const documentsData = data.map((item, index) => ({
                id: item.id || undefined,

                document_title: item.document_title
            ||
            null
            ,

                created_date: item.created_date
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const documents = await db.documents.bulkCreate(documentsData, { transaction });

        return documents;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const documents = await db.documents.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.document_title !== undefined) updatePayload.document_title = data.document_title;

        if (data.created_date !== undefined) updatePayload.created_date = data.created_date;

        updatePayload.updatedById = currentUser.id;

        await documents.update(updatePayload, {transaction});

        return documents;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const documents = await db.documents.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of documents) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of documents) {
                await record.destroy({transaction});
            }
        });

        return documents;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const documents = await db.documents.findByPk(id, options);

        await documents.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await documents.destroy({
            transaction
        });

        return documents;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const documents = await db.documents.findOne(
            { where },
            { transaction },
        );

        if (!documents) {
            return documents;
        }

        const output = documents.get({plain: true});

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

                if (filter.document_title) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'documents',
                            'document_title',
                            filter.document_title,
                        ),
                    };
                }

            if (filter.created_dateRange) {
                const [start, end] = filter.created_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    created_date: {
                    ...where.created_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    created_date: {
                    ...where.created_date,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
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
            const { rows, count } = await db.documents.findAndCountAll(queryOptions);

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
                        'documents',
                        'document_title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.documents.findAll({
            attributes: [ 'id', 'document_title' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['document_title', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.document_title,
        }));
    }

};

