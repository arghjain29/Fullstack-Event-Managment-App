import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log('No token found');
            return res.status(401).send({ error: 'Unauthorized Access' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Token verification failed:', error);
        res.status(401).send({ error: 'Please authenticate' });
    }
};