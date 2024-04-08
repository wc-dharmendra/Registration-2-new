import { connectDB } from "@/BackEnd/DataBase/DataBase";
import User from "@/BackEnd/Model/UserModal";

connectDB();

const getData = async (req, res) => {
    const { uid } = (req.query);
    if (uid) {
        const query = {
            $or: [
                { email: uid },
                { phone: uid },
            ],
        };

        const isDataAvail = await User.find(query);
        
        if (isDataAvail?.[0]?.["_id"]) {
            res.status(200).json({ message: 'User Data.', userData: isDataAvail?.[0] });
        } else {
            res.status(400).json({ message: 'User not found', userData: {} });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

const getUser = async (req, res) => {
    if (req.method === 'GET') {
        try {
            await getData(req, res);
        } catch (error) {
            res.status(400).json({ error: 'Error getting user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
export default getUser;