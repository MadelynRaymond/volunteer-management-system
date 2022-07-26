"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8080;
app.get('/', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
});
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
//Get all volunteers
app.get('/Volunteers', async (req, res) => {
    const volunteers = await prisma.user.findMany({
        where: {
            role: 'VOLUNTEER'
        }
    });
    res.status(200).send(volunteers);
});
//Create volunteer
app.post('/Volunteer', async (req, res) => {
    const volunteer = await prisma.user.create({
        data: {
            //TODO: include profile in query
            username: req.body.username,
            password: req.body.password,
            role: 'VOLUNTEER'
        }
    });
    res.status(201).send(volunteer);
});
//TODO: Update Volunteer
//Delete volunteer
app.delete('/Volunteer/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.user.delete({
        where: {
            id
        }
    });
    res.sendStatus(203);
});
//# sourceMappingURL=index.js.map