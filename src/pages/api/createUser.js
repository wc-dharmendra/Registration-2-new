import { connectDB } from "@/BackEnd/DataBase/DataBase";
import User from "@/BackEnd/Model/UserModal";

connectDB();

const saveData = async (req, res) => {
    const { email, phone } = JSON.parse(req.body);
    if (email || phone) {
        const query = {
            $or: []
        };

        if (email) {
            query.$or.push({ email });
        } else if (phone) {
            query.$or.push({ phone });
        }
        const isDataAvail = await User.find(query);

        if (isDataAvail?.[0]?.["_id"]) {
            res.status(200).json({ message: 'Users already existed.', userData: isDataAvail?.[0] });
        } else {
            const newUser = new User(JSON.parse(req.body));
            const userData = await newUser.save();
            res.status(200).json({ message: 'Users saved successfully', userData });
        }
    }
}

const getData = async (req, res) => {
    const data = await User.find();
    res.status(200).json({ message: 'Users get successfully', data });
}

const createUser = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await saveData(req, res);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let validationErrors;
                for (const field in error.errors) {
                    if (field === 'email') {
                        validationErrors = 'Invalid email format';
                    } else if (field === 'phone') {
                        validationErrors = 'Invalid phone number format';
                    } else {
                        validationErrors = 'Validation error';
                    }
                }
                res.status(400).json({ message: validationErrors, userData: {} });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    } else if (req.method === 'GET') {
        try {
            await getData(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Error getting user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
export default createUser;