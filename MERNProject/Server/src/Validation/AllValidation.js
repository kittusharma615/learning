exports.ValidName = (name)=>{
    const nameRegex = /^[A-Za-z\s]+$/;

    return (nameRegex.test(name))
    
}

exports.ValidEmail = (enail)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailRegex.test(enail))
    
}

exports.ValidPassword = (password)=>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return (passwordRegex.test(password))
    
}