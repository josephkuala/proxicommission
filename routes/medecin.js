const express = require('express');
const router = express.Router();
const { createMed } = require('../controller/medecin/createMed')
const { deleteMed } = require('../controller/medecin/deleteMed')
const { findAllMedecin } = require('../controller/medecin/findAllMed')
const { findMedById } = require('../controller/medecin/findMedbyId')
const { updateMed } = require('../controller/medecin/updateMed')
const { loginMed } = require('../controller/medecin/login')
const { retrait } = require('../middleware/mobilemoney')
const auth = require('../auth/auth')

/**
 * @swagger
 * components:
 *   schemas:
 *     Medecin:
 *       type: object
 *       required:
 *         - nom
 *         - postom
 *         - prenom
 *         - email
 *       properties:
 *         nom:
 *           type: string
 *           description: The nom of your book
 *         postom:
 *           type: string
 *           description: The book postom
 *         prenom:
 *           type: string
 *           description: Whether you have prenom reading the book
 *         email:
 *           type: string
 *           description: Whether you have prenom reading the book
 *         
 *       example:
 *         nom: Kwala
 *         postom: Sakila
 *         prenom: Joseph
 *         email: josephkuala@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: Medecins
 *   description: The medecins managing API
 * /api/v1/medecin/medecins:
 *   get:
 *     summary: Lists all the medecins
 *     tags: [Medecins]
 *     responses:
 *       200:
 *         description: The list of the medecins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medecin'
 * /api/v1/medecin/createmed:
 *   post:
 *     summary: Create a new medecin
 *     tags: [Medecins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medecin'
 *     responses:
 *       200:
 *         description: The created medecin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medecin'
 *       500:
 *         description: Some server error
 *
 */

//Get all category
router.get('/medecins', findAllMedecin);

//Get category by Id
router.get('/medecin/:id', findMedById);

//Post category
router.post('/createmed', createMed);

//Put category
router.put('/updatemed/:id', updateMed);

//Delete category
router.delete('/deletemed/:id', deleteMed);

//Delete category
router.post('/login', loginMed);

//Post retrait
router.post('/retrait', retrait);


module.exports = router