const { getDocs, collection, where, query } = require("firebase/firestore");
const { db } = require("../firebase");

exports.getElectionList = async (req, res) => {
    try{
        const q = query(collection(db, "Elections"), where("state", "==", req.params.state));
        const docSnap = await getDocs(q);

        const data = [];

        docSnap.forEach(doc => {
            data.push({id: doc.id, ...doc.data()})
        })        
        
        return res.status(200).json({
            success: true,
            msg: "Elections list fetched successfully",
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
exports.getElectionCandidates = async (req, res) => {
    try{
        const q = query(collection(db, "Candidates"), where("name", "==", req.query.electionId))
        const docSnap = await getDocs(q);

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
exports.castVote = async (req, res) => {};
exports.getResults = async (req, res) => {};
