import { connectDB } from "@/BackEnd/DataBase/DataBase";
import User from "@/BackEnd/Model/UserModal";

connectDB();

const updateData = async (req, res) => {
    const { _id } = typeof (req.body) === 'string' ? JSON.parse(req.body) : req.body;
    if (_id) {
        const updateUser = await User.findOneAndUpdate({ _id }, typeof (req.body) === 'string' ? JSON.parse(req.body) : req.body, { new: true });
        res.status(200).json({ message: 'Data updated successfully', userData: { ...updateUser.toJSON(), password: "", tech_support: "", feedback_suggestion: "" } });
    } else {
        res.status(400).json({ error: 'Error updating data' });
    }
}

const updateUser = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await updateData(req, res);
        } catch (error) {
            res.status(400).json({ error: 'Error registering data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
export default updateUser;