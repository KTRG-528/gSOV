
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VendorsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const vendors = await db.vendors.create(
            {
                id: data.id || undefined,

        business_name: data.business_name
        ||
        null
            ,

        registration_number: data.registration_number
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return vendors;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const vendorsData = data.map((item, index) => ({
                id: item.id || undefined,

                business_name: item.business_name
            ||
            null
            ,

                registration_number: item.registration_number
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const vendors = await db.vendors.bulkCreate(vendorsData, { transaction });

        return vendors;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const vendors = await db.vendors.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.business_name !== undefined) updatePayload.business_name = data.business_name;

        if (data.registration_number !== undefined) updatePayload.registration_number = data.registration_number;

        updatePayload.updatedById = currentUser.id;

        await vendors.update(updatePayload, {transaction});

        return vendors;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const vendors = await db.vendors.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of vendors) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of vendors) {
                await record.destroy({transaction});
            }
        });

        return vendors;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const vendors = await db.vendors.findByPk(id, options);

        await vendors.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await vendors.destroy({
            transaction
        });

        return vendors;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const vendors = await db.vendors.findOne(
            { where },
            { transaction },
        );

        if (!vendors) {
            return vendors;
        }

        const output = vendors.get({plain: true});

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

                if (filter.business_name) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'vendors',
                            'business_name',
                            filter.business_name,
                        ),
                    };
                }

                if (filter.registration_number) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'vendors',
                            'registration_number',
                            filter.registration_number,
                        ),
                    };
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
            const { rows, count } = await db.vendors.findAndCountAll(queryOptions);

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
                        'vendors',
                        'business_name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.vendors.findAll({
            attributes: [ 'id', 'business_name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['business_name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.business_name,
        }));
    }

};

