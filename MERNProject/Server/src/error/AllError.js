exports.errorhandling = (err,res)=>{
    if(err.name=='CastError'){return res.status(400).send({ status: false, msg: 'MongoDB Id Invalid' }) }
    
    else{ res.status(500).send({ status: false, msg: err.message })}
}