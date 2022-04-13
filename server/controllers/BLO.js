const { getDocs, collection, where, updateDoc, doc } = require("firebase/firestore");
const { db } = require("../firebase");

exports.getVotersList = async (req, res) => {
    try{
        const docSnap = await getDocs(collection(db, "Voters"), where("area", "==", req.params.area));

        const data = [];

        docSnap.forEach(doc => {
            data.push({id: doc.id, ...doc.data()})
        })        
        
        return res.status(200).json({
            success: true,
            msg: "Voters list fetched successfully",
            data
        })
    }   
    catch(error)
    {
        console.log(error);

        return res.status(500).json({
            success:false,
            error,
            msg: "Error in fetching list"
        })
    }
};
exports.verifyVoter = async (req, res) => {
    try{
        await updateDoc(doc(db, "Voters", req.body.userId),{
            verified: true,
            verifiedBy: req.params.id
        });   
        
        return res.status(200).json({
            success: true,
            msg: "Voter verified successfully"
        })
    }   
    catch(error)
    {
        console.log(error);

        return res.status(500).json({
            success:false,
            error,
            msg: "Server error"
        })
    }
};
