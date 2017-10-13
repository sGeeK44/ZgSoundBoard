import { Router } from 'express';

const index: Router = Router();

index.get('/', function(req, res) {
    res.json({ message: 'hooray! AAA to our api!' });   
});

export default index;