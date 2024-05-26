import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World from forum chat app');
});

export default router;