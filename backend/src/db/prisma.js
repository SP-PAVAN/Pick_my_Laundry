require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const mariadb = require('mariadb');

console.log('DATABASE_URL:', process.env.DATABASE_URL);
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prisma = new PrismaClient({ adapter });

module.exports = { prisma };
