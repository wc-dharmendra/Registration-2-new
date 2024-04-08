import { connectDB } from "@/BackEnd/DataBase/DataBase";
import Event from "@/BackEnd/Model/EventModal";

connectDB();

const saveData = async (req, res) => {
    const { name, start_date, end_date } = req.body;
    if (name && start_date && end_date) {
        const newEvent = new Event(req.body);
        const eventData = await newEvent.save();
        res.status(200).json({ message: 'Event saved successfully', eventData });
    }
}

const createEvent = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await saveData(req, res);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
export default createEvent;