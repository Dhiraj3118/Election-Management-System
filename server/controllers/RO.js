const { getDocs, collection, where, updateDoc, doc } = require("firebase/firestore");
const { db } = require("../firebase");

exports.getCandidatesList = async (req, res) => {
    try{
        const docSnap = await getDocs(collection(db, "Candidates"), where("area", "==", req.params.area));

        const data = [];

        docSnap.forEach(doc => {
            data.push({id: doc.id, ...doc.data()})
        })        
        
        return res.status(200).json({
            success: true,
            msg: "Candidates list fetched successfully",
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
exports.approveCandidate = async (req, res) => {
    try{
        await updateDoc(doc(db, "Candidates", req.body.candidateId),{
            approved: true,
            approvedBy: req.params.id
        });   
        
        return res.status(200).json({
            success: true,
            msg: "Candidate Approved"
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
